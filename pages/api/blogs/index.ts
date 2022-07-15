import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  if (req.method === 'GET') {
    try {
      const articles = await prisma.blogs.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        select: {
          id: true,
          body: true,
          title: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true,
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

  return null
}
