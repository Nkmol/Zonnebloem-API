let Spec = require('../../spec');

let Report = require('../models/report.model');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

class ReportTest extends Spec {

    constructor(model) {
        super(model);
    }

     fetchReports(done) {
        this.request(this.app)
            .get("/reports")
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body).to.have.property("data");
            })
            .end(done);
    }

     fetchSingleReport(id, expectedReport, done) {
        this.request(this.app)
            .get(`/reports/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.title).to.equal(expectedReport.title); 
                expect(res.body.data.description).to.equal(expectedReport.description);
            })
            .end(done);
    }

    updateReport(id, expectedReport, done) {
        this.request(this.app)
            .put(`/reports/${id}`)
            .expect(200)
            .set('Authorization', `JWT ${this.token}`)
            .send(expectedReport)
            .expect(res => {
                expect(res.body).to.be.a("Object");
                expect(res.body.data).to.be.a("Object");
                expect(res.body.data.title).to.equal(expectedReport.title);
                expect(res.body.data.description).to.equal(expectedReport.description);
            })
            .end(done);
    }

    patchReport(id, expectedReport, done) {
    this.request(this.app)
        .patch(`/reports/${id}`)
        .expect(200)
        .set('Authorization', `JWT ${this.token}`)
        .send(expectedReport)
        .expect(res => {
            expect(res.body).to.be.a("Object");
            expect(res.body.data).to.be.a("Object");
            expect(res.body.data.title).to.equal(expectedReport.title);
        })
        .end(done);
    }

    deleteReport(id, done) {
        this.request(this.app)
            .delete(`/reports/${id}`)
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

let reportTest = new ReportTest(Report);

context("Reports", () => {

    before(done => {
        reportTest.authorize()
        .then(done)
        .catch(done);
    })

     describe("GET /reports", () => {
        it("should fetch all reports", done => {
            reportTest.fetchReports(done);                
        })
    })

    describe("GET /reports/:id", () => {

        let newReport = new Report({title: "test_report", description: "test_description"});
        let id = null;

        before(done => {
            newReport.save()
            .then(report => {
                id = report._id;
                done();
            })
        })

        it("should fetch a single report", done => {
            reportTest.fetchSingleReport(id, newReport, done);
        })

        after(done => {
            newReport.remove()
            .then(report => {
                done();
            })
        })

    })

    describe("PUT /reports/:id", () => {

        let newReport = new Report({title: "test_report", description: "test_description"});
        let updatedReport = {title: "test_report_updated", description: "test_description_updated"};
        let id = null;

        before(done => {
            newReport.save()
            .then(report => {
                id = report._id;
                done();
            })
        })

        it("should update the route", done => {
            reportTest.updateReport(id, updatedReport, done);
        })

        after(done => {
            newReport.remove()
            .then(report => {
                done();
            })
        })

    })

    describe("PATCH /reports/:id", () => {

        let newReport = new Report({title: "test_report", description: "test_description"});
        let updatedReport = {title: "test_report_updated"};
        let id = null;

        before(done => {
            newReport.save()
            .then(report => {
                id = report._id;
                done();
            })
        })

        it("should update the report", done => {
            reportTest.patchReport(id, updatedReport, done);
        })

        after(done => {
            newReport.remove()
            .then(report => {
                done();
            })
        })

    })

    describe("DELETE /reports/:id", () => {

        let newReport = new Report({title: "test_report", description: "test_description"});
        let id = null;

        before(done => {
            newReport.save()
            .then(route => {
                id = route._id;
                done();
            })
        });

        it ("should delete the report", done => {
            reportTest.deleteReport(id, done);
        })

    })


})