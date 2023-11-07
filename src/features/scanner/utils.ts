import {
  Barcode,
  Highlight,
  Size,
  applyScaleFactor,
  applyTransformation,
  computeBoundingBoxFromCornerPoints
} from '@mgcrea/vision-camera-barcode-scanner'
import {CameraProps, Frame} from 'react-native-vision-camera'

export const computeHighlights = (
  barcode: Barcode,
  frame: Frame,
  layout: Size,
  resizeMode: CameraProps['resizeMode'] = 'cover'
): Highlight | null => {
  'worklet'

  // If the layout is not yet known, we can't compute the highlights
  if (layout.width === 0 || layout.height === 0) {
    console.warn(`Encountered empty layout: ${JSON.stringify(layout)}`)
    return null
  }
  const {value, cornerPoints} = barcode
  if (!value) {
    return null
  }
  let translatedCornerPoints = cornerPoints
  const adjustedLayout = ['portrait', 'portrait-upside-down'].includes(frame.orientation)
    ? {
        width: layout.height,
        height: layout.width
      }
    : layout

  translatedCornerPoints = translatedCornerPoints?.map((point) =>
    applyScaleFactor(point, frame, adjustedLayout, resizeMode)
  )
  translatedCornerPoints = translatedCornerPoints?.map((point) =>
    applyTransformation(point, adjustedLayout, frame.orientation)
  )

  const valueFromCornerPoints = computeBoundingBoxFromCornerPoints(translatedCornerPoints!)

  return {
    key: value,
    ...valueFromCornerPoints
  }
}
