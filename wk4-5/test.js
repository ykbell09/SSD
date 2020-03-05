import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app, { addUser } from './app.js';

chai.use(chaiHttp);
// test logic add user 
describe('add user to database api function', () => {
    it('happy path', () => {
        chai
            .request(app)
            .post('/api/addUser')
            .send({ 'user'})
            .end((err, res) => {
            expect
        })
        
        
        expect(result).to.have.members(expectedResult);
    });

    // it('unexpected use case', () => {
    //     const location = undefined;
    //     const result = checkLocation(location);
    //     const expectedResult = [];
    //     expect(result).to.eql(expectedResult);
    // });
});


