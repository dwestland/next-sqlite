import React, { FC, useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import styles from '@/styles/Form.module.css'

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
      <Modal show="true" title={null} onClose={() => setShowEditModal(false)}>
        <div className={styles.deleteModal}>
          <h2>Edit blog</h2>

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

            <div className="buttonContainer">
              <button type="submit" className="btn">
                Update
              </button>
              <button
                className="btn ghostButton"
                type="button"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
            {/* <input type="submit" value="Update Blog" className="btn" /> */}
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
