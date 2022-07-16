import React from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import BlogItem from '@/components/BlogItem'
import Layout from '@/components/Layout'

interface Articles {
  articles: {}[]
  userLikingOwnError: () => void
}

interface Article {
  id: number
  body: string
  title: string
  author: {
    id: number
    name: string
    email: string
  }
}

const BlogsPage = () => {
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const fetchAllBlogs = async () => {
    const res = await fetch(url, {
      method: 'GET',
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Articles, Error>(
    'allBlogs',
    fetchAllBlogs
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error?.message}</span>
  }

  const result = () => {
    const allBlogs = data.articles.map((article: Article) => (
      <BlogItem key={article.title} article={article} />
    ))

    return allBlogs
  }

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blogs</h1>
          <Link href="/blogs/add">
            <a className="btn">Add Blog</a>
          </Link>
          <div>
            {data.articles.length === 0 && <h3>No Articles</h3>}
            {result()}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default BlogsPage
