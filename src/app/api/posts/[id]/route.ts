import { NextRequest } from "next/server";
import { postService } from "@/services/postService";
import { ok, fail } from "@/lib/api/response";
import { validateBody } from "@/lib/api/validator";
import { UpdatePostSchema } from "@/types/post-dtos";
import { log } from "@/lib/logger";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const post = await postService.getById(id);
    return ok(post);
  } catch (err) {
    log.error("GET /api/posts/:id failed", { id: id, err });
    return fail(err);
  }
}

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const body = await req.json();
    const data = await validateBody(UpdatePostSchema, body);
    const updated = await postService.update(id, data);
    return ok(updated);
  } catch (err) {
    log.error("PUT /api/posts/:id failed", { id: id, err });
    return fail(err);
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const result = await postService.softDelete(id);
    return ok(result);
  } catch (err) {
    log.error("DELETE /api/posts/:id failed", { id: id, err });
    return fail(err);
  }
}
