import Fastify from 'fastify'
import cors from '@fastify/cors'
import { movieRoutes } from './routes/movies'
import { genderRoutes } from './routes/gender'

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true, //Mudar para domínio da aplicação quando em produção
    })

    await fastify.register(movieRoutes)
    await fastify.register(genderRoutes)

    await fastify.listen({ port: 3333 })
}

bootstrap()