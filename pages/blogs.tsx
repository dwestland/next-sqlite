import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import BlogItem from '@/components/BlogItem'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import AddModal from '@/components/AddModal'
import queryKeys from '@/constants/queryKeys'
import apiRootUrl from '@/constants/apiRootUrl'

interface Blog {
  id: number
  body: string
  title: string
  author: {
    id: number
    name: string
    email: string
  }
}

interface Blogs {
  blogs: {
    id: number
    body: string
    title: string
    author: {
      id: number
      name: string
      email: string
    }
  }
}

const BlogsPage = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const url = `${apiRootUrl.NEXT_PUBLIC_API}/blogs`

  // Lock scroll when modal visible
  useEffect(() => {
    const body = document.querySelector('body')
    body.style.overflow = showAddModal ? 'hidden' : 'auto'
  }, [showAddModal])

  const fetchAllBlogs = async () => {
    const res = await fetch(url, {
      method: 'GET',
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Blogs, Error>(
    queryKeys.allBlogs,
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

    const { blogs } = data
    const allBlogs = blogs?.map((blog: Blog) => (
      <BlogItem key={blog.id} blog={blog} />
    ))

    if (allBlogs.length === 0) {
      return <h2>No Blogs</h2>
    }

    return allBlogs
  }

  const openAddModal = () => {
    setShowAddModal(true)
  }

  return (
    <Layout title="Document" description="Document description">
      <main>
        <section>
          <h1>Blogs</h1>
          <button
            type="button"
            className="primary-button"
            onClick={openAddModal}
          >
            <a>Add Blog</a>
          </button>
          {pageResult()}
        </section>
      </main>
      {showAddModal && (
        <Modal
          modalTitle="Add blog"
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
        >
          <AddModal onClose={() => setShowAddModal(false)} />
        </Modal>
      )}
    </Layout>
  )
}

export default BlogsPage
