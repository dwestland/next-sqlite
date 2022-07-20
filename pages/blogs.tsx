import React, { useState } from 'react'
import { useQuery } from 'react-query'
// import Link from 'next/link'
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

  const pageResult = () => {
    if (isLoading) {
      return <h4>Loading...</h4>
    }

    if (isError) {
      console.log('Error loading blogs: ', error?.message)
      return <h4>Error loading blogs</h4>
    }

    const allBlogs = data.blogs.map((blog: Article) => (
      <BlogItem key={blog.title} blog={blog} />
    ))

    if (allBlogs.length === 0) {
      return <h2>No Blogs</h2>
    }

    return allBlogs
  }

  const openAddModal = () => {
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blogs</h1>
          <button type="button" className="btn" onClick={openAddModal}>
            <a>Add Blog</a>
          </button>
          {pageResult()}
        </section>
      </main>
      {showAddModal && <AddModal closeAddModal={closeAddModal} />}
    </Layout>
  )
}

export default BlogsPage
