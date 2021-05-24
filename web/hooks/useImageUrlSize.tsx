import { useEffect, useState } from 'react'

const getImageDims = (url: string): Promise<ReturnValue> => {
  const img = new Image()
  img.src = url

  return new Promise((resolve) => {
    img.addEventListener('load', function () {
      resolve({
        loaded: true,
        width: this.naturalWidth,
        height: this.naturalHeight,
        direction:
          this.naturalHeight < this.naturalWidth ? 'LANDSCAPE' : 'PORTRAIT',
      })
    })
  })
}

type ReturnValue = {
  loaded: boolean
  height: number | null
  width: number | null
  direction: 'PORTRAIT' | 'LANDSCAPE' | null
}

/**
 * useImageUrlSize
 * @param url image url
 * @returns promise that gives back image widht and height
 */

export const useImageUrlSize = (url: string): ReturnValue => {
  const [imageDims, setImageDims] = useState<ReturnValue>({
    height: null,
    width: null,
    direction: null,
    loaded: false,
  })

  /** Sets image aspect ratio */
  useEffect(() => {
    getImageDims(url).then((meta) => {
      setImageDims(meta)
    })
  }, [])

  return imageDims
}
