
export interface User {
  id: string;
  user_id?: string;
  email: string;
  role: string;
  is_admin: boolean;
}

export interface AuthUser {
  id: string;
  email?: string;
}

// Define the structure of the auth users API response
export interface AuthUserResponse {
  users?: {
    id: string;
    email?: string;
    [key: string]: any;
  }[];
  [key: string]: any;
}
