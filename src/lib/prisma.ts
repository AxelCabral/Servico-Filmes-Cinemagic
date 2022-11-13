import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    log: ['query'],
})

//Singleton pattern -> todas as instâncias utilizaram essa mesma conexão