import { Controller, Get, Put, Body, Req, UseGuards, Param, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  // ✅ Mise à jour des informations utilisateur (nom, email)
  @UseGuards(JwtAuthGuard)
  @Put("update/:id")
  async updateUser(@Param("id") id: string, @Req() req, @Body() updateData) {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) throw new ForbiddenException("ID invalide.");

    const requester = req.user;
    if (requester.role !== "admin" && requester.sub !== userId) {
      throw new ForbiddenException("Accès refusé.");
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  // ✅ Liste des utilisateurs (réservé aux admins)
  @UseGuards(JwtAuthGuard)
  @Get("all")
  async getAllUsers(@Req() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Seuls les administrateurs peuvent voir cette liste.");
    }

    return this.prisma.user.findMany();
  }
}

