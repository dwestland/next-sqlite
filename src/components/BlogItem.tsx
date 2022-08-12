import React, { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
// import Tooltip from 'rc-tooltip'
import ShowMoreText from 'react-show-more-text'
import styles from '@/styles/BlogItem.module.scss'
import 'rc-tooltip/assets/bootstrap.css'
import Modal from '@/components/Modal'
import DeleteModal from '@/components/DeleteModal'
import EditModal from '@/components/EditModal'

interface Blog {
  blog: {
    id: number
    body: string
    title: string
    author: {
      name: string
      email: string
      id: number
    }
  }
}

const BlogItem: FC<Blog> = ({ blog }): JSX.Element => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const { id, title, body, author } = blog
  const bestName = author.name ?? author.email

  // Lock scroll when Edit Modal is visible
  useEffect(() => {
    const documentBody = document.querySelector('body')
    documentBody.style.overflow = showEditModal ? 'hidden' : 'auto'
  }, [showEditModal])

  // Lock scroll when Delete Modal is visible
  useEffect(() => {
    const documentBody = document.querySelector('body')
    documentBody.style.overflow = showDeleteModal ? 'hidden' : 'auto'
  }, [showDeleteModal])

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const openEditModal = () => {
    setShowEditModal(true)
  }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          Blog ID {id} &nbsp;&nbsp;
          <button
            type="button"
            className={styles.iconButton}
            onClick={openEditModal}
          >
            <a className={styles.icon}>
              <FaPencilAlt />
            </a>
          </button>
          {/* </Tooltip> */}
          &nbsp;&nbsp;
          {/* Delete Button */}
          {/* <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Delete</span>}
          > */}
          <button
            type="button"
            className={styles.iconButton}
            onClick={openDeleteModal}
          >
            <a className={styles.icon}>
              <FaTrashAlt />
            </a>
          </button>
          {/* </Tooltip> */}
          &nbsp;&nbsp;
        </div>
      </div>
      <div className={`${styles.row} ${styles.small}`}>
        <span>By {bestName}</span>
        <Link href={`/blog/${id}`}>
          <a>Blog detail</a>
        </Link>
      </div>
      <div className={styles.body}>
        <ShowMoreText
          lines={3}
          more="show more"
          less="show less"
          anchorClass={styles.anchorClass}
          truncatedEndingComponent="... "
        >
          <p>{body}</p>
        </ShowMoreText>
      </div>
      {showDeleteModal && (
        <Modal
          modalTitle="Delete blog"
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <DeleteModal
            id={id}
            title={title}
            // body={body}
            onClose={() => setShowDeleteModal(false)}
            // closeEditModal={closeEditModal}
          />
        </Modal>
      )}
      {showEditModal && (
        <Modal
          modalTitle="Edit blog"
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <EditModal
            id={id}
            title={title}
            body={body}
            onClose={() => setShowEditModal(false)}
            // closeEditModal={closeEditModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default BlogItem
