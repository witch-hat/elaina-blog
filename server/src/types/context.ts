import Cookies from 'cookies';
import express from 'express';

export interface ContextType {
  cookies: Cookies;
  user: string | object | null;
  req: express.Request;
}
