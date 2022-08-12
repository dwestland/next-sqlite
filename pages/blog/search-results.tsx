import React from 'react'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'

interface Search {
  articles: []
}

interface SearchResults {
  id: number
  body: string
  title: string
}

const searchResults = () => {
  const url = `${process.env.NEXT_PUBLIC_API}/blog/search`
  const router = useRouter()
  const searchTerm = router.query.term

  const fetchSearchResults = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: {
          term: searchTerm,
        },
      }),
    })
    return res.json()
  }

  const { data, error, isLoading, isError } = useQuery<Search, Error>(
    'searchResults',
    fetchSearchResults
  )

  const result = () => {
    if (isLoading) {
      return <span>Loading...</span>
    }

    if (isError) {
      return <span>Error: {error?.message}</span>
    }

    console.log('%c i am results ', 'background: red; color: white')
    const results = data.articles.map((article: SearchResults) => (
      <p key={article.id}>
        <strong>{article.title}</strong>
        &nbsp;-&nbsp;
        <Link href={`/blog/${article.id}`}>
          <a>Blog detail</a>
        </Link>
      </p>
    ))
    return results
  }

  return (
    <Layout title="Search Results" description="Search results page.">
      <main>
        <section>
          <h1>Search Results for {router.query.term}</h1>
          {result()}
        </section>
      </main>
    </Layout>
  )
}

export default searchResults
