/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export function usePaths() {
  return useQuery({
    queryKey: ["paths"],
    queryFn: async () => {
      const { data } = await api.get("/paths");
      return data;
    },
  });
}

export function useCreatePath() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (path: object) => {
      const { data } = await api.post("/paths", path);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paths"] });
    },
    onError: (error) => {
      console.error("Error creating path:", error);
    },
  });
}

export function useUpdatePath() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (path: object) => {
      const { data } = await api.put("/paths", path);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paths"] });
    },
    onError: (error) => {
      console.error("Error updating path:", error);
    },
  });
}

export function useDeletePath() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pathId: string) => {
      const { data } = await api.delete("/paths", { data: { id: pathId } });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paths"] });
    },
    onError: (error) => {
      console.error("Error deleting path:", error);
    },
  });
}
