const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('testing server.js', ()=> {
   

    describe('basic test of server setup', () => {
        //test that it's using the right environment, testing not development 
        it('should set the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    });

    describe('GET requests', () => {

        it('making a GET request with / should return 200 ok',  () => {
            return request(server).get('/')
            .then(res => {
            expect(res.status).toBe(200);
             })
        })
    });
});