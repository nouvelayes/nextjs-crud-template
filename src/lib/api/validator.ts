import { ZodType, z } from "zod";
import { BadRequestError } from "./errors";

export async function validateBody<T>(
  schema: ZodType<T>,
  body: unknown,
): Promise<T> {
  const result = await schema.safeParseAsync(body);
  if (!result.success) {
    const tree = z.treeifyError(result.error);
    throw new BadRequestError("Validation failed", tree);
  }
  return result.data;
}
