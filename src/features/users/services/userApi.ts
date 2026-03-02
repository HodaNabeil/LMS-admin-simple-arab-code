import { api } from "@/lib/axios";
import { USERS_ENDPOINTS } from "@/constants/path";
import type {
  UserListResponse,
  User,
  CreateUserDto,
  UpdateUserDto,
} from "@/types/user";

export const userApi = {
  async getAllUsers(filters?: any): Promise<UserListResponse> {
    const response = await api.get<UserListResponse>(USERS_ENDPOINTS.LIST, {
      params: filters,
    });
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get<User>(
      USERS_ENDPOINTS.DETAIL.replace("{id}", id)
    );
    return response.data;
  },

  async createUser(data: CreateUserDto): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(
      USERS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserDto): Promise<{ message: string }> {
    const response = await api.patch<{ message: string }>(
      USERS_ENDPOINTS.UPDATE.replace("{id}", id),
      data
    );
    return response.data;
  },

  async deleteUser(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
      USERS_ENDPOINTS.DELETE.replace("{id}", id)
    );
    return response.data;
  },
};
