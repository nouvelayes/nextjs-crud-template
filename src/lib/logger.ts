export const log = {
  info: (...args: Parameters<typeof console.log>) =>
    console.log("[info]", ...args),
  warn: (...args: Parameters<typeof console.warn>) =>
    console.warn("[warn]", ...args),
  error: (...args: Parameters<typeof console.error>) =>
    console.error("[error]", ...args),
};
