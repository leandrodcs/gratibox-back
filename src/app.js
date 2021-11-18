import express from 'express';
import cors from 'cors';
import { signUp } from './controllers/user.js';

const app = express();
app.use(express.json());
app.use(cors());

//SIGN-UP
app.post('/sign-up', signUp);

app.get('/health', (req, res) => {
    res.status(200).send('Server is on.');
});

export default app;
