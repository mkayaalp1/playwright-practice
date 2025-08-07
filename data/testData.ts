import {faker} from '@faker-js/faker';

const CountryOptions = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Isreal',
    'New Zealand',
    'Singapore',
]

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const emailUsername = faker.internet.username({firstName, lastName}).toLowerCase();
const randomCountry = CountryOptions[Math.floor(Math.random() * CountryOptions.length)];  

export const testData = {
 
    name: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
    email: `${emailUsername}@qa-test.com`,
    genderSelector: '#id_gender1',
    password: 'test1234!',
    day: faker.number.int({ min: 1, max: 31 }).toString(),
    month: faker.date.month(),
    year: faker.number.int({ min: 1900, max: 2021 }).toString(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    country: randomCountry,
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
};