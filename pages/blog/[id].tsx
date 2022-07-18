import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

interface Blog {
  blog: {
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
  console.log('%c router.query ', 'background: red; color: white', router.query)

  const fetchArticle = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blog/${+id}`)
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Blog, Error>(
    'article',
    fetchArticle
  )

  // const { body } = data.blog

  const pageResult = () => {
    if (isLoading) {
      return <h4>Loading...</h4>
    }

    if (isError) {
      console.log('Error loading blog detail: ', error?.message)
      return <h4>Error loading blog detail</h4>
    }

    // if (blogDetail.length === 0) {
    //   return <h2>No Blogs</h2>
    // }

    return (
      <>
        <h2>{data.blog.title}</h2>
        <p>
          Author: <i>{data.blog.author.name}</i>
        </p>
        <p>{data.blog.body}</p>
      </>
    )
  }

  // console.log(
  //   '%c data.blog.title ',
  //   'background: red; color: white',
  //   data.blog.title
  // )

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blog Detail</h1>
          {pageResult()}
        </section>
      </main>
    </Layout>
  )
}

export default BlogDetailPage
