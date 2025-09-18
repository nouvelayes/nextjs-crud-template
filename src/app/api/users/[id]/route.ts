import { NextRequest } from "next/server";
import { userService } from "@/services/userService";
import { ok, fail } from "@/lib/api/response";
import { validateBody } from "@/lib/api/validator";
import { UpdateUserSchema } from "@/types/user-dtos";
import { log } from "@/lib/logger";

interface Params {
  params: { id: string };
}

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const user = await userService.getById(id);
    return ok(user);
  } catch (err) {
    log.error("GET /api/users/:id failed", { id: id, err });
    return fail(err);
  }
}

export async function PUT(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const body = await req.json();
    const data = await validateBody(UpdateUserSchema, body);
    const updated = await userService.update(id, data);
    return ok(updated);
  } catch (err) {
    log.error("PUT /api/users/:id failed", { id: id, err });
    return fail(err);
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;

  try {
    const result = await userService.softDelete(id);
    return ok(result);
  } catch (err) {
    log.error("DELETE /api/users/:id failed", { id: id, err });
    return fail(err);
  }
}
