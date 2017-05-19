let Spec = require('../../spec');

let Route = require('../models/route.model');

let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

class RouteTest extends Spec {

    constructor(model) {
        super(model);
    }

     fetchRoutes(done) {
        this.request(this.app)
            .get("/routes")
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("data");
            })
            .end(done);
    }

     fetchSingleRoute(id, expectedRoute, done) {
        this.request(this.app)
            .get(`/routes/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.name).to.equal(expectedRoute.name); 
            })
            .end(done);
    }

    updateRoute(id, expectedRoute, done) {
        this.request(this.app)
            .put(`/routes/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedRoute)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.name).to.equal(expectedRoute.name);
            })
            .end(done);
    }

    patchRoute(id, expectedRoute, done) {
    this.request(this.app)
        .patch(`/routes/${id}`)
        .expect(200)
        .set('Authorization', `JWT ${this.token}`)
        .send(expectedRoute)
        .expect(res => {
            expect(res.body).to.be.a("Object");
            expect(res.body.data).to.be.a("Object");
            expect(res.body.data.name).to.equal(expectedRoute.name);
        })
        .end(done);
    }

    deleteRoute(id, done) {
        this.request(this.app)
            .delete(`/routes/${id}`)
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

let routeTest = new RouteTest(Route);

context("Routes", () => {

    before(done => {
        routeTest.authorize()
            .then(done)
            .catch(done);
    })

    describe("GET /routes", () => {
        it("should fetch all routes", done => {
            routeTest.fetchRoutes(done);                
        })
    })

    describe("GET /routes/:id", () => {

        let routeData = {
            name: "test_route",
            waypoints: {
                type: "LineString",
                coordinates: [
                    [ -110.8571443, 32.4586858 ],
                    [ -109.8571443, 33.4586858 ]
                ]
            }
        }
        let newRoute = new Route(routeData);
        let id = null;

        before(done => {
            newRoute.save()
                .then(route => {
                    id = route._id;
                    done();
                })
        })

        it("should fetch a single route", done => {
            routeTest.fetchSingleRoute(id, newRoute, done);
        })

        after(done => {
            newRoute.remove()
            .then(route => {
                done();
            })
        })

    })

    describe("PUT /routes/:id", () => {

        let routeData = {
            name: "test_route",
            waypoints: {
                type: "LineString",
                coordinates: [
                    [ -110.8571443, 32.4586858 ],
                    [ -109.8571443, 33.4586858 ]
                ]
            }
        }
        let newRoute = new Route(routeData);
        let updatedRoute = {
            name: "test_route_updated", 
            waypoints: {
                type: "LineString",
                coordinates: [
                    [ -110.8571443, 32.4586858 ],
                    [ -109.8571443, 33.4586858 ],
                    [ -107.8571443, 35.4586858 ],
                ]
            }
        };
        let id = null;
        
        

        before(done => {
            newRoute.save()
            .then(route => {
                id = route._id;
                done();
            })
        })

        it("should update the route", done => {
            routeTest.updateRoute(id, updatedRoute, done);
        })

        after(done => {
            newRoute.remove()
            .then(route => {
                done();
            })
        })

    })

    describe("PATCH /routes/:id", () => {

         let routeData = {
            name: "test_route",
            waypoints: {
                type: "LineString",
                coordinates: [
                    [ -110.8571443, 32.4586858 ],
                    [ -109.8571443, 33.4586858 ]
                ]
            }
        }
        let newRoute = new Route(routeData);
        let updatedRoute = {
            name: "test_route_updated", 
        };
        let id = null;

        before(done => {
            newRoute.save()
            .then(route => {
                id = route._id;
                done();
            })
        })

        it("should update the route", done => {
            routeTest.patchRoute(id, updatedRoute, done);
        })

        after(done => {
            newRoute.remove()
            .then(route => {
                done();
            })
        })

    })

    describe("DELETE /routes/:id", () => {

         let routeData = {
            name: "test_route",
            waypoints: {
                type: "LineString",
                coordinates: [
                    [ -110.8571443, 32.4586858 ],
                    [ -109.8571443, 33.4586858 ]
                ]
            }
        }
        let newRoute = new Route(routeData);
        let id = null;

        before(done => {
            newRoute.save()
            .then(route => {
                id = route._id;
                done();
            })
        });

        it ("should delete the route", done => {
            routeTest.deleteRoute(id, done);
        })

    })


})