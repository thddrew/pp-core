import prisma from "../client";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};
