import {StyleSheet, View} from 'react-native'
import {Highlight} from '@mgcrea/vision-camera-barcode-scanner'

interface Props {
  highlight: Highlight | null
  color?: string
}

const CodeHighlight = ({highlight, color = '#FFB612'}: Props) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {highlight ? (
        <View
          style={[
            styles.highlight,
            {
              top: highlight.origin.y,
              left: highlight.origin.x,
              width: highlight.size.width,
              height: highlight.size.height,
              borderColor: color
            }
          ]}
        />
      ) : null}
    </View>
  )
}

export default CodeHighlight

const styles = StyleSheet.create({
  highlight: {
    position: 'absolute',
    zIndex: 9999,
    borderWidth: 2,
    borderRadius: 16
  }
})
