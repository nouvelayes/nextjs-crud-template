import prisma from "@/lib/prisma";

async function main() {
  try {
    console.log("Fetching indexes via Prisma $runCommandRaw...");

    const usersIndexes = await prisma.$runCommandRaw({
      listIndexes: "users",
    });
    console.log("Users indexes: ", JSON.stringify(usersIndexes, null, 2));

    const postsIndexes = await prisma.$runCommandRaw({
      listIndexes: "posts",
    });
    console.log("Posts indexes: ", JSON.stringify(postsIndexes, null, 2));

    console.log("All indexes fetched successfully.");
  } catch (err) {
    console.error("Failed to fetch indexes:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
