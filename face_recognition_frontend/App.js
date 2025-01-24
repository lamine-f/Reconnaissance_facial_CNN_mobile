import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './appNavigation/navigation';
import 'react-native-gesture-handler';

export default function App() {
  return (
     <AppNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
