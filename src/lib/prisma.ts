import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    log: ['query'],
})

//Singleton pattern -> todas as chamadas utilizam essa mesma instância
