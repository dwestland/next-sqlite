import React, { FC, useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import styles from '@/styles/ModalForm.module.css'

interface ModalProps {
  onClose: Function
}

interface User {
  id: number
  name: string
}

interface Users {
  // blogs: {}[]
  users?: {}[]
}

const AddModal: FC<ModalProps> = ({ onClose }) => {
  const [values, setValues] = useState({
    title: '',
    authorId: '',
    body: '',
  })
  const [users, setUsers] = useState<Users>()
  const [errorMessage, setErrorMessage] = useState('')

  // const [blogType, setBlogType] = useState('')

  const usersUrl = `${process.env.NEXT_PUBLIC_API}/users`
  const blogsUrl = `${process.env.NEXT_PUBLIC_API}/blogs`

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

  const { data, error, isLoading, isError } = useQuery<Users, Error>(
    'allUsers',
    fetchUsers
  )

  // console.log('%c data ', 'background: red; color: white', data)
  // console.log('%c error ', 'background: red; color: white', error)
  // console.log('%c isLoading ', 'background: red; color: white', isLoading)
  // console.log('%c isError ', 'background: red; color: white', isError)

  const userArray = data?.users?.map((user: User) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  console.log('%c userArray ', 'background: red; color: white', userArray)

  // const userArray = () => {
  //   if (isLoading) {
  //     return <h4>Loading...</h4>
  //   }

  //   if (isError) {
  //     console.log('Error loading blogs: ', error?.message)
  //     return <h4>Error loading blogs</h4>
  //   }

  //   const allUsers = data.users.map((user: User) => (
  //     // <option key={user.id} value={user.id}>
  //     <p>{user.name}</p>
  //     // </option>
  //   ))

  //   return null

  //   // if (allUsers.length === 0) {
  //   //   return <h2>No Blogs</h2>
  //   // }

  //   return allUsers
  // }

  // //////////////////////////////////////////////////////////////////////////////
  const handlePostBlog = () => {
    const authorId = parseInt(values.authorId, 10)
    fetch(blogsUrl, {
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
      .then((res) => res.json())
      .then((resData) => {
        return resData
      })
      .catch((err) => {
        console.log("%c I'm in catch ", 'background: red; color: white')
        setErrorMessage(err)
        console.warn(err)
        // return null
      })

    setValues({ title: '', body: '', authorId: '' })
    onClose()

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyFields) {
      setErrorMessage('Please fill in all fields')
      return null
    }

    setErrorMessage('')
    handlePostBlog()

    return null
  }

  // //////////////////////////////////////////////////////////////////////////////

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
          <button type="submit" className="btn" value="Add Blog">
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
