import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

interface Blog {
  article: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
    }
  }
}

const BlogDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  const fetchArticle = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/${+id}`)
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Blog, Error>(
    'article',
    fetchArticle
  )

  console.log('%c data ', 'background: red; color: white', data)
  console.log(
    '%c data.article ',
    'background: red; color: white',
    data.article.title
  )

  console.log('%c error ', 'background: red; color: white', error)
  console.log('%c isLoading ', 'background: red; color: white', isLoading)
  console.log('%c isError ', 'background: red; color: white', isError)

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blog Detail</h1>
          <h2>{data.article.title}</h2>
          <p>
            Author: <i>{data.article.author.name}</i>
          </p>
          <p>{data.article.body}</p>
        </section>
      </main>
    </Layout>
  )
}

export default BlogDetailPage
