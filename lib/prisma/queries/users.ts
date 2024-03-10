"use server";

import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";

import prisma from "../client";

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const getUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
};

export const getCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
};

export const getUserByClerkId = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { clerkId: id },
  });

  return user;
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
