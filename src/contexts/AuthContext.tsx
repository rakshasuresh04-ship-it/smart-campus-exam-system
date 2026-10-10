import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Role } from '../types';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  userRole: Role | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error; data?: { user: User } }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_USERS: Record<string, Role> = {
  'admin@campus.edu': 'admin',
  'faculty@campus.edu': 'faculty',
  'student@campus.edu': 'student',
};

function makeDemoSession(email: string): Session {
  const role = DEMO_USERS[email] ?? 'student';
  const now = new Date();
  const expiresAt = Math.floor((now.getTime() + 60 * 60 * 1000) / 1000);

  return {
    access_token: `demo-${role}-token`,
    refresh_token: `demo-${role}-refresh-token`,
    expires_in: 3600,
    expires_at: expiresAt,
    token_type: 'bearer',
    user: {
      id: `demo-${role}-id`,
      aud: 'authenticated',
      role: 'authenticated',
      email,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      app_metadata: { provider: 'demo' },
      user_metadata: { role },
      identities: [],
      last_sign_in_at: now.toISOString(),
      factors: [],
    } as User,
  } as Session;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const nextSession = data.session;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setUserRole((nextSession?.user?.user_metadata?.role as Role) ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setUserRole((nextSession?.user?.user_metadata?.role as Role) ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!supabase || !isSupabaseConfigured) {
      const demoRole = DEMO_USERS[normalizedEmail];
      if (demoRole && password === 'campus123') {
        const nextSession = makeDemoSession(normalizedEmail);
        setSession(nextSession);
        setUser(nextSession.user);
        setUserRole(demoRole);
        return { data: { user: nextSession.user } };
      }

      return {
        error: new Error('Demo login requires a valid campus email and password: campus123'),
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error) return { error };
    return { data: { user: data.user } };
  };

  const signOut = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setUser(null);
    setUserRole(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ session, user, userRole, loading, signIn, signOut }),
    [session, user, userRole, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
