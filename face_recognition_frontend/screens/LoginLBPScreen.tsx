import React, { useState, useRef, useEffect } from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, Image, Alert } from "react-native";
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';


export default function LoginLBPScreen({ navigation }) {

    let camera = useRef(null);
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState<any>(null);



    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert("Access denied")
        }
    }

    const __takePicture = async () => {
        if (camera.current) {
            const photo = await camera.current.takePictureAsync();
            setCapturedImage(photo.uri);
            setPreviewVisible(true);
        }

    }

    const __uploadImage = async () => {
        if (!capturedImage) {
            Alert.alert("Erreur", "Aucune image capturée.");
            return;
        }

        const formData = new FormData();
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
        formData.append('image', file);

        try {
            const response = await axios.post('http://Serveur/api/analyse-lbp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Réponse de l\'API:', response.data);
            if (response.status === 200 && response.data.authenticated) {
                Alert.alert("Succès", "Authentification réussie !");
                navigation.navigate('Home'); // Redirection vers la page Home
            } else {
                Alert.alert("Erreur", "Authentification refusée. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            Alert.alert("Erreur", "Échec de l'envoi de l'image.");
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Connexion par LBP</Text>
            <TextInput style={styles.input} placeholder='Prénom' />
            {startCamera ? (
                previewVisible && capturedImage ? (
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: capturedImage }} style={styles.image} />
                        <TouchableOpacity onPress={() => { setPreviewVisible(false); setCapturedImage(null); setStartCamera(false); }}>
                            <Text>Reprendre</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Camera ref={camera}
                        style={{ flex: 1, width: "100%" }}
                        type={CameraType.front}
                    >
                        <View style={styles.cameraControls} >
                            <View
                                style={{
                                    alignSelf: 'center',
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={__takePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        backgroundColor: '#fff'
                                    }}
                                />
                            </View>
                        </View>
                    </Camera>
                )) : (

                <TouchableOpacity onPress={__startCamera} style={styles.button}>
                    <Text style={styles.buttonText}>Prendre une photo</Text>
                </TouchableOpacity>

            )
            }
            <TouchableOpacity onPress={__uploadImage} style={styles.button}>
                <Text style={styles.buttonText}>Envoyer l'image</Text>
            </TouchableOpacity>
            <StatusBar />
        </View>
    );
}
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
    button: {
        width: 130,
        borderRadius: 4,
        backgroundColor: '#14274e',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
    },
});