import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  let prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// @ts-expect-error
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// @ts-expect-error
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export default prisma as PrismaClient;
