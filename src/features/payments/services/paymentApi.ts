import { api } from "@/lib/axios";
import { PAYMENT_ENDPOINTS } from "@/constants/Payments";
import type {
  ListPaymentsResponse,
  GetPaymentResponse,
  CreatePaymentResponse,
  UpdatePaymentResponse,
  RefundPaymentResponse,
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from "@/types/payments";

export const paymentApi = {
  // Get all payments (orders)
  async getAllPayments(): Promise<ListPaymentsResponse> {
    const response = await api.get<ListPaymentsResponse>(PAYMENT_ENDPOINTS.LIST);
    return response.data;
  },

  // Get single payment details
  async getPayment(id: string): Promise<GetPaymentResponse> {
    const response = await api.get<GetPaymentResponse>(
      PAYMENT_ENDPOINTS.DETAIL.replace("{id}", id)
    );
    return response.data;
  },

  // Initiate a payment/order
  async createPayment(data: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    const response = await api.post<CreatePaymentResponse>(
      PAYMENT_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  // Update a payment/order
  async updatePayment(
    id: string,
    data: UpdatePaymentRequest
  ): Promise<UpdatePaymentResponse> {
    const response = await api.patch<UpdatePaymentResponse>(
      PAYMENT_ENDPOINTS.UPDATE.replace("{id}", id),
      data
    );
    return response.data;
  },

  // Request a refund
  async refundPayment(id: string): Promise<RefundPaymentResponse> {
    const response = await api.post<RefundPaymentResponse>(
      PAYMENT_ENDPOINTS.REFUND.replace("{id}", id)
    );
    return response.data;
  },
};
