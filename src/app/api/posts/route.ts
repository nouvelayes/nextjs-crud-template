import { postService } from "@/services/postService";
import { ok, fail } from "@/lib/api/response";
import { parsePagination } from "@/lib/api/pagination";
import { validateBody } from "@/lib/api/validator";
import { CreatePostSchema } from "@/types/post-dtos";
import { log } from "@/lib/logger";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;
    const { limit, skip, sort } = parsePagination(url.searchParams);

    const { total, posts } = await postService.list({ skip, limit, sort, q });

    return ok({ items: posts, meta: { total, limit, skip } });
  } catch (err) {
    log.error("GET /api/posts failed", err);
    return fail(err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await validateBody(CreatePostSchema, body);
    const post = await postService.create(data);
    return ok(post, 201);
  } catch (err) {
    log.error("POST /api/posts failed", err);
    return fail(err);
  }
}
