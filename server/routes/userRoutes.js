import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';

const router = express.Router();

// add user to db 
router.post('/', async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            password: await User.schema.methods.generateHash(req.body.password),
            guessedPokemon: [] //always empty array
        };
    
        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({"message": error.message});
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({message: "Invalid username"});
        }
    
        const success = await user.checkPassword(req.body.password)
        if (!success) {
            return res.status(401).json({message: "Incorrect password"});
        }

        //payload for JWT
        const payload = {name : user.username}
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 120})

        return res.status(201).send({token: accessToken});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//get a user's guessed list
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(401).json({message: "User doesn't exist"});
        }
        return res.status(201).send(user.guessedPokemon);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//update user's guessed list
router.put('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const {id} = req.body;

        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(401).json({message: "User doesn't exist"});
        }
        user.guessedPokemon.addToSet(id);
        await user.save();

        return res.status(201).send(user.guessedPokemon);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

export default router;
