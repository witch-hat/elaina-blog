import Cookies from 'cookies';
import express from 'express';

interface VerifyReturnType {
  login: boolean;
  payload?: string | object;
  err?: any;
}

export interface ContextType {
  cookies: Cookies;
  user: VerifyReturnType;
  req: express.Request;
}
