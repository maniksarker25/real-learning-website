"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { AccountType } from "@/types/account";

export interface UserSession {
  accountType: AccountType | null;
  name?: string;
  goal?: string;
  orgName?: string;
  email?: string;
  seats?: string;
}

interface AccountContextType {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
  loginAsIndividual: (data: { name: string; goal?: string }) => void;
  loginAsOrganization: (data: {
    orgName: string;
    email: string;
    seats: string;
  }) => void;
  logout: () => void;
}

const STORAGE_KEY = "real_learning_user_session";

const defaultSession: UserSession = {
  accountType: null,
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
        setSession(JSON.parse(saved));
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
      setSession({
        accountType: "individual",
        name,
        goal,
      });
    },
    []
  );

  const loginAsOrganization = useCallback(
    ({
      orgName,
      email,
      seats,
    }: {
      orgName: string;
      email: string;
      seats: string;
    }) => {
      setSession({
        accountType: "organization",
        orgName,
        email,
        seats,
      });
    },
    []
  );

  const logout = useCallback(() => {
    setSession(defaultSession);
  }, []);

  const value = useMemo(
    () => ({
      session,
      setSession,
      loginAsIndividual,
      loginAsOrganization,
      logout,
    }),
    [session, loginAsIndividual, loginAsOrganization, logout]
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
