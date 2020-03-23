import { expect } from 'chai';
import { createMember, updateMemberInfo } from '../../services/functions.js';
import knex from '../../database.js';

describe('member functions', () => {
    describe('createMember', () => {
        it('adds a new member and returns an id', async () => {
           
            // CREATE A TEST USER
            const testUsername = 'testName';
            const testEmail = 'testEmail';
            const testPass = 'testPass';
            await createMember(testEmail, testPass, testUsername);
            
            // RETURN TEST USER ID AND CONFRIM IT IS AN INTEGER / NOT NULL
            const getUser = await knex('members')
                .where({ username: testUsername })
                .select('id')
                .returning('id');
            expect(getUser[0].id).to.be.finite;
         
        });
        afterEach(async () => {
            await knex('members').truncate();
        });
        describe('updateMemberInfo', () => {
            it('updates member information and returns a member object', async () => {
                
                // CREATE A TEST USER TO UPDATE
                const testUsername = 'testName';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                await createMember(testEmail, testPass, testUsername);

                // GET NEW USER ID
                const getUser = await knex('members')
                    .where({ username: testUsername })
                    .select('id')
                    .returning('id');

                // UPDATE TEST USER
                const updateEmail = 'testUpdateEmail';
                const updatePassword = 'testUpdatePassword';
                await updateMemberInfo(updateEmail, updatePassword);
                
                // GET USER ID FOR UPDATED USER EMAIL
                const updatedUser = await knex('members')
                    .where({ email_address: updateEmail })
                    .select('id')
                    .returning('id');
                expect(getuser[0].id).to.equal(updatedUser[0].id);



            });
        });
    });
 });