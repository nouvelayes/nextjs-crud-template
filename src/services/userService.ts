import prisma from "@/lib/prisma";
import { CreateUserDTO, UpdateUserDTO } from "@/types/user-dtos";
import { NotFoundError, BadRequestError } from "@/lib/api/errors";
import { Prisma } from "@/generated/prisma/client";

export const userService = {
  async list({
    skip,
    limit,
    sort,
    q,
  }: {
    skip: number;
    limit: number;
    sort:
      | Prisma.UserOrderByWithRelationInput
      | Prisma.UserOrderByWithRelationInput[];
    q?: string;
  }) {
    const where: Prisma.UserWhereInput = { isDeleted: false };
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: sort,
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return { total, users };
  },

  async create(data: CreateUserDTO) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing && !existing.isDeleted) {
      throw new BadRequestError("Email already in use");
    }

    return prisma.user.create({
      data,
      select: { id: true, email: true, name: true, createdAt: true },
    });
  },

  async getById(id: string) {
    const user = await prisma.user.findFirst({
      where: { id, isDeleted: false },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        posts: {
          where: { isDeleted: false },
          select: { id: true, title: true, published: true },
        },
      },
    });
    if (!user) throw new NotFoundError("User not found");
    return user;
  },

  async update(id: string, data: UpdateUserDTO) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
        select: { id: true, email: true, name: true, updatedAt: true },
      });
    } catch {
      throw new NotFoundError("User not found");
    }
  },

  async softDelete(id: string) {
    try {
      await prisma.user.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
      });
      return { message: "User deleted" };
    } catch {
      throw new NotFoundError("User not found");
    }
  },
};
