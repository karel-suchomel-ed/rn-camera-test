import ScannerScreen from '@/features/scanner/screens/ScannerScreen'
import {StatusBar} from 'react-native'
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" />
      <ScannerScreen />
    </SafeAreaProvider>
  )
}

export default App
