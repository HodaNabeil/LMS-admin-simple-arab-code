export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  pricePaidInCents: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  userId: string;
  userEmail?: string;
}

export interface InvoicesResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  limit: number;
}
