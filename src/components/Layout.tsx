/* eslint-disable arrow-body-style */
import React, { FC } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  title: string
  description: string
  children: any
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
}): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
