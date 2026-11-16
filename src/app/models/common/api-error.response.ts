export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: string[];
  status: number;
  path: string;
  timestamp: string;
}
