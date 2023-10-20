import { prismaClient as prisma } from "../../src/external/clientDatabase/prisma/prismaClient";

async function main() {
  const locator = await prisma.rule.create({ data: { name: "locator" } });

  console.log(locator);
}

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
