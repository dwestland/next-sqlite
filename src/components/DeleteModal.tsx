import React, { FC } from 'react'
import Modal from '@/components/Modal'

interface ModalProps {
  id: number
  title: string
  setShowDeleteModal: any
}

const DeleteModal: FC<ModalProps> = ({
  id,
  title,
  setShowDeleteModal,
}): JSX.Element => {
  const url = `${process.env.NEXT_PUBLIC_API}/blog/delete`

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

    setShowDeleteModal(false)
  }

  return (
    <div>
      <Modal show="true" title={null} onClose={() => setShowDeleteModal(false)}>
        <div className="cancelModal">
          <h2>Are you sure you want to delete</h2>
          <h3>&quot;{title}&quot;&nbsp;&nbsp;?</h3>
          <div className="buttonContainer">
            <button className="btn" type="button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn ghostButton"
              type="button"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
