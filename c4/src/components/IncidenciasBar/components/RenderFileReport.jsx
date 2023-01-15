import React from 'react'
import { getKindOfFile } from '../../../APIs/helpers'
import ReactPlayer from 'react-player'
import AudioPlayer from 'react-h5-audio-player';
import {Audio} from 'cloudinary-react';

const FileReport = ({url, public_id}) => {
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
    // return (
    //   <div className='flex controls'>
    //   <AudioPlayer
    //     autoPlay
    //     src={url}
    //     showJumpControls={false}
    //     showSkipControls={false}
    //     loop
    //     // other props here
    //   />
    //   </div>
    // )

    return (
      <div className='flex items-center justify-center'>
        <Audio cloudName='dvnx0dwis'
          className="w-full"
          sourceTypes={['wav', 'mp3', "m4a"]}
          publicId={public_id}
          controls
          fallback="Cannot play audio"
        >

        </Audio>
      </div>
    )
  }

}

export default FileReport