import {useEffect} from 'react'
import {StyleSheet, Text, Vibration, View} from 'react-native'
import {
  useCameraDevice,
  useCameraPermission,
  Camera as DefaultCamera,
  useCameraFormat
} from 'react-native-vision-camera'
import Results from './Results'
import {useBarcodeScanner} from '../hooks/useBarcodeScanner'
import CodeHighlight from './CodeHighlight'

const Camera = () => {
  const {hasPermission, requestPermission} = useCameraPermission()
  const device = useCameraDevice('back')
  const format = useCameraFormat(device, [
    {
      videoResolution: {
        width: 1080,
        height: 1920
      }
    },
    {
      photoResolution: {
        width: 1080,
        height: 1920
      }
    }
  ])
  const {
    props: cameraProps,
    barcode,
    highlight,
    resetScanner
  } = useBarcodeScanner({
    fps: 5,
    codeTypes: ['qr']
  })

  useEffect(() => {
    requestPermission()
  }, [requestPermission])

  useEffect(() => {
    if (barcode) {
      Vibration.vibrate(200)
    }
  }, [barcode])

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No permissions!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {device ? (
        <>
          <DefaultCamera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive
            orientation="portrait"
            enableZoomGesture
            format={format}
            {...cameraProps}
          />
          <CodeHighlight highlight={highlight} />
          <Results code={barcode} onReset={resetScanner} />
        </>
      ) : (
        <Text>No Device!</Text>
      )}
    </View>
  )
}

export default Camera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})
