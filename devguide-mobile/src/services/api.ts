/**
 * API service layer — currently uses local mock data.
 * Replace BASE_URL and remove mock logic to connect to the real backend.
 */

import { CATEGORIES, RULES } from '../data/developerRules';
import { Category, CategoryId, Rule } from '../types';

// When connecting to a real backend, set this via an env variable:
// const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api/v1';
const USE_MOCK = true;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Rules ──────────────────────────────────────────────────────────────────

export const fetchCategories = async (): Promise<Category[]> => {
  if (USE_MOCK) {
    await delay(300);
    return CATEGORIES;
  }
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const json = await res.json();
  return json.data.categories;
};

export const fetchRulesByCategory = async (categoryId: CategoryId): Promise<Rule[]> => {
  if (USE_MOCK) {
    await delay(400);
    return RULES.filter((r) => r.category === categoryId);
  }
  const res = await fetch(`${BASE_URL}/rules?category=${categoryId}`);
  if (!res.ok) throw new Error('Failed to fetch rules');
  const json = await res.json();
  return json.data.rules;
};

export const fetchRuleById = async (ruleId: string): Promise<Rule | null> => {
  if (USE_MOCK) {
    await delay(200);
    return RULES.find((r) => r.id === ruleId) ?? null;
  }
  const res = await fetch(`${BASE_URL}/rules/${ruleId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch rule');
  const json = await res.json();
  return json.data.rule;
};

export const fetchAllRules = async (): Promise<Rule[]> => {
  if (USE_MOCK) {
    await delay(300);
    return RULES;
  }
  const res = await fetch(`${BASE_URL}/rules`);
  if (!res.ok) throw new Error('Failed to fetch rules');
  const json = await res.json();
  return json.data.rules;
};

// ─── Checklist (server sync — mock only stores locally) ─────────────────────

export const syncChecklistItem = async (
  ruleId: string,
  completed: boolean
): Promise<void> => {
  if (USE_MOCK) return;
  await fetch(`${BASE_URL}/checklist/${ruleId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
};

// ─── Auth (stubs for real backend integration) ───────────────────────────────

export const loginUser = async (email: string, password: string) => {
  if (USE_MOCK) throw new Error('Auth requires a real backend. Set USE_MOCK = false.');
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const registerUser = async (name: string, email: string, password: string) => {
  if (USE_MOCK) throw new Error('Auth requires a real backend. Set USE_MOCK = false.');
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

// Silence "not defined" TS error for BASE_URL when USE_MOCK is true
declare const BASE_URL: string;
