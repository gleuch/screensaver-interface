import React, { useState, useEffect } from 'react'
import VideoPlayer from './MediaViewer/VideoPlayer'
import AudioPlayer from './MediaViewer/AudioPlayer'

const ImageCard = ({ srcUrl, nft, footer, children }) => {

  const [type, setType] = useState('')

  useEffect(() => {
    if (!nft?.media?.mimeType) return
    const typeArray = nft?.media?.mimeType.split('/')
    console.log("TYPE", typeArray[0])
    setType(typeArray[0])
  }, [])

  return (
    <div
      className={
        'w-full border-white border-solid border border-gray-800 shadow-white max-w-sm text-white rounded-2xl '
      }
    >
      <div className={'flex flex-col mx-auto'}>
        <div
          className={'flex flex-col w-full mx-auto space-y-3'}
        >
          <div className={'rounded-t-2xl overflow-hidden h-96 bg-gray-900'}>

            {type === 'image' && (
              <img src={nft.image} className={'w-full'} />
            )}
            {type === 'video' && (
              <VideoPlayer fileUrl={nft.animation_url} controls={false}/>
            )}
            {type === 'audio' && (
              <AudioPlayer fileUrl={nft.animation_url} />
            )}

            {(type === 'model' || type === '' || nft?.media?.mimeType === 'application/octet-stream') && (
              <model-viewer
                autoplay
                style={{ width: '100%', height: '100%' }}
                id={nft?.tokenId}
                alt={nft?.name + nft?.tokenId}
                src={nft?.animation_url}
                auto-rotate
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
              // ios-src={}
              />
            )}

            {/* {type === 'application' && (
        <PdfViewer fileUrl={nft.animation_url} />
      )} */}


            {/* { !!nft?.image ? 
            <img src={nft.image} alt={altText} className={'w-full'}/>
            :
            <model-viewer
              style={{width: '100%', height: '100%'}}
              id={nft?.tokenId}
              alt={nft?.name + nft?.tokenId}
              src={nft?.animation_url}
              auto-rotate
              camera-controls
              ar
              ar-modes="quick-look"
              ar-scale="auto"
              // ios-src={}
            />
            } */}
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
      {footer && (
        <>
          <div
            className={
              'mt-5 mb-3'
            }
          />
          <div className={'mx-auto w-full'}>
            {footer}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageCard
