import {Barcode, Highlight, Size, scanCodes} from '@mgcrea/vision-camera-barcode-scanner'
import {useCallback, useState} from 'react'
import {Platform, type ViewProps} from 'react-native'
import {runAtTargetFps, useFrameProcessor, type CameraProps, CodeType} from 'react-native-vision-camera'
import {Worklets, useSharedValue} from 'react-native-worklets-core'
import {computeHighlights} from '../utils'

export type UseBarcodeScannerOptions = {
  fps?: number
  codeTypes?: CodeType[]
  onBarcodeScanned?: (barcodes: Barcode[]) => void
  disableHighlighting?: boolean
  defaultResizeMode?: CameraProps['resizeMode']
}

const pixelFormat: CameraProps['pixelFormat'] = Platform.OS === 'android' ? 'yuv' : 'native'

export const useBarcodeScanner = ({
  codeTypes,
  disableHighlighting,
  defaultResizeMode = 'cover',
  fps = 2
}: UseBarcodeScannerOptions) => {
  const layoutRef = useSharedValue<Size>({width: 0, height: 0})
  const resizeModeRef = useSharedValue<CameraProps['resizeMode']>(defaultResizeMode)
  const isPristineRef = useSharedValue(true)
  const isScannedRef = useSharedValue(false)
  const highlightRef = useSharedValue<Highlight | null>(null)
  const [barcode, setBarcode] = useState('')
  const [highlight, setHighlight] = useState<Highlight | null>(null)
  const setHighlightJS = Worklets.createRunInJsFn(setHighlight)
  const setBarcodeJS = Worklets.createRunInJsFn(setBarcode)

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet'

      runAtTargetFps(fps, () => {
        'worklet'

        const {value: layout} = layoutRef
        const {value: resizeMode} = resizeModeRef
        const barcodes = scanCodes(frame, {barcodeTypes: codeTypes})

        if (!isScannedRef.value) {
          if (barcodes.length > 0) {
            isScannedRef.value = true

            barcodes.forEach((code) => {
              if (code.value) {
                setBarcodeJS(code.value)
              }
            })
          }
        }

        if (disableHighlighting !== true && resizeMode !== undefined) {
          if (isPristineRef.value) {
            isPristineRef.value = false
            return
          }
          const {value: prevHighlight} = highlightRef
          if (barcodes[0]) {
            const computedHighlight = computeHighlights(barcodes[0], frame, layout, resizeMode)
            if (!prevHighlight && !computedHighlight) {
              return
            }
            setHighlightJS(computedHighlight)
          }
        }
      })
    },
    [layoutRef, resizeModeRef, highlightRef, isScannedRef, disableHighlighting]
  )

  const onLayout: ViewProps['onLayout'] = (event) => {
    const {width, height} = event.nativeEvent.layout
    layoutRef.value = {width, height}
  }

  const resetScanner = useCallback(() => {
    isScannedRef.value = false
    setHighlight(null)
    setBarcode('')
  }, [isScannedRef])

  return {
    props: {
      pixelFormat,
      frameProcessor,
      onLayout,
      resizeMode: defaultResizeMode
    },
    barcode,
    setBarcode,
    highlight,
    setHighlight,
    resetScanner
  }
}
