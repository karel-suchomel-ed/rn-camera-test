import {ReactNode} from 'react'
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native'

interface Props extends PressableProps {
  pressedOpacity?: number
  children: ReactNode
}

const Button = ({pressedOpacity, children, ...otherProps}: Props) => {
  return (
    <Pressable style={({pressed}) => [pressed ? {opacity: pressedOpacity} : null, styles.container]} {...otherProps}>
      <View style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#b58df1',
    paddingHorizontal: 0,
    overflow: 'hidden'
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
})
