import {StyleProp, StyleSheet, View} from 'react-native'
import {PropsWithChildren, useMemo} from 'react'
import {Edge, initialWindowMetrics} from 'react-native-safe-area-context'

export interface LayoutProps extends PropsWithChildren {
  edges?: Edge[]
  style?: StyleProp<any>
}

const Layout = ({edges, style, children}: LayoutProps) => {
  const insets = initialWindowMetrics?.insets
  const hasCalculatedInsets = insets
    ? insets.top > 0 || insets.bottom > 0 || insets.left > 0 || insets.right > 0
    : false
  const insetStyles = useMemo(() => {
    return {
      top: {
        height: insets ? insets.top : undefined
      },
      bottom: {
        height: insets ? insets.bottom : undefined
      }
    }
  }, [insets])
  const {backgroundColor, ...rest} = style
  const bgStyle = useMemo(() => {
    return {
      backgroundColor
    }
  }, [backgroundColor])

  if (!hasCalculatedInsets) {
    return <View style={styles.flex} />
  }

  if (edges === undefined) {
    return <View style={[styles.container, rest, bgStyle]}>{children}</View>
  }

  return (
    <View style={styles.flex}>
      {edges.includes('top') && <View style={[insetStyles.top, bgStyle]} />}
      <View style={[styles.container, rest, bgStyle]}>{children}</View>
      {edges.includes('bottom') && <View style={[insetStyles.bottom, bgStyle]} />}
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 18
  }
})
