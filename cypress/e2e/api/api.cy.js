import apiHelpers from '../api/helper';
import Ajv from 'ajv';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' },
    address: { type: 'object' },
    phone: { type: 'string' },
    website: { type: 'string' },
    company: { type: 'object' },
  },
  required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
};

const ajv = new Ajv();

describe('Testes da API - jsonplaceholder', () => {
  
  it('Validar requisição GET', () => {
    apiHelpers.getUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      response.body.forEach(user => {
        const valid = ajv.validate(userSchema, user);
        expect(valid, ajv.errors).to.be.true;
      });
    });
  });

  it('Validar requisição POST', () => {
    const newUser = {
      name: 'Firmina',
      username: 'firmina_ina',
      email: 'firmina@automacao.com',
      address: {},
      phone: '123-456-7890',
      website: 'firmina.com',
      company: {}
    };

    apiHelpers.createUser(newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Firmina');

      const valid = ajv.validate(userSchema, response.body);
      expect(valid, ajv.errors).to.be.true;
    });
  });

  it('Validar requisição PUT', () => {
    const updatedUser = {
      id: 1,
      name: 'Firmina Updated',
      username: 'firmina_updated',
      email: 'firmina_updated@automacao.com',
      address: {},
      phone: '123-456-7890',
      website: 'firmina_updated.com',
      company: {}
    };

    apiHelpers.updateUser(1, updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', 'Firmina Updated');

      const valid = ajv.validate(userSchema, response.body);
      expect(valid, ajv.errors).to.be.true;
    });
  });

  it('Validar requisição DELETE', () => {
    apiHelpers.deleteUser(1).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
