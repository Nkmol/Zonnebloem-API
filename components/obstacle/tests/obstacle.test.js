let Spec = require('../../spec');

let Obstacle = require('../models/obstacle.model');

let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

class ObstacleTest extends Spec {

    constructor(model) {
        super(model);
    }

     fetchObstacles(done) {
        this.request(this.app)
            .get("/obstacles")
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("data");
            })
            .end(done);
    }

     fetchSingleObstacle(id, expectedObstacle, done) {
        this.request(this.app)
            .get(`/obstacles/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.title).to.equal(expectedObstacle.title); 
                expect(res.body.data.description).to.equal(expectedObstacle.description);
                expect(res.body.data.state).to.equal(expectedObstacle.state);
            })
            .end(done);
    }

    updateObstacle(id, expectedObstacle, done) {
        this.request(this.app)
            .put(`/obstacles/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedObstacle)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.title).to.equal(expectedObstacle.title);
                expect(res.body.data.description).to.equal(expectedObstacle.description);
                expect(res.body.data.state).to.equal(expectedObstacle.state);
            })
            .end(done);
    }

    patchObstacle(id, expectedObstacle, done) {
        this.request(this.app)
            .patch(`/obstacles/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedObstacle)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.title).to.equal(expectedObstacle.title);
            })
            .end(done);
    }

    deleteObstacle(id, done) {
        this.request(this.app)
            .delete(`/obstacles/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("success");
                expect(res.body.success).to.be.true;
            })
            .end(done);
    }

}

let obstacleTest = new ObstacleTest(Obstacle);

context("Obstacles", () => {

    before(done => {
        obstacleTest.authorize()
        .then(done)
        .catch(done);
    })

     describe("GET /obstacles", () => {
        it("should fetch all obstacles", done => {
            obstacleTest.fetchObstacles(done);                
        })
    })

    describe("GET /obstacles/:id", () => {

        let obstacleData = {
            title: "test_title",
            description: "test_description",
            state: "NEW",
            factor: "HIGH"
        }
        let newObstacle = new Obstacle(obstacleData);
        let id = null;

        before(done => {
            newObstacle.save()
            .then(obstacle => {
                id = obstacle._id;
                done();
            })
        })

        it("should fetch a single obstacle", done => {
            obstacleTest.fetchSingleObstacle(id, newObstacle, done);
        })

        after(done => {
            newObstacle.remove()
            .then(report => {
                done();
            })
        })

    })

    describe("PUT /reports/:id", () => {

        let obstacleData = {
            title: "test_title",
            description: "test_description",
            state: "NEW",
            factor: "HIGH"
        }
        let newObstacle = new Obstacle(obstacleData);
        let updatedObstacle = {
            title: "test_obstacle_updated", 
            description: "test_obstacle_updated",
            state: "REPORTED",
            factor: "MEDIUM"
        };
        let id = null;

        before(done => {
            newObstacle.save()
            .then(obstacle => {
                id = obstacle._id;
                done();
            })
        })

        it("should update the obstacle", done => {
            obstacleTest.updateObstacle(id, updatedObstacle, done);
        })

        after(done => {
            newObstacle.remove()
            .then(obstacle => {
                done();
            })
        })

    })

    describe("PATCH /obstacles/:id", () => {

        let obstacleData = {
            title: "test_title",
            description: "test_description",
            state: "NEW",
            factor: "HIGH"
        }
        let newObstacle = new Obstacle(obstacleData);
        let updatedObstacle = {
            title: "test_obstacle_updated"
        };
        let id = null;

        before(done => {
            newObstacle.save()
            .then(obstacle => {
                id = obstacle._id;
                done();
            })
        })

        it("should update the obstacle", done => {
            obstacleTest.patchObstacle(id, updatedObstacle, done);
        })

        after(done => {
            newObstacle.remove()
            .then(obstacle => {
                done();
            })
        })

    })

    describe("DELETE /obstacles/:id", () => {

        let obstacleData = {
            title: "test_title",
            description: "test_description",
            state: "NEW",
            factor: "HIGH"
        }
        let newObstacle = new Obstacle(obstacleData);
        let id = null;

        before(done => {
            newObstacle.save()
            .then(obstacle => {
                id = obstacle._id;
                done();
            })
        });

        it ("should delete the obstacle", done => {
            obstacleTest.deleteObstacle(id, done);
        })

    })


})