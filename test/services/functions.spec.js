import { expect } from 'chai';
import { createMember } from '../../services/functions.js';
import knex from '../../database.js';

describe('member functions', () => {
    describe('createMember', () => {
        it('adds a new member and returns an id', async () => {
           
            const testUsername = 'testName';
            const testEmail = 'testEmail';
            const testPass = 'testPass';
            await createMember(testEmail, testPass, testUsername);
            
            const getUser = await knex('members')
                .where({ username: testUsername })
                .select('id')
                .returning('id');
            expect(getUser[0].id).to.be.finite;
         
        });
        afterEach(async () => {
            await knex('members').truncate();
        });
    });
 });