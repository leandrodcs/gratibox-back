// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../database/database.js';

faker.locale = 'pt_BR';

function fakeUserFactory(invalidProperty) {
    const fakeUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(4),
    };
    if (invalidProperty) fakeUser[invalidProperty] = '123';
    return fakeUser;
}

async function userFactory(body) {
    const {
        name,
        email,
        password,
    } = body;
    const hashPassword = bcrypt.hashSync(password, 10);

    return connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, hashPassword]);
}

export {
    fakeUserFactory,
    userFactory,
};
