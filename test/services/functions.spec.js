import { expect } from 'chai';
import { createMember, updateUsernameById, updateEmailAddressById, getSpiritsByType } from '../../services/functions.js';
import knex from '../../database.js';

describe('member functions', () => {
    describe('createMember', () => {
        it('adds a new member and returns an id', async () => {
           
            // CREATE A TEST USER
            const testUsername = 'testUsername';
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
        
        // UPDATE MEMBER USERNAME TEST 
        describe('updateMemberUsername', () => {
            it('updates member username and returns a member object', async () => {
                
                // CREATE A TEST USER TO UPDATE
                const testUsername = 'testUsername';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                await createMember(testEmail, testPass, testUsername);

                // GET NEW USER ID
                const getUser = await knex('members')
                    .where({username: testUsername})
                    .select('id')
                    .returning('id');

                // UPDATE TEST USER
                const newUsername = 'testNewUsername';
                await updateUsernameById(newUsername, getUser[0].id);

                // RETURN UPDATED USERNAME ID AND CONFIRM IT MATCHES ORIGINAL
                const updatedUser = await knex('members')
                    .where({ username: newUsername })
                    .select('id')
                    .returning('id');
                expect(getUser[0].id).to.equal(updatedUser[0].id);
            });
        });

        // UPDATE MEMBER EMAIL ADDRESS TEST
        describe('updateMemberEmail', () => {
            it('updates member email address and returns a member object', async () => {

                // CREATE A TEST USER TO UPDATE
                const testUsername = 'testUsername';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                await createMember(testEmail, testPass, testUsername);

                // GET NEW USER ID
                const getUser = await knex('members')
                    .where({ username: testUsername })
                    .select('id')
                    .returning('id');

                // UPDATE TEST USER
                const newEmail = 'testNewEmail';
                await updateEmailAddressById(newEmail, getUser[0].id);

                // RETURN UPDATED EMAIL ADDRESS ID AND CONFIRM IT MATCHES ORIGINAL
                const updatedUser = await knex('members')
                    .where({ email_address: newEmail })
                    .select('id')
                    .returning('id');
                expect(getUser[0].id).to.equal(updatedUser[0].id);
            });
        });


    });
});
 
// WIP
describe('spirit functions', () => {
    describe('get array of spirits by type', () => {
        it('gets a type and returns the spirits that match', async () => {

            const type = 'gin';
            const typeId = await getSpiritsByType(type);
            expect(typeId).to.have.lengthOf(3);

        });
    });
});
