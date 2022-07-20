import React, { FC, useState } from 'react'
import Link from 'next/link'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
// import Tooltip from 'rc-tooltip'
import ShowMoreText from 'react-show-more-text'
import styles from '@/styles/BlogItem.module.css'
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

  const openDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const openEditModal = () => {
    setShowEditModal(true)
  }

  // const closeEditModal = () => {
  //   setShowEditModal(false)
  // }

  return (
    <div className={styles.blogItem}>
      <div className={styles.row}>
        <span>
          <strong>{title}</strong>
        </span>
        <div className={styles.icons}>
          {/*  TODO - Remove ID */}
          {id}
          {/* Edit Button */}
          {/* <Tooltip
            placement="top"
            trigger={['hover']}
            overlay={<span>Edit</span>}
          > */}
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
        <DeleteModal
          id={id}
          setShowDeleteModal={setShowDeleteModal}
          title={title}
        />
      )}
      {showEditModal && (
        <Modal
          modalTitle="Edit blog"
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          // closeEditModal={closeEditModal}
        >
          <EditModal
            id={id}
            title={title}
            body={body}
            onClose={() => setShowEditModal(false)}
            // closeEditModal={closeEditModal}
          />
        </Modal>

        // <EditModal
        //   id={id}
        //   title={title}
        //   body={body}
        //   setShowEditModal={setShowEditModal}
        // />
      )}
    </div>
  )
}

export default BlogItem
