import { Request } from "express";

interface ExtraInfoRequest {
  request_id?: string;
  user?: {
    id: string;
    email: string;
  };
}
