import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { userFactory } from '../factories/user.factory.js';
import { validateLogin, validateUser } from '../validation/user.js';

async function signUp(req, res) {
    try {
        if (validateUser(req.body)) {
            return res.status(400).send(validateUser(req.body).details[0].message);
        }

        const users = await connection.query('SELECT * FROM users WHERE email = $1;', [req.body.email]);
        const user = users.rows[0];

        if (user) return res.sendStatus(409);

        await userFactory(req.body);
        res.sendStatus(201);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const {
        email,
        password,
    } = req.body;

    try {
        if (validateLogin(req.body)) {
            return res.sendStatus(400);
        }

        const users = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = users.rows[0];

        if (!user) return res.sendStatus(401);

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) return res.sendStatus(401);

        const token = uuid();

        connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2) RETURNING token;', [user.id, token]);

        res.status(200).send({
            name: user.name,
            token,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signUp,
    signIn,
};
