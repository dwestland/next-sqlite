import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'
import BlogItem from '@/components/BlogItem'
import Layout from '@/components/Layout'
import AddModal from '@/components/AddModal'

interface Blogs {
  blogs: {}[]
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
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const fetchAllBlogs = async () => {
    const res = await fetch(url, {
      method: 'GET',
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Blogs, Error>(
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
    const allBlogs = data.blogs.map((blog: Article) => (
      <BlogItem key={blog.title} blog={blog} />
    ))

    return allBlogs
  }

  const openAddModal = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(true)
  }

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blogs</h1>
          <Link href="/blogs/add">
            <a className="btn">Test Link as Button</a>
          </Link>

          <button type="button" className="btn" onClick={openAddModal}>
            <a>Add Blogs</a>
          </button>

          <div>
            {data.blogs.length === 0 && <h3>No Blogs</h3>}
            {result()}
          </div>
        </section>
      </main>
      {showAddModal && <AddModal closeAddModal={closeAddModal} />}
    </Layout>
  )
}

export default BlogsPage
