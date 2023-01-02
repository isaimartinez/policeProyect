import React,{useState} from 'react'
import Modal from 'react-modal';
import {postFile, postComment} from '../APIs/index'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    height: '30%',
    padding: 0,
    backgroundColor: "#fafbfb",
  },
  overlay: {
    backgroundColor: 'rgba(250, 250, 249, 0.8)'
  }
};

const ModalComponent = ({ isModalOpen, setIsModalOpen, id }) => {
  const [file, setFile] = useState(null)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setFile(null)
    setComment("")
    setIsModalOpen(false)
  }

  const handleSubmit = async () => {
    console.log("comment", comment)
    setLoading(true)
    if(comment.length > 0){
      await postComment(comment, id)
    }
    if(file){
      let formData = new FormData()
      formData.append("file", file);
      await postFile(formData, id)
    }
    setLoading(false)
    setIsModalOpen(false)
    setFile(null)
    setComment("")
  }

  return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      > 
        {
          loading ? (
            <div className='flex flex-col h-full w-full items-center justify-center p-2'>
              <p>Loading...</p>
            </div>
          ) : (
            <div className='flex flex-col h-full w-full bg-red-200 p-2'>
              <div className='flex basis-1/4 justify-around items-center'>
                <p className='text-lg font-semibold'>Select A file Or Write a Comment</p>
                <p className='cursor-pointer' onClick={closeModal}>X</p>
              </div>
              <div className='flex flex-col gap-5 basis-2/4'>
                <div className='flex'>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className='flex flex-col'>
                  <p>Comment:</p>
                  <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
              </div>
              <div className='flex basis-1/4 items-center justify-center gap-5'>
                <button className='flex' type='button' onClick={closeModal}>Cancel</button>
                <button className='flex' type='button' onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          )
        }
      </Modal>
  )
}

export default ModalComponent