import {StyleSheet, Text, View} from 'react-native'
import {normalize} from '@/common/utils/normalize'
import Layout from './Layout'

const Header = () => {
  return (
    <View style={styles.container}>
      <Layout edges={['top']} style={styles.content}>
        <Text style={styles.title}>Camera</Text>
      </Layout>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
    elevation: 10
  },
  content: {
    height: normalize(100),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: normalize(18),
    fontWeight: '600'
  }
})
