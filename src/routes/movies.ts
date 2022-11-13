import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function movieRoutes(fastify: FastifyInstance) {
    fastify.get('/movies', async () => {

        const movie = await prisma.movie.findMany()

        return { movie }
    });

    fastify.post('/movie/new', async (request, reply) => {

        const createMovieBody = z.object({
            title: z.string(),
            releaseDate: z.string(),
            lengthInMinutes: z.number(),
            coverUrl: z.string(),
        })

        const { title, releaseDate, lengthInMinutes, coverUrl } = createMovieBody.parse(request.body)

        await prisma.movie.create({
            data: {
                title,
                releaseDate,
                lengthInMinutes,
                coverUrl
            }
        })

        return reply.status(201).send({
            message: 'Criado com sucesso!'
        })
    })

    fastify.post('/movie/newGender', async (request, reply) => {
        const createMovieGenderBody = z.object({
            movieId: z.string(),
            genderId: z.string()
        })

        const { movieId, genderId } = createMovieGenderBody.parse(request.body)

        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId,
            },

            include: {
                moviegenderR: {
                    where: {
                        movieId: movieId,
                        genderId: genderId
                    }
                }
            }
        })

        if (!movie) {
            return reply.status(400).send({
                message: 'Filme não encontrado.'
            })
        }

        if (movie.moviegenderR.length > 0) {
            return reply.status(400).send({
                message: 'Você já vinculou esse gênero a esse filme.'
            })
        }

        await prisma.movieGenderR.create({
            data: {
                movieId,
                genderId
            }
        })

        return reply.status(201).send({
            message: 'Gênero adicionado ao filme!'
        })
    })

    fastify.delete('/movie/:id/delete', async (request, reply) => {
        const id = String(request.headers.id);

        const movie = await prisma.movie.findMany({
            where: {
                id,
            },
        })

        if (movie.length == 0) {
            return reply.status(404).send({
                message: 'O filme não foi encontrado.'
            })
        }

        const movieOccurrences = await prisma.movie.findMany({
            where: {
                id,
            },

            include: {
                moviegenderR: {
                    where: {
                        movieId: id
                    }
                }
            }
        })

        if (movieOccurrences.length > 0) {
            await prisma.movieGenderR.deleteMany({
                where: {
                    movieId: id
                }
            })
        }

        await prisma.movie.delete({
            where: {
                id
            }
        })

        return reply.status(202).send({
            message: 'Deletado com sucesso!'
        })
    })

    fastify.post('/movie/:id/update', async (request, reply) => {
        const createMovieBody = z.object({
            title: z.string(),
            releaseDate: z.string(),
            lengthInMinutes: z.number(),
            coverUrl: z.string(),
        })

        const id = String(request.headers.id);

        const { title, releaseDate, lengthInMinutes, coverUrl } = createMovieBody.parse(request.body)

        const movie = await prisma.movie.findMany({
            where: {
                id,
            },
        })

        if (movie.length == 0) {
            return reply.status(400).send({
                message: 'O filme não foi encontrado.'
            })
        }

        await prisma.movie.update({
            where: {
                id
            },
            data: {
                title,
                releaseDate,
                lengthInMinutes,
                coverUrl
            }
        })

        return reply.status(200).send({
            message: 'Atualizado com sucesso!'
        })
    })
}