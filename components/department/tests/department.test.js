let Spec = require('../../spec');

let Department = require('../models/department.model');

let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

class DepartmentTest extends Spec {

    constructor(model) {
        super(model);
    }

     fetchDepartments(done) {
        this.request(this.app)
            .get("/departments")
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("data");
            })
            .end(done);
    }

     fetchSingleDepartment(id, expectedDepartment, done) {
        this.request(this.app)
            .get(`/departments/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.name).to.equal(expectedDepartment.name); 
                expect(res.body.data.tel).to.equal(expectedDepartment.tel);
            })
            .end(done);
    }

    updateDepartment(id, expectedDepartment, done) {
        this.request(this.app)
            .put(`/departments/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedDepartment)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.name).to.equal(expectedDepartment.name);
                expect(res.body.data.tel).to.equal(expectedDepartment.tel);
            })
            .end(done);
    }

    patchDepartment(id, expectedDepartment, done) {
    this.request(this.app)
        .patch(`/departments/${id}`)
        .expect(200)
        .set('Authorization', `JWT ${this.token}`)
        .send(expectedDepartment)
        .expect(res => {
            expect(res.body).to.be.a("Object");
            expect(res.body.data).to.be.a("Object");
            expect(res.body.data.name).to.equal(expectedDepartment.name);
        })
        .end(done);
    }

    deleteDepartment(id, done) {
        this.request(this.app)
            .delete(`/departments/${id}`)
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

let departmentTest = new DepartmentTest(Department);

context("Departments", () => {

    before(done => {
        departmentTest.authorize()
        .then(done)
        .catch(done);
    })

     describe("GET /departments", () => {
        it("should fetch all departments", done => {
            departmentTest.fetchDepartments(done);                
        })
    })

    describe("GET /departments/:id", () => {

        let newDepartment = new Department({name: "test_department", tel: "0123456789"});
        let id = null;

        before(done => {
            // create a test user
            newDepartment.save()
            .then(department => {
                id = department._id;
                done();
            })
        })

        it("should fetch a single department", done => {
            departmentTest.fetchSingleDepartment(id, newDepartment, done);
        })

        after(done => {
            // remove the test user
            newDepartment.remove()
            .then(department => {
                done();
            })
        })

    })

    describe("PUT /departments/:id", () => {

        let newDepartment = new Department({name: "test_department", tel: "0123456789"});
        let updatedDepartment = {name: "test_department_updated", tel: "0123456781"};
        let id = null;

        before(done => {
             // create a test user
            newDepartment.save()
            .then(department => {
                id = department._id;
                done();
            })
        })

        it("should update the department", done => {
            departmentTest.updateDepartment(id, updatedDepartment, done);
        })

        after(done => {
            // remove the test user
            newDepartment.remove()
            .then(department => {
                done();
            })
        })

    })

    describe("PATCH /departments/:id", () => {

        let newDepartment = new Department({name: "test_department", tel: "0123456789"});
        let updatedDepartment = {name: "test_department_updated"};
        let id = null;

        before(done => {
             // create a test user
            newDepartment.save()
            .then(department => {
                id = department._id;
                done();
            })
        })

        it("should update the department", done => {
            departmentTest.patchDepartment(id, updatedDepartment, done);
        })

        after(done => {
            // remove the test user
            newDepartment.remove()
            .then(department => {
                done();
            })
        })

    })

    describe("DELETE /departments/:id", () => {

        let newDepartment = new Department({name: "test_department", tel: "0123456789"});
        let id = null;

        before(done => {
            newDepartment.save()
            .then(department => {
                id = department._id;
                done();
            })
        });

        it ("should delete the department", done => {
            departmentTest.deleteDepartment(id, done);
        })

    })


})