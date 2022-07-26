import React, { FC } from 'react'
import styles from '@/styles/ModalForm.module.css'

interface ModalProps {
  id: number
  title: string
  onClose: Function
}

const DeleteModal: FC<ModalProps> = ({ id, title, onClose }): JSX.Element => {
  const url = `${process.env.NEXT_PUBLIC_API}/blogs`

  const handleDelete = () => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          id,
        },
      }),
    })

    onClose()
  }

  return (
    <div>
      <br />
      <p style={{ fontSize: '20px' }}>Are you sure you want to delete:</p>
      <p style={{ fontSize: '24px' }}>&quot;{title}&quot;?</p>
      <br />
      <div className={styles.buttonContainer}>
        <button className="primary-button" type="button" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="ghost-button"
          type="button"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
