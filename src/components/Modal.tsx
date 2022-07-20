import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'

export default function Modal({ show, onClose, children, modalTitle }) {
  const [isBrowser, setIsBrowser] = useState(false)

  // const modalTitle = 'Edit blog'

  console.log('%c modalTitle ', 'background: red; color: white', modalTitle)
  useEffect(() => setIsBrowser(true))

  console.log('%c onClose ', 'background: red; color: white', onClose)

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button
            className={styles.xButton}
            type="button"
            onClick={handleClose}
          >
            <a>
              <FaTimes />
            </a>
          </button>
          <h2>{modalTitle}</h2>
          {/* <h2>{modalTitle && { modalTitle }}</h2> */}
          {/* <h2>Edit blog</h2> */}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  }
  return null
}

// https://devrecipes.net/modal-component-with-next-js/
