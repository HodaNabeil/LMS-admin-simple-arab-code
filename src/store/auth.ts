import { create } from "zustand";

interface UserState {
    isLoggedIn: boolean;
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    isLoggedIn: false,
    token: null,
    setToken: (token) => set({ token, isLoggedIn: true }),
    logout: () => set({ token: null, isLoggedIn: false }),
}));
