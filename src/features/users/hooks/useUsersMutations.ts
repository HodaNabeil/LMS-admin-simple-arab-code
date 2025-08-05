import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import type { User } from "@/types/user";
import type { AxiosError } from "axios";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Partial<User>): Promise<{ message: string }> => {
      const { data } = await api.post("/users", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error: AxiosError) => {
      console.error("Error creating user:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Partial<User>): Promise<{ message: string }> => {
      const { data } = await api.put("/users", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error: AxiosError) => {
      console.error("Error updating user:", error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string): Promise<{ message: string }> => {
      const { data } = await api.delete(`/users?id=${userId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
    onError: (error: AxiosError) => {
      console.error("Error deleting user:", error);
    },
  });
}
