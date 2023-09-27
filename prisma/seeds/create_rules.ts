import { prismaClient as prisma } from "../../src/database/prismaClient";

async function main() {
  const locator = await prisma.rule.create({
    data: { name: "locator" },
  });

  console.log(locator);
}

main()
  .then(() => {})
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
