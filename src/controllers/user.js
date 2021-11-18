import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import { validateUser } from '../validation/user.js';

async function signUp(req, res) {
    const {
        name,
        email,
        password,
    } = req.body;

    try {
        if (validateUser(req.body)) {
            return res.status(400).send(validateUser(req.body).details[0].message);
        }
        const users = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);
        const user = users.rows[0];
        if (user) return res.sendStatus(409);
        const hashPassword = bcrypt.hashSync(password, 10);
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, hashPassword]);
        res.sendStatus(201);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signUp,
};
