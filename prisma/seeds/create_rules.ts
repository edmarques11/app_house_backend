import { prismaClient as prisma } from "../../src/external/clientDatabase/prisma/prismaClient";

async function main() {
  const locator = await prisma.rule.create({ data: { name: "locator" } });

  console.log(">>>", locator);
}

(async () => {
  try {
    await main();

    console.log("Deu booooooooooom!");
  } catch (err) {
    console.log("Errouuu", err);
    process.exit(1);
  } finally {
    console.log("finalizouuuu");
    await prisma.$disconnect();
  }
})();
