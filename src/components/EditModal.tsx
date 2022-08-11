import React, { FC, useState, useEffect } from 'react'
import styles from '@/styles/ModalForm.module.css'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import queryKeys from '@/react-query/constants'

interface ModalProps {
  id: number
  title: string
  body: string
  setShowEditModal: any
  onClose: Function
}

const EditModal: FC<ModalProps> = ({
  id,
  title,
  body,
  setShowEditModal,
  onClose,
}): JSX.Element => {
  const queryClient = useQueryClient()
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({
    title: '',
    body: '',
  })

  useEffect(() => {
    setValues({ title, body })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const editBlog = async () => {
    // const authorId = parseInt(values.authorId, 10)
    await fetch(url, {
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
  }

  const mutation = useMutation(editBlog, {
    onSuccess: () => {
      // setValues({ title: '', body: '', authorId: '' })
      // setErrorMessage('')
      onClose()
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.allBlogs)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // fetch(url, {})

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      setErrorMessage('Please fill in all fields')
      return null
    }

    mutation.mutate()

    return null
  }

  return (
    <div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
          <button type="submit" className="primary-button">
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

export default EditModal
