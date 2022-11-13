import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const movie = await prisma.movie.create({
        data: {
            title: 'OS VINGADORES - THE AVENGERS',
            releaseDate: '2012-04-27T00:00:00.000Z',
            lengthInMinutes: 143,
            coverUrl: 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/43/82/20052140.jpg',
        }
    })

    const gender = await prisma.gender.create({
        data: {
            name: 'Animação',
        }
    })

    const gender2 = await prisma.gender.create({
        data: {
            name: 'Cultura',
        }
    })

    const gender3 = await prisma.gender.create({
        data: {
            name: 'Documentário',
        }
    })

    const moviegenderR = await prisma.movieGenderR.create({
        data: {
            genderId: gender.id,
            movieId: movie.id
        }
    })

    const moviegenderR2 = await prisma.movieGenderR.create({
        data: {
            genderId: gender2.id,
            movieId: movie.id
        }
    })

    const moviegenderR3 = await prisma.movieGenderR.create({
        data: {
            genderId: gender3.id,
            movieId: movie.id
        }
    })

}

main()