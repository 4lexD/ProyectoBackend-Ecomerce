import 'dotenv/config';
import chai from "chai";
import DbFactory from '../data/factories/dbFactory.js';
import RoleMongooseRepository from '../data/repositories/Mongoose/roleMongooseRepository.js';

const expect = chai.expect;
const db = DbFactory.create(process.env.DB);

describe("Testing Role Mongoose Repository", () => {
  before(function () {
    db.init(process.env.TESTS_DB_URI);
    this.roleRepository = new RoleMongooseRepository();
  });

  after(function () {
    //db.drop();
    //db.close(); por alguna razon si dropeo la base de datos aca no pasa al test de users!!
  });

  beforeEach(function () {
    this.timeout(5000);
  });

  it('El repositorio debe ser una instancia de RoleMongooseRepository', function () {
    expect(this.roleRepository).to.be.an.instanceOf(RoleMongooseRepository);
  });

  it('El repositorio debe poder crear un role', async function () {
    const roleData = {
      name: "administrator",
      permissions: ['create', 'read', 'update', 'delete']
    };
  
    const createdRole = await this.roleRepository.create(roleData);
    expect(createdRole.name).to.equal(roleData.name);
    expect(createdRole.permissions).to.deep.equal(roleData.permissions);
  });
it('El repositorio debe poder obtener todos los roles', async function () {
    const paginate = {
      limit: 10,
      page: 1
    };
  
    const result = await this.roleRepository.getAll(paginate);
  
    expect(result.roles).to.be.an('array');
    expect(result.pagination).to.be.an('object');
});

it('El repositorio debe poder obtener un role por su ID', async function () {
  const roleData = {
    name: "testRole",
    permissions: ['create', 'read', 'update', 'delete']
  };

  const createdRole = await this.roleRepository.create(roleData);

  const retrievedRole = await this.roleRepository.getOne(createdRole.id);

  expect(retrievedRole.id).to.equal(createdRole.id);
  expect(retrievedRole.name).to.equal(createdRole.name);
  expect(retrievedRole.permissions).to.deep.equal(createdRole.permissions);
});

it('El repositorio debe poder actualizar un role', async function () {
  const roleData = {
    name: "testRole",
    permissions: ['create', 'read', 'update', 'delete']
  };

  const createdRole = await this.roleRepository.create(roleData);

  const updatedRoleData = {
    name: "updatedRole",
    permissions: ['read', 'update']
  };

  const updatedRole = await this.roleRepository.updateOne(createdRole.id, updatedRoleData);

  expect(updatedRole.id).to.equal(createdRole.id);
  expect(updatedRole.name).to.equal(updatedRoleData.name);
  expect(updatedRole.permissions).to.deep.equal(updatedRoleData.permissions);
});

it('El repositorio debe poder eliminar un role', async function () {
  const roleData = {
    name: "testRole",
    permissions: ['create', 'read', 'update', 'delete']
  };
  const createdRole = await this.roleRepository.create(roleData);

  await this.roleRepository.deleteOne(createdRole.id);

  let deletedRole;
  try {
    deletedRole = await this.roleRepository.getOne(createdRole.id);
  } catch (error) {

    expect(error.message).to.equal('Role dont exist.');
  }
  expect(deletedRole).to.be.undefined;
});
});