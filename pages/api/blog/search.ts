import { NextApiRequest, NextApiResponse } from 'next'
// import { PrismaClient } from '.prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  console.log(
    '%c req.body.search.term ',
    'background: red; color: white',
    req.body.search.term
  )

  try {
    const articles = await prisma.blogs.findMany({
      where: {
        // body: { contains: req.body.search.term, mode: 'insensitive', },
        body: { contains: req.body.search.term },

        // title: { contains: req.body.search.term, mode: 'insensitive' },
      },
      select: {
        id: true,
        title: true,
        body: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })

    res.status(200).json({ articles })
  } catch (err) {
    console.log(err)
    res.status(403).json({ err: 'Error occurred.' })
  }
  return null
}
