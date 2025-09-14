import { userService } from "@/services/userService";
import { ok, fail } from "@/lib/api/response";
import { validateBody } from "@/lib/api/validator";
import { UpdateUserSchema } from "@/types/user-dtos";
import { log } from "@/lib/logger";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const user = await userService.getById(params.id);
    return ok(user);
  } catch (err) {
    log.error("GET /api/users/:id failed", { id: params.id, err });
    return fail(err);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const data = await validateBody(UpdateUserSchema, body);
    const updated = await userService.update(params.id, data);
    return ok(updated);
  } catch (err) {
    log.error("PUT /api/users/:id failed", { id: params.id, err });
    return fail(err);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const result = await userService.softDelete(params.id);
    return ok(result);
  } catch (err) {
    log.error("DELETE /api/users/:id failed", { id: params.id, err });
    return fail(err);
  }
}
