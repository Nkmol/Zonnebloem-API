let app = require('../app');

let request = require('supertest');
let agent = request.agent(app);  

let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;

let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

let User = require('./user/models/user.model');

const testUser = {
    username: 'test',
    email: 'test@gmail.com',
    password: '123456'
}

// Wait unit the server is initialized 
// TODO: change this
before(done => {
    setTimeout(() => {
       done();
    }, 500);
})

// function createTestUser() {
    
// } 

class Spec {

    constructor(model) {
        this.app = app;
        this.request = request;
        this.agent = agent;
        this.model = model;
        this.token = null;
    }

    authorize() {

        return new Promise((resolve, reject) => {
            // STEP 1 - REMOVE USERS FROM THE DATABASE
            // STEP 2 - CREATE A TEST USER
            // STEP 3 - AUTHENTICATE USER
            // STEP 4 - SAVE THE TOKEN
            User.remove({})
            .then(res => this.createTestUser())
            .then(user => this.authenticate())
            .then(t => {
                this.token = t;
                resolve();
            })
            .catch(e => {
                reject();
            })
        })

         
    }

    createTestUser() {
        return new Promise((resolve, reject) => {
        request(app)
            .post('/register')
            .send(testUser)
            .end((e, r) => {
                if (e)
                    return reject(e);
                return resolve(r.body);
            })
        })
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            request(app)
                .post('/login')
                .send(testUser)
                .end((e, r) => {
                    if (e)
                        return reject(e);
                    return resolve(r.body.token)
                })
        });
    }

}


module.exports = Spec;