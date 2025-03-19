import { Request } from 'express';

export default function extractTokenFromHeader(request: Request) {
  return request.headers.authorization?.split(' ')[1];
}
