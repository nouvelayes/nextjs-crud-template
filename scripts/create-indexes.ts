import prisma from "@/lib/prisma";

async function main() {
  try {
    console.log("Creating/ensuring indexes via Prisma $runCommandRaw...");

    await prisma.$runCommandRaw({
      createIndexes: "users",
      indexes: [
        {
          key: { isDeleted: 1, createdAt: -1 },
          name: "users_isDeleted_createdAt_idx",
        },
      ],
    });
    console.log("Users indexes created/ensured.");

    await prisma.$runCommandRaw({
      createIndexes: "posts",
      indexes: [
        { key: { authorId: 1 }, name: "posts_authorId_idx" },
        {
          key: { isDeleted: 1, createdAt: -1 },
          name: "posts_isDeleted_createdAt_idx",
        },
        { key: { title: "text", content: "text" }, name: "posts_text_index" },
      ],
    });
    console.log("Posts indexes created/ensured.");

    console.log("All indexes created/ensured successfully.");
  } catch (err) {
    console.error("Failed to create indexes:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
