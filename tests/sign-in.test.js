/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import { fakeUserFactory, userFactory } from '../src/factories/user.factory.js';
import connection from '../src/database/database.js';

const user = fakeUserFactory();

beforeAll(async () => {
    await userFactory(user);
});

afterAll(async () => {
    // await connection.query('DELETE FROM sessions;');
    // await connection.query('DELETE FROM users;');
    await connection.query('TRUNCATE users CASCADE;');
    connection.end();
});

describe('POST sign-in', () => {
    it('returns 400 for empty body', async () => {
        const result = await supertest(app).post('/sign-in');
        expect(result.status).toEqual(400);
    });

    it('returns 401 for invalid email', async () => {
        const invalidBody = {
            email: 'invalid@email.com',
            password: user.password,
        };
        const result = await supertest(app).post('/sign-in').send(invalidBody);
        expect(result.status).toEqual(401);
    });

    it('returns 401 for invalid password', async () => {
        const invalidBody = {
            email: user.email,
            password: 'invalidPassword',
        };
        const result = await supertest(app).post('/sign-in').send(invalidBody);
        expect(result.status).toEqual(401);
    });

    it('returns 200 for valid body', async () => {
        const validBody = {
            email: user.email,
            password: user.password,
        };
        const result = await supertest(app).post('/sign-in').send(validBody);
        expect(result.status).toEqual(200);
        expect(result.body).toHaveProperty('token');
        expect(result.body).toHaveProperty('name', user.name);
    });
});
