import { expect } from 'chai';
import { createMember, updateUsername } from '../../services/functions.js';
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
        
        // UPDATE MEMBER INFO TEST WIP
        describe('updateMemberInfo', () => {
            it('updates member username and returns a member object', async () => {
                
                // CREATE A TEST USER TO UPDATE
                const testUsername = 'testUsername2';
                const testEmail = 'testEmail2';
                const testPass = 'testPass2';
                await createMember(testEmail, testPass, testUsername);

                // GET NEW USER ID
                const getUser = await knex('members')
                    .where({username: testUsername})
                    .select('id')
                    .returning('id');

                // UPDATE TEST USER
                const newUsername = 'testNewUsername';
                await updateUsername(newUsername, getUser[0].id);

                // RETURN UPDATED USERNAME ID AND CONFIRM IT MATCHES ORIGINAL
                const updatedUser = await knex('members')
                    .where({ username: newUsername })
                    .select('id')
                    .returning('id');
                expect(getUser[0].id).to.equal(updatedUser[0].id);



            });
        });
    });
 });