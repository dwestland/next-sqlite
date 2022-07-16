import React, { useState } from 'react'
import Modal from '@/components/Modal'
import styles from '@/styles/Form.module.css'

const AddModal = () => {
  const [values, setValues] = useState({
    title: '',
    body: '',
  })
  const addBlogUrl = `${process.env.NEXT_PUBLIC_API}/blog/add`

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handlePostBlog = () => {
    fetch(addBlogUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: values.title,
          body: values.body,
          // authorId: session.id,
        },
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setValues({ title: '', body: '' })
        // toast.success('Blog saved')
        return resData
      })
      .catch((error) => {
        // toast.error('Error posting to database')
        console.warn(error)
      })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      console.log(
        '%c Need to put in validation message ',
        'background: red; color: white'
      )
    }
    handlePostBlog()

    return null
  }

  return (
    <div>
      <Modal
        show="true"
        // closeAddModal={closeAddModal}
        // onClose={() => setShowAddModal(false)}
      >
        <h1>Add Blog</h1>

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
          <input type="submit" value="Add Blog" className="btn" />
        </form>
      </Modal>
    </div>
  )
}

export default AddModal
