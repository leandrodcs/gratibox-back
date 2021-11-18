/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import { fakeUserFactory, userFactory } from '../src/factories/user.factory.js';
import connection from '../src/database/database.js';

afterAll(async () => {
    await connection.query('DELETE FROM users;');
    connection.end();
});

describe('POST sign-up', () => {
    it('returns 400 for invalid email', async () => {
        const invalidUser = fakeUserFactory('email');
        const result = await supertest(app).post('/sign-up').send(invalidUser);
        expect(result.status).toEqual(400);
        expect(result.text.split(' ')[0]).toEqual('"email"');
    });

    it('returns 400 for unsafe password', async () => {
        const invalidUser = fakeUserFactory('password');
        const result = await supertest(app).post('/sign-up').send(invalidUser);
        expect(result.status).toEqual(400);
        expect(result.text.split(' ')[0]).toEqual('"password"');
    });

    it('returns 201 for valid user', async () => {
        const validUser = fakeUserFactory();
        const result = await supertest(app).post('/sign-up').send(validUser);
        expect(result.status).toEqual(201);
    });

    it('returns 409 for conflicting email addresses', async () => {
        const validUser = fakeUserFactory();
        userFactory(validUser);
        const result = await supertest(app).post('/sign-up').send(validUser);
        expect(result.status).toEqual(409);
    });
});
