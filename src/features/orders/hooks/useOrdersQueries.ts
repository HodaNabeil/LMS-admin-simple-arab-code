import { ordersKeys } from "@/lib/query-keys";
import type { GetOrdersResponse, GetOrderResponse } from "@/types/orders";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrder } from "../services/ordersAPi";

export function useOrders() {
    return useQuery<GetOrdersResponse>({
        queryKey: ordersKeys.lists(),
        queryFn: async (): Promise<GetOrdersResponse> => {
            return await getAllOrders();
        },

    });
}

export function useOrder(slug: string | undefined) {
    return useQuery<GetOrderResponse>({
        queryKey: ordersKeys.detail(slug || ""),
        queryFn: async (): Promise<GetOrderResponse> => {
            if (!slug) throw new Error("Slug is required");
            return await getOrder(slug);
        },
        enabled: !!slug,

    });
}
