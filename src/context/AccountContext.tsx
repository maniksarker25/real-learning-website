"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  AccountType,
  OrgRole,
  WorkspaceMembership,
  OrgInvitationNotification,
} from "@/types/account";

export interface UserSession {
  accountType: AccountType | null;
  orgRole?: OrgRole;
  name?: string;
  goal?: string;
  orgName?: string;
  email?: string;
  seats?: string;
  activeWorkspaceId?: string;
  memberships?: WorkspaceMembership[];
  notifications?: OrgInvitationNotification[];
}

interface AccountContextType {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
  loginAsIndividual: (data: { name: string; goal?: string }) => void;
  loginAsOrganization: (data: {
    orgName: string;
    email: string;
    seats: string;
    orgRole?: OrgRole;
  }) => void;
  switchOrgRole: (role: OrgRole) => void;
  switchWorkspace: (workspaceId: string) => void;
  acceptInvitation: (notificationId: string) => void;
  declineInvitation: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  logout: () => void;
}

const STORAGE_KEY = "real_learning_user_session";

const defaultMemberships: WorkspaceMembership[] = [
  {
    id: "ws-acme-owner",
    orgName: "Acme Corp",
    role: "owner",
    seatsTotal: 25,
    seatsUsed: 18,
  },
  {
    id: "ws-globex-admin",
    orgName: "Globex Global",
    role: "admin",
    seatsTotal: 50,
    seatsUsed: 42,
  },
  {
    id: "ws-initech-member",
    orgName: "Initech Learning",
    role: "member",
    seatsTotal: 10,
    seatsUsed: 6,
    careerTrack: "Customer Service",
  },
];

const defaultNotifications: OrgInvitationNotification[] = [
  {
    id: "notif-1",
    type: "org_invite_admin",
    orgName: "Nexus Health Systems",
    invitedRole: "admin",
    inviterName: "Nexus Health",
    message: "You have been invited as an Admin for Nexus Health Systems.",
    timestamp: "15 mins ago",
    read: false,
    status: "pending",
  },
  {
    id: "notif-2",
    type: "org_invite_member",
    orgName: "Apex Cloud Services",
    invitedRole: "member",
    careerTrack: "IT Specialist",
    inviterName: "Apex Cloud",
    message: "You have been invited as a Member for Apex Cloud Services.",
    timestamp: "1 hour ago",
    read: false,
    status: "pending",
  },
  {
    id: "notif-3",
    type: "simulation_result",
    orgName: "Acme Corp",
    invitedRole: "member",
    careerTrack: "Customer Service",
    inviterName: "AI Evaluator",
    message: "Your simulation evaluation for 'Handling an Upset Customer' is ready (Score: 94%).",
    timestamp: "3 hours ago",
    read: true,
    status: "accepted",
  },
];

const defaultSession: UserSession = {
  accountType: null,
  orgRole: "owner",
  memberships: defaultMemberships,
  notifications: defaultNotifications,
};

const AccountContext = createContext<AccountContextType | undefined>(
  undefined
);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession>(defaultSession);
  const [isInitialized, setIsInitialized] = useState(false);

  // Read saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSession({
          ...defaultSession,
          ...parsed,
          memberships: parsed.memberships || defaultMemberships,
          notifications: parsed.notifications || defaultNotifications,
          orgRole: parsed.orgRole || "owner",
        });
      }
    } catch {
      // Ignore storage errors
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch {
        // Ignore storage errors
      }
    }
  }, [session, isInitialized]);

  const loginAsIndividual = useCallback(
    ({ name, goal }: { name: string; goal?: string }) => {
      setSession((prev) => ({
        ...prev,
        accountType: "individual",
        name: name || "Hosain Ali",
        goal: goal || "Customer Service",
      }));
    },
    []
  );

  const loginAsOrganization = useCallback(
    ({
      orgName,
      email,
      seats,
      orgRole = "owner",
    }: {
      orgName: string;
      email: string;
      seats: string;
      orgRole?: OrgRole;
    }) => {
      setSession((prev) => ({
        ...prev,
        accountType: "organization",
        orgRole,
        orgName: orgName || "Acme Corp",
        email: email || "admin@acmecorp.com",
        seats: seats || "25",
        activeWorkspaceId: prev.activeWorkspaceId || "ws-acme-owner",
      }));
    },
    []
  );

  const switchOrgRole = useCallback((role: OrgRole) => {
    setSession((prev) => ({
      ...prev,
      orgRole: role,
    }));
  }, []);

  const switchWorkspace = useCallback((workspaceId: string) => {
    setSession((prev) => {
      if (workspaceId === "personal") {
        return {
          ...prev,
          accountType: "individual",
          orgRole: undefined,
          orgName: undefined,
          activeWorkspaceId: "personal",
        };
      }
      const target = prev.memberships?.find((m) => m.id === workspaceId);
      if (!target) return prev;
      
      if (target.role === "admin") {
        return {
          ...prev,
          accountType: "organization",
          orgName: target.orgName,
          orgRole: "admin",
          seats: String(target.seatsTotal || 50),
          activeWorkspaceId: workspaceId,
        };
      } else {
        return {
          ...prev,
          accountType: "individual",
          orgName: target.orgName,
          orgRole: "member",
          activeWorkspaceId: workspaceId,
        };
      }
    });
  }, []);

  const acceptInvitation = useCallback((notificationId: string) => {
    setSession((prev) => {
      const notifs = prev.notifications || defaultNotifications;
      const targetNotif = notifs.find((n) => n.id === notificationId);
      if (!targetNotif) return prev;

      const generatedId = `ws-${targetNotif.orgName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${targetNotif.invitedRole}`;
      const newMembership: WorkspaceMembership = {
        id: generatedId,
        orgName: targetNotif.orgName,
        role: targetNotif.invitedRole,
        seatsTotal: 50,
        seatsUsed: 12,
        careerTrack: targetNotif.careerTrack,
      };

      const existingMemberships = prev.memberships || defaultMemberships;
      const exists = existingMemberships.some((m) => m.orgName === targetNotif.orgName);
      const updatedMemberships = exists
        ? existingMemberships.map((m) => (m.orgName === targetNotif.orgName ? newMembership : m))
        : [...existingMemberships, newMembership];

      return {
        ...prev,
        memberships: updatedMemberships,
        notifications: notifs.map((n) =>
          n.id === notificationId
            ? { ...n, status: "accepted" as const, read: true }
            : n
        ),
      };
    });
  }, []);

  const declineInvitation = useCallback((notificationId: string) => {
    setSession((prev) => ({
      ...prev,
      notifications: (prev.notifications || defaultNotifications).map((n) =>
        n.id === notificationId
          ? { ...n, status: "declined" as const, read: true }
          : n
      ),
    }));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      notifications: (prev.notifications || defaultNotifications).map((n) => ({
        ...n,
        read: true,
      })),
    }));
  }, []);

  const logout = useCallback(() => {
    setSession(defaultSession);
  }, []);

  const value = useMemo(
    () => ({
      session,
      setSession,
      loginAsIndividual,
      loginAsOrganization,
      switchOrgRole,
      switchWorkspace,
      acceptInvitation,
      declineInvitation,
      markAllNotificationsAsRead,
      logout,
    }),
    [
      session,
      loginAsIndividual,
      loginAsOrganization,
      switchOrgRole,
      switchWorkspace,
      acceptInvitation,
      declineInvitation,
      markAllNotificationsAsRead,
      logout,
    ]
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
