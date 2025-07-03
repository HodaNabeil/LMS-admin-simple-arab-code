/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get("/users");
      return data;
    },
  });
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (user: object) => {
      const { data } = await api.post("/users", user);
      return data;
    },
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: async (user: object) => {
      // console.log("Updating user:", user);
      const { data } = await api.put("/users", user);

      return data;
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.delete(`/users?id=${userId}`);
      return data;
    },
  });
}
