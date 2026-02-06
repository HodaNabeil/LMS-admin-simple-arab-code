import { api } from "@/lib/axios";
import { ORDER_ENDPOINTS } from "@/constants/orders";
import type {
  GetOrdersResponse,
  GetOrderResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "@/types/orders";

export const ordersApi = {
  async getAllOrders(): Promise<GetOrdersResponse> {
    const response = await api.get<GetOrdersResponse>(ORDER_ENDPOINTS.LIST);
    return response.data;
  },

  async getOrder(id: string): Promise<GetOrderResponse> {
    const response = await api.get<GetOrderResponse>(
      ORDER_ENDPOINTS.DETAIL.replace("{id}", id),
    );
    return response.data;
  },

  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    const response = await api.post<CreateOrderResponse>(
      ORDER_ENDPOINTS.CREATE,
      data,
    );
    return response.data;
  },

  async updateOrder(
    id: string,
    data: UpdateOrderRequest,
  ): Promise<UpdateOrderResponse> {
    const response = await api.patch<UpdateOrderResponse>(
      ORDER_ENDPOINTS.UPDATE.replace("{id}", id),
      data,
    );
    return response.data;
  },

  async deleteOrder(id: string): Promise<void> {
    await api.delete(ORDER_ENDPOINTS.DELETE.replace("{id}", id));
  },

  async refundOrder(id: string, reason?: string): Promise<void> {
    await api.post(ORDER_ENDPOINTS.REFUND.replace("{id}", id), { reason });
  },

  // Candidate for the requested "talk to the backend handler" about errors
  async reportOrderError(id: string, errorMessage: string): Promise<void> {
    await api.post(`/api/orders/${id}/report-error`, { message: errorMessage });
  },
};
