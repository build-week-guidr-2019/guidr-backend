const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');
let token;

beforeAll( async () => {
   const res = await request(server).post('/api/guides/register').send({ username: 'moriarty', password: 'sherlock'});

})




describe('testing server.js', ()=> {
    afterEach(async () => {
        await db('trips').truncate();
        await db('types').truncate();
        await db('guides').truncate();
    })

    describe('test login and getting a token',  () => {

        it('should get you a token and let you login', async ()=>{
            const res = await request(server).post('/api/login').send({ username: 'moriarty', password: 'sherlock'});
            token = res.body.token;
            console.log('this is the token',token);
            expect(res.status).toBe(200);
        })
      
    })

   
    describe('basic test of server setup', () => {
        //test that it's using the right environment, testing not development 
        it('should set the testing environment', () => {
            expect(process.env.DB_ENV).toBe('testing');
        })
    });

    describe('GET requests for various endpoints', () => {

        it('making a GET request to the endpoint "/" should return 200 ok',  async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
    
        });

        it('making a GET request to the endpoint "/api/trips" should return 200 OK', async () => {
            const res = await request(server).get('/api/trips');
            expect(res.status).toBe(200);
        
        });

        it('making a GET request to the endpoint "/api/types" should return 200 OK', async () => {
            const res = await request(server).get('/api/types');
            expect(res.status).toBe(200);
        });

        it('making a GET request to the endpoint "/api/guides" should return 200 OK', async () => {
            const res = await request(server).get('/api/guides');

            expect(res.status).toBe(200); 
            
        });
    });

    describe('POST to Trips, Types, Guides failure and success', ()=>{
        it('make a successful trip post, payload has all components; should return 201 OK', async () =>{
            const trip = {
                guide_id:1,
                title:"Test Trip",
                description:"Test Description",
                professional:false,
                type_id: 1,
                duration:555,
                date:""
            }
            const res = await request(server).post('/api/trips').send(trip).set('Authorization', token);
            expect(res.status).toBe(201);
        })

    })


 
});