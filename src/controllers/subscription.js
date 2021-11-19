import dayjs from 'dayjs';
import connection from '../database/database.js';
import { validateSubscription } from '../validation/subscription.js';
import 'dayjs/locale/pt-br.js';


async function postSubscription(req, res) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    const {
        fullName,
        address,
        zipCode,
        city,
        stateId,
        deliveryDate,
        products,
    } = req.body;

    try {
        const user = await connection.query('SELECT user_id FROM sessions WHERE token = $1;', [token]);
        const userId = user.rows[0].user_id;
        if (validateSubscription(req.body)) {
            return res.status(400).send(validateSubscription(req.body).details[0].message);
        }
        if (!products.length) return res.status(400).send('Você precisa selecionar ao menos um produto!');

        const firstTimeSub = await connection.query('SELECT * FROM subscribers WHERE user_id = $1;', [userId]);

        if (firstTimeSub.rows.length) return res.sendStatus(409);

        const newSub = await connection.query(`
            INSERT INTO
                subscribers
                (user_id, complete_name, address, zip_code, city, state_id, entry_date, delivery_date)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        ;`, [userId, fullName, address, zipCode, city, stateId, dayjs().locale('pt-br').format('DD/MM/YYYY'), deliveryDate]);
        products.forEach(async (prod) => {
            await connection.query('INSERT INTO sub_products (sub_id, product_id) VALUES ($1, $2);', [newSub.rows[0].id, prod]);
        });
        res.sendStatus(201);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    postSubscription,
};
