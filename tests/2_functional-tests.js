const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
   test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
      chai.request(server)
         .post('/api/issues/test')
         .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Every field filled',
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Title');
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Every field filled');
            assert.equal(res.body.assigned_to, 'Chai and Mocha');
            assert.equal(res.body.status_text, 'In QA');
            done();
         });
   });
   test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
      chai.request(server)
         .post('/api/issues/test')
         .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Only required fields'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, 'Title');
            assert.equal(res.body.issue_text, 'text');
            assert.equal(res.body.created_by, 'Functional Test - Only required fields');
            done();
         });
   });

   test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
      chai.request(server)
         .post('/api/issues/test')
         .send({
            issue_title: 'Title',
            created_by: 'Functional Test - Missing required fields'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'required field(s) missing');
            done();
         });
   });

   test('View issues on a project: GET request to /api/issues/{project}', function(done) {
      chai.request(server)
         .get('/api/issues/test')
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
         });
   });

   test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
      chai.request(server)
         .get('/api/issues/test?issue_title=Title')
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body[0].issue_title, 'Title');
            done();
         });
   });


   test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
      chai.request(server)
         .get('/api/issues/test?issue_title=Title&issue_text=text')
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body[0].issue_title, 'Title');
            assert.equal(res.body[0].issue_text, 'text');
            done();
         });
   });

   test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
      chai.request(server)
         .put('/api/issues/test')
         .send({
            _id: '5f4c3f0e0c6c7f1e3c7a0b7f',
            issue_title: 'Updated Title'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully updated');
            done();
         });
   });

   test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
      chai.request(server)
         .put('/api/issues/test')
         .send({
            _id: '5f4c3f0e0c6c7f1e3c7a0b7f',
            issue_title: 'Updated Title',
            issue_text: 'Updated Text'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully updated');
            done();
         });
   });

   test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
      chai.request(server)
         .put('/api/issues/test')
         .send({
            issue_title: 'Updated Title'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'missing _id');
            done();
         });
   });

   test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
      chai.request(server)
         .put('/api/issues/test')
         .send({
            _id: '5f4c3f0e0c6c7f1e3c7a0b7f'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'no update field(s) sent');
            done();
         });
   });

   test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
      chai.request(server)
         .put('/api/issues/test')
         .send({
            _id: '5f4c3f0e0c6c7f1e3c7a0b7f',
            issue_title: 'Updated Title'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'could not update');
            done();
         });
   });

   test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
      chai.request(server)
         .delete('/api/issues/test')
         .send({
            _id: '5f4c3f0e0c6c7f1e3c7a0b7f'
         })
         .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.result, 'successfully deleted');
            done();
         });
   });

});
