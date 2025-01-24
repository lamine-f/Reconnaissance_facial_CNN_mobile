import { View, StyleSheet, Text } from "react-native";
export default function HomeScreen({ navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
        },
        title: {
            fontSize: 24,
            marginBottom: 16,
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue cher utilisateur</Text>
        </View>
    );
}