import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import { signIn, signUp } from './controllers/user.js';
import checkToken from './middleware/auth.js';
import { postSubscription } from './controllers/subscription.js';
import 'dayjs/locale/pt-br.js';

console.log(dayjs().locale('pt-br').format('DD/MM/YYYY'));

const app = express();
app.use(express.json());
app.use(cors());

//SIGN-UP
app.post('/sign-up', signUp);

//SIGN-IN
app.post('/sign-in', signIn);

//SUBSCRIPTIONS
app.post('/subscription', checkToken, postSubscription);

app.get('/health', (req, res) => {
    res.status(200).send('Server is on.');
});

export default app;
