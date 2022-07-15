import React from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'

const NotFound = () => {
  return (
    <Layout title="404 Error" description="404 Error, page not found">
      <main>
        <section>
          <h1>404 Error</h1>
          <h3>Page not found</h3>
          <p>
            The page you are looking for does not exist; it may have been moved,
            or removed altogether. You can return to the{' '}
            <Link href="/">
              <a>Home Page</a>
            </Link>
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default NotFound
