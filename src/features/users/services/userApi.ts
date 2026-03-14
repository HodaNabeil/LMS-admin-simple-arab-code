import { api } from "@/lib/axios";
import { USERS_ENDPOINTS } from "@/constants/path";
import type {
  UserListResponse,
  UserFilters,
  User,
  CreateUserDto,
  UpdateUserDto,
} from "@/types/user";

export async function getAllUsers(filters?: UserFilters): Promise<UserListResponse> {
  const response = await api.get<UserListResponse>(USERS_ENDPOINTS.LIST, {
    params: filters,
  });
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<{ data: User }>(
    USERS_ENDPOINTS.DETAIL.replace("{id}", id),
  );
  return response.data.data;
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const response = await api.post<{ data: User; message?: string }>(USERS_ENDPOINTS.CREATE, data);
  // @ts-ignore - The hook expectation is different, let's return something that includes the message if needed
  const user = response.data.data;
  if (response.data.message) {
    (user as any).message = response.data.message;
  }
  return user;
}

export async function updateUser(id: string, data: UpdateUserDto): Promise<User> {
  const response = await api.patch<{ data: User; message?: string }>(
    USERS_ENDPOINTS.UPDATE.replace("{id}", id),
    data,
  );
  const user = response.data.data;
  if (response.data.message) {
    (user as any).message = response.data.message;
  }
  return user;
}

export async function deleteUser(id: string): Promise<{ message?: string }> {
  const response = await api.delete<{ message?: string }>(USERS_ENDPOINTS.DELETE.replace("{id}", id));
  return response.data;
}
