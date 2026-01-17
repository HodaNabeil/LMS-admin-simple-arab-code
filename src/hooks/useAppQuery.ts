import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

export function useAppQuery<T>(
    key: string,
    url: string,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
    return useQuery<T>({
        queryKey: [key],
        queryFn: async () => {
            const { data } = await api.get<T>(url);
            return data;
        },
        ...options
    });
}
