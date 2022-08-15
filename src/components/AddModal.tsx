import React, { FC, useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import queryKeys from '@/react-query/constants'
import styles from '@/styles/ModalForm.module.scss'

interface ModalProps {
  onClose: Function
}

interface User {
  id: number
  name: string
}

interface Users {
  users?: {}[]
}

const AddModal: FC<ModalProps> = ({ onClose }) => {
  const queryClient = useQueryClient()
  const inputReference = useRef(null)
  const usersUrl = `${process.env.NEXT_PUBLIC_API}/users`
  const blogsUrl = `${process.env.NEXT_PUBLIC_API}/blogs`

  const [errorMessage, setErrorMessage] = useState('')
  const [values, setValues] = useState({
    title: '',
    authorId: '',
    body: '',
  })

  useEffect(() => {
    inputReference.current.focus()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const fetchUsers = async () => {
    const res = await fetch(usersUrl, {
      method: 'GET',
    })

    return res.json()
  }

  const addBlog = async () => {
    const authorId = parseInt(values.authorId, 10)
    await fetch(blogsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          title: values.title,
          body: values.body,
          authorId,
        },
      }),
    })
  }

  const mutation = useMutation(addBlog, {
    onSuccess: () => {
      setValues({ title: '', body: '', authorId: '' })
      setErrorMessage('')
      onClose()
    },
    onError: (err) => {
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys.allBlogs)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

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

  const { data, error, isError } = useQuery<Users, Error>(
    queryKeys.allUsers,
    fetchUsers
  )

  if (isError) {
    setErrorMessage(error.message)
  }

  const userArray = data?.users?.map((user: User) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

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
                ref={inputReference}
              />
            </label>
          </div>

          <div className={styles.section}>
            <label htmlFor="authorId">
              Author
              <br />
              <select
                onChange={(e) => handleInputChange(e)}
                className={styles.userSelect}
                name="authorId"
                value={values.authorId}
                id="authorId"
              >
                <option value="">&nbsp;</option>
                {userArray}
              </select>
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
          <button type="submit" className="primary-button" value="Add Blog">
            Add Blog
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

export default AddModal
