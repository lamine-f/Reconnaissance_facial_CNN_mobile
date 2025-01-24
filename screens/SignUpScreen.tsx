import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
export default function SignUpScreen({ navigation }) {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const onSignUp = async () => {
        if (!prenom || !nom || !image) {
            setError("Tous les champs sont requis !");
            return;
        }
    
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
    
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], 'profile_picture.jpg', { type: blob.type || 'image/jpeg' });
            formData.append('image', file);
    
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                body: formData,  // Ne pas utiliser JSON.stringify ici
            });
    
            const data = await res.json();
            if (res.status === 201) {
                alert('Inscription réussie');
                navigation.navigate('Welcome');
            } else {
                setError(data.error || "Une erreur s'est produite");
            }
        } catch (error) {
            setError("Erreur lors de l'inscription");
        }
    };
    
    
    const uploadImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Veuillez autoriser l'accès à la bibliothèque de médias");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder='Prenom'
                value={prenom}
                onChangeText={setPrenom}
            />
            <TextInput
                style={styles.input}
                placeholder='Nom'
                value={nom}
                onChangeText={setNom}
    
            />
            <View style={styles.buttonContainer}>
                <Button title="Choisir une photo" onPress={uploadImage} />
            </View>
    
            {image && <Image source={{ uri: image }} style={styles.image} />}
    
            <Button title="S'inscrire" onPress={onSignUp} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    
    );
};



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
    input: {
        marginVertical: 8,
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 16,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});


