// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

faker.locale = 'pt_BR';

function fakeSubscriptionFactory() {
    const fakeSubscription = {
        fullName: faker.name.findName(),
        address: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        city: faker.address.cityName(),
        stateId: faker.datatype.number(27),
        deliveryDate: '01',
        products: [1, 2, 3],
    };
    return fakeSubscription;
}

export {
    fakeSubscriptionFactory,
};
