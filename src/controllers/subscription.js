/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import dayjs from 'dayjs';
import connection from '../database/database.js';
import { validateSubscription } from '../validation/subscription.js';
import 'dayjs/locale/pt-br.js';

async function postSubscription(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');
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
            const message = validateSubscription(req.body).details[0].message;
            if (message.includes("fullName")) return res.status(400).send('Nome completo deve ter no máximo 50 caracteres');
            if (message.includes("address")) return res.status(400).send('Endereço deve conter nome de rua e número');
            if (message.includes("zipCode")) return res.status(400).send('CEP deve seguir o exemplo: XXXXX-XXX');
            return res.status(400).send(message);
        }
        if (!products.length) return res.status(400).send('Você precisa selecionar ao menos um produto!');

        const firstTimeSub = await connection.query('SELECT * FROM subscribers WHERE user_id = $1;', [userId]);

        if (firstTimeSub.rows.length) return res.status(409).send('Você já possui uma inscrição.');

        const newSub = await connection.query(`
            INSERT INTO
                subscribers
                (user_id, complete_name, address, zip_code, city, state_id, entry_date, delivery_date)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        ;`, [userId, fullName, address, zipCode, city, stateId, dayjs().locale('pt-br').format('YYYY-MM-DD'), deliveryDate]);

        for (let i = 0; i < products.length; i++) {
            await connection.query('INSERT INTO sub_products (sub_id, product_id) VALUES ($1, $2);', [newSub.rows[0].id, products[i]]);
        }
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function getSubscription(req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const user = await connection.query('SELECT user_id FROM sessions WHERE token = $1;', [token]);
        const userId = user.rows[0].user_id;

        const subs = await connection.query(`
            SELECT 
                 id, entry_date, delivery_date
            FROM 
                subscribers 
            WHERE 
                user_id = $1;`, [userId]);
        if (!subs.rows.length) return res.sendStatus(204);

        const productsArr = await connection.query('SELECT products.name FROM sub_products JOIN products ON sub_products.product_id = products.id WHERE sub_id = $1 ORDER BY products.id ASC;', [subs.rows[0].id]);
        const products = productsArr.rows.map((prod) => prod.name);

        res.status(200).send({
            entryDate: subs.rows[0].entry_date,
            deliveryDate: subs.rows[0].delivery_date,
            products,
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    postSubscription,
    getSubscription,
};
