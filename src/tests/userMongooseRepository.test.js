import 'dotenv/config';
import chai from "chai";
import DbFactory from '../data/factories/dbFactory.js';
import UserMongooseRepository from '../data/repositories/Mongoose/userMongooseRepository.js';
import { faker } from '@faker-js/faker';

const expect = chai.expect;
const db = DbFactory.create(process.env.DB);

describe("Testing User Mongoose Repository", () => {
  before(function () {
    db.init(process.env.TESTS_DB_URI);
    this.userRepository = new UserMongooseRepository();
  });

  after(function () {
    db.drop();
    db.close();
  });

  beforeEach(function () {
    this.timeout(5000);
  });

  it('El repositorio debe ser una instancia de UserMongooseRepository', function () {
    expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;
  });

  it('El repositorio debe devolver un arreglo', function () {
    return this.userRepository
      .find({ limit: 3, page: 1 })
      .then(result => {
        expect(Array.isArray(result.users)).to.be.equals(true);
        expect(result.pagination.limit).to.be.equals(3);
      });
  });

  it('El repositorio debe poder crear un user', function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678
    };

    return this.userRepository
      .create(user)
      .then(result => {
        expect(result.firstName).to.be.equals(user.firstName);
        expect(result.email).to.be.equals(user.email);
      });
  });

  it('El repositorio debe poder actualizar un user', function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678
    };

    return this.userRepository
      .create(user)
      .then(createdUser => {
        const updatedUser = {
          id: createdUser.id,
          firstName: 'UpdatedFirstName',
          lastName: 'UpdatedLastName'
        };

        return this.userRepository.updateOne(createdUser.id, updatedUser);
      })
      .then(updatedUser => {
        expect(updatedUser.firstName).to.be.equals('UpdatedFirstName');
        expect(updatedUser.lastName).to.be.equals('UpdatedLastName');
      });
  });

  it('El repositorio debe poder obtener un user por su ID', function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678
    };

    return this.userRepository
      .create(user)
      .then(createdUser => {
        return this.userRepository.findOne(createdUser.id);
      })
      .then(foundUser => {
        expect(foundUser).to.not.be.null;
        expect(foundUser.id).to.be.a('string');
        expect(foundUser.firstName).to.be.equals(user.firstName);
        expect(foundUser.lastName).to.be.equals(user.lastName);
        expect(foundUser.email).to.be.equals(user.email);
      });
  });

  it('El repositorio debe poder eliminar un user', function () {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      age: 18,
      isAdmin: false,
      password: 12345678
    };

    return this.userRepository
      .create(user)
      .then(createdUser => {
        return this.userRepository.delete(createdUser.id);
      })
      .then(deletedUser => {
        expect(deletedUser).to.not.be.null;
        expect(deletedUser.id).to.be.a('string');
        expect(deletedUser.firstName).to.be.equals(user.firstName);
        expect(deletedUser.lastName).to.be.equals(user.lastName);
        expect(deletedUser.email).to.be.equals(user.email);
      });
  });
});