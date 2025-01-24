const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reconnaissance_faciale',
    
});

db.connect((err) => {
    if(err) {
        console.log("erreur de connexion à la base de données");
        console.log(err);
    }
    else {
        console.log("connexion à la base de données réussie");
    }
});

app.post('/signup', (req, res) => {
    const {nom, prenom, image} = req.body;
    if (!prenom || !nom || !image) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    const query = "INSERT INTO users (nom, prenom, image) VALUES (?, ?, ?)";
    db.query(query, [nom, prenom,image], (err, result) => {
        if(err) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Utilisateur ajouté avec succès', userId: result.insertId });
    });
})


const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
    