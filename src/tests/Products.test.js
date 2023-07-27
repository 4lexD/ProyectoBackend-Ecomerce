import 'dotenv/config';
import chai from "chai";
import { faker } from '@faker-js/faker';
import supertest from "supertest";
import initServer from './index.js';
import { loginUser } from './mocks/user.js';
import { postProduct,updateProduct} from './mocks/products.js';
const expect = chai.expect;
let jwt = ""
let id = ""

describe("Testing Products Endpoints", () => {
  before(async function () {
    const {app, db} = await initServer();
    const application = app.callback();
    this.requester = supertest.agent(application);
    this.db = db;
    this.app = app;

    const getToken = await this.requester
    .post('/api/session/login')
    .send(loginUser)

    const {_body} = getToken

    jwt= _body.accessToken;
  });

  after(function () {
    this.db.drop();
    this.db.close();
    //this.app.close()
  });

  beforeEach(function () {
    this.timeout(5000);
  });

  it('El metodo Post en el Endpoint /api/products debe poder crear un producto ', function () {

    return this.requester
    .post('/api/products')
    .set('Authorization', `Bearer ${jwt}`)
    .send(postProduct)
    .then(result => {

      expect(result.statusCode).to.be.equals(201)
      expect(typeof result._body.result).to.be.equals('object');
      expect(result._body.message).to.be.equals("success")
    })
  });

  it('El metodo Get en el Endpoint /api/products debe poder obtener productos ', function () {

    return this.requester
    .get('/api/products')
    .then(result => {
      expect(result.statusCode).to.be.equals(200)
      expect(Array.isArray(result._body.result.payload)).to.be.equals(true)
      expect(result._body.message).to.be.equals("success")
      const firstProduct = result._body.result.payload[0];
      id= firstProduct.id
    })
  });

  it('El metodo Get en el Endpoint /api/products/:id debe poder obtener un producto ', function () {

    return this.requester
    .get(`/api/products/${id}`)
    .then(result => {
      expect(result.statusCode).to.be.equals(200)
      expect(typeof result._body.result).to.be.equals('object');
      expect(result._body.message).to.be.equals("success")
    })
  });
  
  
  it('El metodo Put en el Endpoint /api/products/:id debe poder altualizar un producto ', function () {

    return this.requester
    .put(`/api/products/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updateProduct)
    .then(result => {
      expect(result.statusCode).to.be.equals(200)
      expect(typeof result._body.result).to.be.equals('object');
      expect(result._body.message).to.be.equals("success")
    })
  });

  it('El metodo Delete en el Endpoint /api/products/:id debe poder eliminar un producto ', function () {

    return this.requester
    .delete(`/api/products/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      expect(result.statusCode).to.be.equals(200)
      expect(typeof result._body.result).to.be.equals('object');
      expect(result._body.message).to.be.equals("success")
    })
  });

  it('El metodo Delete en el Endpoint /api/products/:id debe poder eliminar un producto (TEST FALLIDO)', function () {

    return this.requester
    .delete(`/api/products/${id}`)
    //.set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      expect(result.statusCode).to.be.equals(200)
      expect(typeof result._body.result).to.be.equals('object');
      expect(result._body.message).to.be.equals("success")
    })
  });
});
