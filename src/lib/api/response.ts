import { NextResponse } from "next/server";
import { ApiError } from "./errors";

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(err: unknown) {
  if (err instanceof ApiError) {
    const { status, message, code, details } = err;
    return NextResponse.json(
      { success: false, error: { message, code, details } },
      { status },
    );
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  return NextResponse.json(
    { success: false, error: { message } },
    { status: 500 },
  );
}
