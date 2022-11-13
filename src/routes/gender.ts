import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function genderRoutes(fastify: FastifyInstance) {
    fastify.get('/genders', async () => {

        const gender = await prisma.gender.findMany()

        return { gender }
    })

    fastify.post('/gender/new', async (request, reply) => {

        const createGenderBody = z.object({
            name: z.string(),
        })

        const { name } = createGenderBody.parse(request.body)

        const gender = await prisma.gender.findMany({
            where: {
                name,
            },
        })

        if (gender.length > 0) {
            return reply.status(400).send({
                message: 'O gênero já existe.'
            })
        }

        await prisma.gender.create({
            data: {
                name
            }
        })

        return reply.status(201).send({
            message: 'Criado com sucesso!'
        })
    })

    fastify.delete('/gender/:id/delete', async (request, reply) => {

        const id = String(request.headers.id);

        const gender = await prisma.gender.findMany({
            where: {
                id,
            },
        })

        if (gender.length == 0) {
            return reply.status(404).send({
                message: 'O gênero não foi encontrado.'
            })
        }

        const genderOccurrences = await prisma.gender.findMany({
            where: {
                id,
            },

            include: {
                moviegenderR: {
                    where: {
                        genderId: id
                    }
                }
            }
        })

        if (genderOccurrences.length > 0) {
            await prisma.movieGenderR.deleteMany({
                where: {
                    genderId: id
                }
            })
        }

        await prisma.gender.delete({
            where: {
                id
            }
        })

        return reply.status(202).send({
            message: 'Deletado com sucesso!'
        })
    })

    fastify.post('/gender/:id/update', async (request, reply) => {
        const createGenderBody = z.object({
            name: z.string(),
        })

        const id = String(request.headers.id);

        const { name } = createGenderBody.parse(request.body)

        const gender = await prisma.gender.findMany({
            where: {
                id,
            },
        })

        if (gender.length == 0) {
            return reply.status(400).send({
                message: 'O gênero não foi encontrado.'
            })
        }

        await prisma.gender.update({
            where: {
                id
            },
            data: {
                name
            }
        })

        return reply.status(200).send({
            message: 'Atualizado com sucesso!'
        })
    })
}