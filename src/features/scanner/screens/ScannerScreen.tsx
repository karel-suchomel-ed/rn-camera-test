import {StyleSheet, View} from 'react-native'
import Header from '@/components/Header'
import Camera from '../components/Camera'

const ScannerScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Camera />
    </View>
  )
}

export default ScannerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
