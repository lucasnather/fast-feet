import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe , beforeEach , afterEach, it } from 'vitest'

describe('/Post', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it(`Should not be able to create with invalid CPF`, async () => {
     await request(app.getHttpServer())
       .post('/api/users/register')
       .send({
         cpf: "invalid-cpf",
         name: "Bernadola",
         city: "manaus",
         password: "12345678"
     })
     .expect(404)
 
   });

  it(`Should be able to create a user`,   () => {
   request(app.getHttpServer())
       .post('/api/users/register')
       .send({
        cpf: "021.222.872-27",
        name: "Bernadola",
        city: "manaus",
        password: "12345678"
    })
    .expect(201)
     
  });

 

  afterEach(async () => {
    await app.close();
  });
});
