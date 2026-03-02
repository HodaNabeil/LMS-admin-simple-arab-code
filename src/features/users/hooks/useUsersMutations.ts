import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userApi } from "../services/userApi";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";
import type { CreateUserDto, UpdateUserDto } from "@/types/user";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserDto) => userApi.createUser(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success(res.message || "تم إنشاء المستخدم بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      userApi.updateUser(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success(res.message || "تم تحديث المستخدم بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => userApi.deleteUser(userId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success(res.message || "تم حذف المستخدم بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
