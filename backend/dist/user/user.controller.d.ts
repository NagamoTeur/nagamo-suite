import { PrismaService } from '../prisma/prisma.service';
export declare class UserController {
    private prisma;
    constructor(prisma: PrismaService);
    updateUser(id: string, req: any, updateData: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: number;
        role: string;
        createdAt: Date;
    }>;
    getAllUsers(req: any): Promise<{
        email: string;
        password: string;
        name: string | null;
        id: number;
        role: string;
        createdAt: Date;
    }[]>;
}
