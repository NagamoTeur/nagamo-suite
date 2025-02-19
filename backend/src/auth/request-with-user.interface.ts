import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any; // ou { id: number; email: string; role: string; } si vous voulez un typage plus précis
}

