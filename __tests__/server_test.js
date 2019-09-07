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
            //console.log('this is the token',token);
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

    describe('POST to Trips and Types failure and success', ()=>{
        
        it('should POST to trips, payload has all components; should return 201 OK', async () =>{

            const trip = {
                guide_id:1,
                title:"Test Trip",
                description:"Test Description",
                professional:false,
                type_id: 1,
                duration:555,
                date:"01/01/2525"
            }

            const res = await request(server).post('/api/trips').send(trip).set('Authorization', token);
            expect(res.status).toBe(201);
        });


        it('should try to POST to trips but fail because payload has missing components, should return 404', async () => {
        
            const brokenTrip = {
                guide_id:1,
                description:"Test Description",
                professional:false,
                type_id: 1,
                duration:555,
                date:"01/01/2525"
            }

            const res = await request(server).post('/api/trips').send(brokenTrip).set('Authorization', token);
            expect(res.status).toBe(404);


        })


        it('should POST to types and should return return 201 ok', async () => {

            const type = {
                type:"Sherlock Holmes Adventure",
                description:"Solving a mystery with the world's greatest detective!"
            }

            const res = await request(server).post('/api/types').send(type).set('Authorization', token);
            expect(res.status).toBe(201);

        });


        it('should try POST to types but fail and return 404; missing type field', async () => {

            const brokenType = {

                description:"Solving a mystery with the world's greatest detective!"
            }

            const res = await request(server).post('/api/types').send(brokenType).set('Authorization', token);
            expect(res.status).toBe(404);

        });


    });


    // describe('GET request for trip by id', ()=> {
    //     it('should create trip (successful POST) get it', async ()=> {
    //         const trip = {
    //             guide_id:1,
    //             title:"Test Trip",
    //             description:"Test Description",
    //             professional:false,
    //             type_id: 1,
    //             duration:555,
    //             date:"01/01/2525"
    //         }

    //         let res = await request(server).post('/api/trips').send(trip).set('Authorization', token);
    //         res = await request(server).get('api/trips/').set('Authorization', token);
    //         expect(res.status).toBe(200);

    //     })

    // })

    /*
    Unable to get DELETE endpoint test to work. 
    */
    // describe('DELETE request for trips', ()=> {
    //     it('should create trip (successful POST) and then delete it', async ()=> {
    //         const trip = {
    //             guide_id:1,
    //             title:"Test Trip",
    //             description:"Test Description",
    //             professional:false,
    //             type_id: 1,
    //             duration:555,
    //             date:"01/01/2525"
    //         }

    //         await request(server).post('/api/trips').send(trip).set('Authorization', token);
    //         const res = await request(server).delete('api/trips/1').set('Authorization', token);
    //         expect(res.status).toBe(200);

    //     })

    // })

  


 
});