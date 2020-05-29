const supertest = require('supertest');
const server = require('./server');
const db = require('./data/dbConfig');

afterEach(async ()=>{
    await db('users').truncate();
})

describe('server', ()=>{
    it('can run test',()=>{
        expect(true).toBeTruthy();
    })

    describe('GET /',()=>{
        it('Should return http status',()=>{
            return supertest(server)
            .get('/').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('should return {API: "UP"}',()=>{
            return supertest(server)
            .get('/').then(res=>{
                expect(res.body).toEqual({API: "UP"});
                expect(res.body.API).toBeDefined();
                expect(res.body.API).toBe("UP");
            })
        })
    })

    describe('GET /api/auth', ()=>{
        it('should return http code 200',()=>{
            return supertest(server)
            .get('/api/auth').then(res=>{
                expect(res.status).toBe(200);
            })
        })
    })

    describe('POST /api/auth',()=>{
        it('should register user and return http code 201',()=>{
            const testUser1 = {
                username: 'testUsername1',
                password: 'testPassword1'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(testUser1)
            .then(res=>{
                expect(res.status).toBe(201);
            })
        })
    })
    
    describe('POST /api/login',()=>{
        it('should login with existing user data and return http code 200',()=>{
            const testUser2 = {
                username: 'testUsername',
                password: 'testPassword'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(testUser2)
            .then(res=>{
                return supertest(server)
                .post('/api/auth/login')
                .send(testUser2)
                .then(res=>{
                    expect(res.status).toBe(200);
                })
            })
        })
    })

    describe('POST /api/user',()=>{
        it('post new event for user and return status 201',()=>{
            const testUser3 = {
                username: 'testUsername',
                password: 'testPassword'
            }
            const newEvent = {
                event_name: 'test event',
                date: '3/3/2020',
                time: '4pm',
                location: 'new york'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(testUser3)
            .then(()=>{
                return supertest(server)
                .post('/api/auth/login')
                .send(testUser3)
                .then(()=>{
                    return supertest(server)
                    .post('/api/user/1')
                    .send(newEvent)
                    .then(res=>{
                        expect(res.status).toBe(201);
                    })
                })
            })
        })
    })

    describe('GET /api/user',()=>{
        it('return current event for user and return status 200',()=>{
            const testUser3 = {
                username: 'testUsername',
                password: 'testPassword'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(testUser3)
            .then(()=>{
                return supertest(server)
                .post('/api/auth/login')
                .send(testUser3)
                .then(()=>{
                    return supertest(server)
                    .get('/api/user/1')
                    .then(res=>{
                        expect(res.status).toBe(200);
                    })
                })
            })
        })
    })

    describe('POST /api/invite',()=>{
        it('invite a user with given event id, receive http code 201',()=>{
            const hostUser = {
                username: 'hostuser',
                password: 'testPassword'
            }
            const guestUser = {
                username: "guestuser",
                password: "testPassword"
            }
            const newEvent = {
                event_name: 'test event',
                date: '3/3/2020',
                time: '4pm',
                location: 'new york'
            }
            const invitingUser = {
                username: 'guestuser'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(guestUser)
            .then(()=>{
                return supertest(server)
                .post('/api/auth/register')
                .send(hostUser)
                .then(()=>{
                    return supertest(server)
                    .post('/api/auth/login')
                    .send(hostUser)
                    .then(()=>{
                        return supertest(server)
                        .post('/api/user/1')
                        .send(newEvent)
                        .then(()=>{
                            return supertest(server)
                            .post('/api/invite/1')
                            .send(invitingUser)
                            .then(res=>{
                                expect(res.status).toBe(201);
                            })
                        })
                    })
                })
            })
        })
    })

    describe('GET /api/invite',()=>{
        it('showing all invites given to the user, return http code 200',()=>{
            const hostUser = {
                username: 'hostuser',
                password: 'testPassword'
            }
            const guestUser = {
                username: "guestuser",
                password: "testPassword"
            }
            const newEvent = {
                event_name: 'test event',
                date: '3/3/2020',
                time: '4pm',
                location: 'new york'
            }
            return supertest(server)
            .post('/api/auth/register')
            .send(guestUser)
            .then(()=>{
                return supertest(server)
                .post('/api/auth/register')
                .send(hostUser)
                .then(()=>{
                    return supertest(server)
                    .post('/api/auth/login')
                    .send(hostUser)
                    .then(()=>{
                        return supertest(server)
                        .post('/api/user/1')
                        .send(newEvent)
                        .then(()=>{
                            return supertest(server)
                            .get('/api/invite/1')
                            .then(res=>{
                                expect(res.status).toBe(200);
                            })
                        })
                    })
                })
            })
        })
    })
})