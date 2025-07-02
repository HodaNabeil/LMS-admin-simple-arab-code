export interface TableColumnUsers {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string | null;
  createdAt: string; // يمكنك تحويلها إلى Date إذا كنت ستحولها لاحقًا
  updatedAt: string;
  role: "ADMIN" | "USER";
  customerId: string | null;
}

export interface TableColumnUsersResponse {
  users: TableColumnUsers[];
}
