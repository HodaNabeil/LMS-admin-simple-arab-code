import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";
import { handleApiError } from "@/lib/error-handler";

import type { Order } from "../types";
import type { CreateOrderRequest, UpdateOrderRequest } from "@/types/orders";
import { ordersApi } from "../services/ordersAPi";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: async (data: CreateOrderRequest): Promise<Order> => {
      const response = await ordersApi.createOrder(data);
      // response.data is the wrapped response, response.data.data is the actual Order
      if (!response.data) {
        throw new Error("No data returned from create order");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success("تم إنشاء الطلب بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation<Order, Error, { id: string; data: UpdateOrderRequest }>({
    mutationFn: async ({ id, data }): Promise<Order> => {
      const response = await ordersApi.updateOrder(id, data);
      if (!response.data) {
        throw new Error("No data returned from update order");
      }
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
      toast.success("تم تحديث الطلب بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      return await ordersApi.deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      toast.success("تم حذف الطلب بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useRefundOrder() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: string; reason?: string }>({
    mutationFn: async ({ id, reason }) => {
      return await ordersApi.refundOrder(id, reason);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
      toast.success("تم بدء عملية الاسترجاع بنجاح");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}

export function useReportOrderError() {
  return useMutation<void, Error, { id: string; error: string }>({
    mutationFn: async ({ id, error }) => {
      return await ordersApi.reportOrderError(id, error);
    },
    onSuccess: () => {
      toast.success("تم إرسال بلاغ الخطأ للقسم التقني");
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
}
