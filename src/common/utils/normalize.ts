import {Dimensions, PixelRatio} from 'react-native'

const {width, height} = Dimensions.get('window')
const scale = width < 390 ? width / 390 : 1

export const normalize = (size: number) => {
  const newSize = size * scale
  const calculatedSize = Math.round(PixelRatio.roundToNearestPixel(newSize))

  if (PixelRatio.get() < 3) return calculatedSize - 0.5
  return calculatedSize
}

const guidelineBaseWidth = 390
const guidelineBaseHeight = 844

export const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size
export const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor
