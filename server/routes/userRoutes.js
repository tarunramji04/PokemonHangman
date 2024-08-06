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

        //creating account auto logs in user so send back token for this route too
        const payload = {name : user.username}
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 120})

        return res.status(201).send({token: accessToken});
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

//get a user's info from token
router.get('/info', authenticateToken, async (req, res) => {
    try {
        const username = req.user.name;

        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({message: "User doesn't exist"});
        }
        return res.status(200).json({
            username: user.username,
            guessedPokemon: user.guessedPokemon
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//update user's guessed list
router.put('/update', authenticateToken, async (req, res) => {
    try {
        const username = req.user.name;
        const {id} = req.body;

        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({message: "User doesn't exist"});
        }
        user.guessedPokemon.addToSet(id);
        await user.save();

        return res.status(200).json(user.guessedPokemon);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        console.log("Null Token")
        res.sendStatus(401)
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = user
        next()
    })
}

export default router;
