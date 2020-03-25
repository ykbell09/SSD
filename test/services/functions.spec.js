import { expect } from 'chai';
import { createMember, updateUsernameById, updateEmailAddressById, getSpiritsByType, getSpiritsByDistiller } from '../../services/functions.js';
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

        // UPDATE MEMBER USERNAME TEST 
        describe('updateMemberUsername', () => {
            it('updates member username and returns a member object', async () => {

                // CREATE A TEST MEMBER TO UPDATE
                const testUsername = 'testUsername';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                const getUser = await createMember(testEmail, testPass, testUsername);
         
                // UPDATE TEST MEMBER
                const newUsername = 'testNewUsername';
                await updateUsernameById(newUsername, getUser.id);

                // RETURN UPDATED USERNAME ID AND CONFIRM IT MATCHES ORIGINAL
                const updatedUser = await knex('members')
                    .where({ username: newUsername })
                    .select('id')
                    .returning('id');
                expect(getUser.id).to.equal(updatedUser[0].id);
            });
        });

        // UPDATE MEMBER EMAIL ADDRESS TEST
        describe('updateMemberEmail', () => {
            it('updates member email address and returns a member object', async () => {

                // CREATE A TEST MEMBER TO UPDATE & get ID
                const testUsername = 'testUsername';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                await createMember(testEmail, testPass, testUsername);

                // GET NEW MEMBER ID
                const getUser = await knex('members')
                    .where({ username: testUsername })
                    .select('id')
                    .returning('id');

                
                // UPDATE TEST MEMBER
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

        // GET MEMBER BY PROVIDED EMAIL ADDRESS
        describe('getMemberByEmail', () => {
            it('returns a member object when given an email', async () => {

                // CREATE A TEST MEMBER TO SEARCH
                const testUsername = 'testUsername';
                const testEmail = 'testEmail';
                const testPass = 'testPass';
                const member = await createMember(testEmail, testPass, testUsername);

                expect(member.email_address).to.equal('testEmail');

            });
        });
        // DELETES CREATED DATA
        afterEach(async () => {
            await knex('members').truncate();
        });

    });

});

describe('spirit functions', () => {
    describe('get array of spirits by spirit type', () => {
        it('gets a spirit type and returns an array of spirits', async () => {

            const spirit_type = 'gin';
            const spiritArray = await getSpiritsByType(spirit_type);
            expect(spiritArray).to.have.lengthOf(3);

        });
    });
    describe('get spirits by distiller', () => {
        it('gets an a distiller id and returns an array of spirts', async () => {

            const distillerId = 1001;
            const spiritArray = await getSpiritsByDistiller(distillerId);
            expect(spiritArray).to.have.lengthOf(2);

        });
    });
});
