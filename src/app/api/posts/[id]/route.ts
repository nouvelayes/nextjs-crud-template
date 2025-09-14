import { postService } from "@/services/postService";
import { ok, fail } from "@/lib/api/response";
import { validateBody } from "@/lib/api/validator";
import { UpdatePostSchema } from "@/types/post-dtos";
import { log } from "@/lib/logger";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const post = await postService.getById(params.id);
    return ok(post);
  } catch (err) {
    log.error("GET /api/posts/:id failed", { id: params.id, err });
    return fail(err);
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const data = await validateBody(UpdatePostSchema, body);
    const updated = await postService.update(params.id, data);
    return ok(updated);
  } catch (err) {
    log.error("PUT /api/posts/:id failed", { id: params.id, err });
    return fail(err);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const result = await postService.softDelete(params.id);
    return ok(result);
  } catch (err) {
    log.error("DELETE /api/posts/:id failed", { id: params.id, err });
    return fail(err);
  }
}
