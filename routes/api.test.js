const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming this is your Express app file
const { expect } = chai;

chai.use(chaiHttp);

describe('POST /api/issues/{projectname}', () => {
  it('should create a new issue and return the created object', (done) => {
    const issue = {
      issue_title: 'Test Issue',
      issue_text: 'This is a test issue',
      created_by: 'Test User',
      assigned_to: 'Test Assignee',
      status_text: 'In Progress'
    };

    chai.request(app)
      .post('/api/issues/{projectname}')
      .send(issue)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('issue_title').to.equal(issue.issue_title);
        expect(res.body).to.have.property('issue_text').to.equal(issue.issue_text);
        expect(res.body).to.have.property('created_by').to.equal(issue.created_by);
        expect(res.body).to.have.property('assigned_to').to.equal(issue.assigned_to);
        expect(res.body).to.have.property('status_text').to.equal(issue.status_text);
        expect(res.body).to.have.property('created_on');
        expect(res.body).to.have.property('updated_on');
        expect(res.body).to.have.property('open').to.be.true;
        done();
      });
  });
});