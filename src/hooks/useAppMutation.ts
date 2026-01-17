import api from "@/lib/axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export function useAppMutation<TData, TVariables = void>(
    url: string,
    options?: Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">
) {
    return useMutation<TData, unknown, TVariables>({
        mutationFn: async (variables: TVariables) => {
            const { data } = await api.post<TData>(url, variables);
            return data;
        },
        ...options,
    });
}
