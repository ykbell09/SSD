import { expect } from 'chai';
import getGinsByState, { addUserToList, removeUserFromList, updateWebsite } from '../../services/gins.js';
import knex from '../../database';


describe('gins services', () => {
    describe('getGinsByState', () => {
        // happy path SELECT test
        it('returns gins by state CA', async () => {
            const result = await getGinsByState('CA');
            expect(result).to.deep.equal([
                { "gin_name": "Gray Whale", "rating": 5 },
                { "gin_name": "Amass Dry Gin", "rating": 4 },
                { "gin_name": "Astral Pacific Gin", "rating": 2 }
            ]);
        });
        // unexpected use case SELECT test
        it('unexpected use case for invalid state', async () => {
            const result = await getGinsByState('LA');
            expect(result).to.be.empty;
        });
    });
    describe('addUserToList', () => {
        // happy path NON-SELECT test - test by finding email based on id returned
        it('adds user to list and returns id', async () => {
            const userObject = { first_name: 'Bill', email_address: 'sample@email.com' };
            const userId = await addUserToList(userObject);
            const result =
                await knex('users')
                    .where({ id: userId[0] })
                    .select('email_address')
                    .returning('email_address');
            expect(result[0].email_address).to.equal(userObject.email_address);
        });
        afterEach(async () => {
            await knex('users').where({ email_address: 'sample@email.com' }).del();
        });
        // unhappy path NON-SELECT test - if user is already in database
        it('unexpected use case for adding new user', async () => {
            let errorThrown = false;
            const userObject = { first_name: 'Frank', email_address: 'Frank@furter.com' };
            try {
                await addUserToList(userObject);
            } catch (err) {
                errorThrown = true;
            }
            expect(errorThrown).to.be.true;
        });
    });
});