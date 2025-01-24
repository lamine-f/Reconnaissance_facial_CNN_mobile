import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) { 
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
        button: {
            margin: 8,
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 5,
        },
        buttonText: {
            color: '#fff',
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue cher utilisateur</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LoginFaceNet')}
            >
                <Text style={styles.buttonText}>Login FaceNet</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LoginLBP')}
            >
                <Text style={styles.buttonText}>Login LBP</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}