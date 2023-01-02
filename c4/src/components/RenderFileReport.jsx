import React from 'react'
import { getKindOfFile } from '../APIs/helpers'
import ReactPlayer from 'react-player'

const FileReport = ({url}) => {
  const kindOfFile = getKindOfFile(url)
  if(kindOfFile == "pic") {
    return (
      <div>
        <img src={url}/>
      </div>
    )
  }
  if(kindOfFile == "video") {
    return (
      <div>
        <ReactPlayer
          url={url}
          config={{
          }}
        />
      </div>
    )
  }
}

export default FileReport