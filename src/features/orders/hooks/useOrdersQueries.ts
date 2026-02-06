import { ordersKeys } from "@/lib/query-keys";
import type { GetOrdersResponse, GetOrderResponse } from "@/types/orders";
import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "../services/ordersAPi";

export function useOrders() {
    return useQuery<GetOrdersResponse>({
        queryKey: ordersKeys.lists(),
        queryFn: async (): Promise<GetOrdersResponse> => {
            return await ordersApi.getAllOrders();
        },

    });
}

export function useOrder(slug: string | undefined) {
    return useQuery<GetOrderResponse>({
        queryKey: ordersKeys.detail(slug || ""),
        queryFn: async (): Promise<GetOrderResponse> => {
            if (!slug) throw new Error("Slug is required");
            return await ordersApi.getOrder(slug);
        },
        enabled: !!slug,

    });
}
