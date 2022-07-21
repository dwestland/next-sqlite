import React, { FC, useState, useEffect } from 'react'
import styles from '@/styles/ModalForm.module.css'

interface ModalProps {
  id: number
  title: string
  body: string
  setShowEditModal: any
}

const DeleteModal: FC<ModalProps> = ({
  id,
  title,
  body,
  setShowEditModal,
  onClose,
}): JSX.Element => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  })
  const url = `${process.env.NEXT_PUBLIC_API}/blog/update`

  useEffect(() => {
    setValues({ title, body })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
          title: values.title,
          body: values.body,
        },
      }),
    })

    setShowEditModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <div className={styles.section}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className={styles.section}>
            <label htmlFor="body">
              Body
              <textarea
                name="body"
                id="body"
                value={values.body}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className="btn">
            Update
          </button>
          <button
            className="ghost-button"
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteModal
