let Spec = require('../../spec');

let User = require('../models/user.model');

let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

class UserTest extends Spec {

    constructor(model) {
        super(model);
    }

    fetchUsers(done) {
        this.request(this.app)
            .get("/users")
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("data");
                expect(res.body.data).to.not.be.empty;
            })
            .end(done);
    }

    fetchSingleUser(id, expectedUser, done) {
        this.request(this.app)
            .get(`/users/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.username).to.equal(expectedUser.username); 
                expect(res.body.data.email).to.equal(expectedUser.email);
            })
            .end(done);
    }

    updateUser(id, expectedUser, done) {
        this.request(this.app)
            .put(`/users/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedUser)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.username).to.not.equal(expectedUser.username);
                expect(res.body.data.email).to.equal(expectedUser.email);
            })
            .end(done);
    }

}

let userTest = new UserTest(User);

context("Users", () => {

    before(done => {
        userTest.authorize()
        .then(done)
        .catch(done);
    })

    describe("GET /users", () => {
        it("should fetch all users", done => {
            userTest.fetchUsers(done);                
        })
    })

    describe("GET /users/:id", () => {

        let newUser = new User({username: "new_user", email: "new_user@gmail.com", password: "123456"})
        let id = null;

        before(done => {
            // create a test user
            newUser.save()
            .then(user => {
                id = user._id;
                done();
            })
        })

        it("should fetch a single user", done => {
            userTest.fetchSingleUser(id, newUser, done);
        })

        after(done => {
            // remove the test user
            newUser.remove()
            .then(user => {
                done();
            })
        })

    })

    describe("PUT /users/id", () => {

        let newUser = new User({username: "new_user", email: "new_user@gmail.com", password: "123456"})
        let updatedUser = {username: "new_user_updated", email: "new_user_updated@gmail.com"};
        let id = null;

        before(done => {
             // create a test user
            newUser.save()
            .then(user => {
                id = user._id;
                done();
            })
        })

        it("should update the user", done => {
            userTest.updateUser(id, updatedUser, done);
        })

        after(done => {
            // remove the test user
            newUser.remove()
            .then(user => {
                done();
            })
        })

    })

})




