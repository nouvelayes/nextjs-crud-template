import prisma from "@/lib/prisma";
import { CreatePostDTO, UpdatePostDTO } from "@/types/post-dtos";
import { NotFoundError } from "@/lib/api/errors";
import { Prisma } from "@/generated/prisma/client";

export const postService = {
  async list({
    skip,
    limit,
    sort,
    q,
  }: {
    skip: number;
    limit: number;
    sort:
      | Prisma.PostOrderByWithRelationInput
      | Prisma.PostOrderByWithRelationInput;
    q?: string;
  }) {
    const where: Prisma.PostWhereInput = { isDeleted: false };
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ];
    }
    console.log("skip", skip);
    console.log("limit", limit);
    console.log("sort", sort);
    console.log("q", q);

    const [total, posts] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        take: limit,
        skip,
        orderBy: sort,
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          author: { select: { id: true, email: true, name: true } },
        },
      }),
    ]);

    return { total, posts };
  },

  async create(data: CreatePostDTO) {
    const author = await prisma.user.findFirst({
      where: { id: data.authorId, isDeleted: false },
    });
    if (!author) throw new NotFoundError("Author not found");

    return prisma.post.create({
      data,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
        createdAt: true,
      },
    });
  },

  async getById(id: string) {
    const post = await prisma.post.findFirst({
      where: { id, isDeleted: false },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { id: true, email: true, name: true } },
      },
    });
    if (!post) throw new NotFoundError("Post not found");
    return post;
  },

  async update(id: string, data: UpdatePostDTO) {
    try {
      return await prisma.post.update({
        where: { id },
        data,
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          updatedAt: true,
        },
      });
    } catch {
      throw new NotFoundError("Post not found");
    }
  },

  async softDelete(id: string) {
    try {
      await prisma.post.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() },
      });
      return { message: "Post deleted" };
    } catch {
      throw new NotFoundError("Post not found");
    }
  },
};
