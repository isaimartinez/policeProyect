import React from 'react'
import { getKindOfFile } from '../APIs/helpers'
import ReactPlayer from 'react-player'
import AudioPlayer from 'react-h5-audio-player';


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
      <div className='flex '>
        <ReactPlayer
          url={url}
          controls={true}
          loop
          config={{
          }}
        />
      </div>
    )
  }
  if(kindOfFile == "audio") {
    return (
      <div className='flex controls'>
      <AudioPlayer
        autoPlay
        src={url}
        showJumpControls={false}
        showSkipControls={false}
        loop
        // other props here
      />
      </div>
    )
  }

}

export default FileReport