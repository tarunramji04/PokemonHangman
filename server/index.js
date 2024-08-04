import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js'
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_CONNECTION;

app.use(express.json());
app.use(cors());
app.use('/user', userRoute);

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
