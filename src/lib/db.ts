import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export function generateLogin() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";
    for(let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export function makeSafe(obj: any, fields: string[]) {
    return Object.fromEntries(Object.entries(obj).filter(([k, _]) => fields.includes(k)));
}

export const publicMember = [
    "name",
    "project",
    "createdAt",
    "role",
];
