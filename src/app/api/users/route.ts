import { ok, fail } from "@/lib/api/response";
import { parsePagination } from "@/lib/api/pagination";
import { validateBody } from "@/lib/api/validator";
import { CreateUserSchema } from "@/types/user-dtos";
import { userService } from "@/services/userService";
import { log } from "@/lib/logger";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;
    const { limit, skip, sort } = parsePagination(url.searchParams);

    const { total, users } = await userService.list({ skip, limit, sort, q });
    return ok({ items: users, meta: { total, limit, skip } });
  } catch (err) {
    log.error("GET /api/users failed", err);
    return fail(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await validateBody(CreateUserSchema, body);
    const user = await userService.create(data);
    return ok(user, 201);
  } catch (err) {
    log.error("POST /api/users failed", err);
    return fail(err);
  }
}
