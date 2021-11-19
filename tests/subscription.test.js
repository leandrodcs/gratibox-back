/* eslint-disable no-undef */
import '../src/setup.js';
import faker from 'faker';
import supertest from 'supertest';
import app from '../src/app.js';
import { fakeUserFactory, userFactory } from '../src/factories/user.factory.js';
import connection from '../src/database/database.js';
import { fakeSubscriptionFactory } from '../src/factories/subscription.factory.js';

const user = fakeUserFactory();
let userId;
const token = faker.datatype.uuid();
const validBody = fakeSubscriptionFactory();

beforeAll(async () => {
    const result = await userFactory(user);
    userId = result.rows[0].id;
    await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [userId, token]);
});

afterAll(async () => {
    await connection.query('TRUNCATE users CASCADE;');
    connection.end();
});

describe('POST subscription', () => {
    it('returns 201 for succesful subscription', async () => {
        const result = await supertest(app).post('/subscription').send(validBody).set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(201);
    });

    it('returns 409 for conflicting subscriptions', async () => {
        const result = await supertest(app).post('/subscription').send(validBody).set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(409);
    });
});
