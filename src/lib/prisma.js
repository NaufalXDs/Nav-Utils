import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const global = typeof globalThis !== 'undefined' ? globalThis : global;

export const Gprisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = Gprisma;