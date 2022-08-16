import React from 'react'
import Link from 'next/link'
import Search from '@/components/Search'
import styles from '@/styles/Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Search />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/two-column">
            <a>Two Column</a>
          </Link>
        </li>
        <li className={styles.li}>
          <Link href="/blogs">
            <a>Blogs</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
