"use server";

import type { Prisma } from "@prisma/client";

import prisma from "../prisma-client";

export const createInstitution = async (data: Prisma.InstitutionCreateInput) => {
  const institution = await prisma.institution.create({ data });

  return institution;
};

export const updateInstitution = async (id: number, data: Prisma.InstitutionUpdateInput) => {
  const institution = await prisma.institution.update({ where: { id }, data });

  return institution;
};

export const getInstitutionById = async (id: number) => {
  const institution = await prisma.institution.findUnique({ where: { id } });

  return institution;
};

export const getInstitutionByInstId = async (institution_id: string) => {
  const institution = await prisma.institution.findFirst({ where: { institution_id } });

  return institution;
};

export const getInstitutionsByUserId = async (userId: number) => {
  const institutions = await prisma.institution.findMany({ where: { userId } });

  return institutions;
};
