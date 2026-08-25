"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { AccountType, OrgRole, WorkspaceMembership } from "@/types/account";

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
  },
];

const defaultSession: UserSession = {
  accountType: null,
  orgRole: "owner",
  memberships: defaultMemberships,
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
    if (!isInitialized) return;
    try {
      if (session.accountType) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
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
      const target = prev.memberships?.find((m) => m.id === workspaceId);
      if (!target) return prev;
      return {
        ...prev,
        orgName: target.orgName,
        orgRole: target.role,
        seats: String(target.seatsTotal || 25),
        activeWorkspaceId: workspaceId,
      };
    });
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
      logout,
    }),
    [
      session,
      loginAsIndividual,
      loginAsOrganization,
      switchOrgRole,
      switchWorkspace,
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

