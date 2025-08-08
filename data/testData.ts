import {faker} from '@faker-js/faker';

const CountryOptions = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore',
]

const GenderOptions = [
    '#id_gender1',
    '#id_gender2',
]

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const emailUsername = faker.internet.username({firstName, lastName}).toLowerCase();
const randomCountry = CountryOptions[Math.floor(Math.random() * CountryOptions.length)];  
const randomGender = GenderOptions[Math.floor(Math.random() * GenderOptions.length)];

export const testData = {
 
    name: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
    email: `${emailUsername}@qa-test.com`,
    genderSelector: randomGender,
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