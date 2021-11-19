import bcrypt from 'bcrypt';
import { query } from 'express';
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

        const session = await connection.query(`
            SELECT
                sessions.user_id, sessions.token
            FROM 
                users
            JOIN
                sessions
            ON
                users.id = sessions.user_id
            WHERE
                users.email = $1
        ;`, [email]);

        if (session.rows[0]) {
            return res.status(200).send({
                id: user.id,
                name: user.name,
                email,
                password,
                token: session.rows[0].token,
            });
        }

        const token = uuid();

        await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [user.id, token]);

        res.status(200).send({
            name: user.name,
            email,
            password,
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
