import { Prisma } from "@prisma/client";

import prisma from "../client";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
};

export const updateUserByClerkId = async (id: string, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { clerkId: id },
    data,
  });

  return user;
};
