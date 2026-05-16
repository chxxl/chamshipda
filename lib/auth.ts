"use client";

import { supabase } from "./supabase";

const CURRENT_USER_KEY = "currentUserId";

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: "worker" | "manager";
  team: string | null;
  affiliation: string | null;
  initial: string;
  is_new: boolean;
}

export async function signIn(
  username: string,
  password: string
): Promise<AuthUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, name, role, team, affiliation, initial, is_new")
    .eq("username", username)
    .eq("password", password)
    .maybeSingle();

  if (error || !data) return null;

  localStorage.setItem(CURRENT_USER_KEY, data.id);
  return data as AuthUser;
}

export function signOut() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_USER_KEY);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const id = getCurrentUserId();
  if (!id) return null;

  const { data, error } = await supabase
    .from("users")
    .select("id, username, name, role, team, affiliation, initial, is_new")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return data as AuthUser;
}
