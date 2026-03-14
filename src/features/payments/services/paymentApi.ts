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

// Get all payments (orders)
export async function getAllPayments(): Promise<ListPaymentsResponse> {
  const response = await api.get<ListPaymentsResponse>(PAYMENT_ENDPOINTS.LIST);
  return response.data;
}

// Get single payment details
export async function getPayment(id: string): Promise<GetPaymentResponse> {
  const response = await api.get<GetPaymentResponse>(
    PAYMENT_ENDPOINTS.DETAIL.replace("{id}", id)
  );
  return response.data;
}

// Initiate a payment/order
export async function createPayment(data: CreatePaymentRequest): Promise<CreatePaymentResponse> {
  const response = await api.post<CreatePaymentResponse>(
    PAYMENT_ENDPOINTS.CREATE,
    data
  );
  return response.data;
}

// Update a payment/order
export async function updatePayment(
  id: string,
  data: UpdatePaymentRequest
): Promise<UpdatePaymentResponse> {
  const response = await api.patch<UpdatePaymentResponse>(
    PAYMENT_ENDPOINTS.UPDATE.replace("{id}", id),
    data
  );
  return response.data;
}

// Request a refund
export async function refundPayment(id: string): Promise<RefundPaymentResponse> {
  const response = await api.post<RefundPaymentResponse>(
    PAYMENT_ENDPOINTS.REFUND.replace("{id}", id)
  );
  return response.data;
}
