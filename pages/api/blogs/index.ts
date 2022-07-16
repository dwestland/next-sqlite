import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const blogs = await prisma.blogs.findMany({
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
      res.status(200).json({ blogs })
    } catch (err) {
      console.log(err)
      res.status(403).json({ err: 'Error occurred.' })
    }
    return null
  }

  if (req.method === 'POST') {
    const { title, body, authorId } = req.body.data

    try {
      await prisma.blogs.create({
        data: {
          title,
          body,
          authorId,
        },
      })

      res.status(201).json({ message: 'Blog saved' })
    } catch (err) {
      res.status(500).json({ message: 'Sorry, unable to handle request' })
    }
    return null
  }

  if (req.method === 'PUT') {
    const { title, body, id } = req.body.data

    try {
      await prisma.blogs.update({
        where: {
          id,
        },
        data: {
          title,
          body,
        },
      })

      res.status(200).json({ message: 'Blog has been updated' })
    } catch (err) {
      res.status(500).json({ message: 'Sorry, unable to handle request' })
    }
    return null
  }

  if (req.method === 'DELETE') {
    const { id } = req.body.data

    console.log('%c req.body ', 'background: darkblue; color: white', req.body)
    console.log('%c id ', 'background: darkblue; color: white', id)

    try {
      await prisma.blogs.delete({
        where: {
          id: +id,
        },
      })

      res.status(202).json({ message: 'Blog deleted' })
    } catch (err) {
      res.status(500).json({ message: 'Sorry, unable to handle request' })
    }
    return null
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
