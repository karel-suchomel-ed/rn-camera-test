import {normalize} from '@/common/utils/normalize'
import Button from '@/components/Button'
import Layout from '@/components/Layout'
import {StyleSheet, Text, View} from 'react-native'

interface Props {
  onReset: () => void
  code?: string
}

const Results = ({code, onReset}: Props) => {
  return (
    <View style={styles.container}>
      <Layout edges={['bottom']} style={styles.content}>
        {code ? (
          <>
            <Text style={styles.title}>{code}</Text>
            <Button onPress={onReset}>Reset</Button>
          </>
        ) : (
          <Text style={styles.title}>Scanning...</Text>
        )}
      </Layout>
    </View>
  )
}

export default Results

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    elevation: 10
  },
  content: {
    width: '100%',
    height: normalize(180),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingTop: 28,
    paddingBottom: 18,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: normalize(28),
    fontWeight: '600',
    color: 'white'
  }
})
