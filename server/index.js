import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user.js';

const app = express();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_CONNECTION;

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(201).send('test');
})

app.post('/user', async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            password: User.schema.methods.generateHash(req.body.password),
            guessedPokemon: [] //always empty array
        };
    
        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch(error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

mongoose.connect(mongoURL)
    .then(() => {
        console.log("connected to db");
        app.listen(port, () => {
            console.log(`App is listening to port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
