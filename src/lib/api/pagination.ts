export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get("limit") || 20)),
  );
  const skip = (page - 1) * limit;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order =
    (searchParams.get("order") || "desc").toLowerCase() === "asc"
      ? "asc"
      : "desc";
  return { page, limit, skip, sort: { [sortBy]: order } };
}
