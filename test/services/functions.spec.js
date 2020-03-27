import { expect } from 'chai';
import { createMember, updateUsernameById, updateEmailAddressById, getSpiritsByType, getSpiritsByDistiller, getSpiritById, createReviewBySpiritId, getAllDistillers, getDistillerIdByName } from '../../services/functions.js';
import knex from '../../database.js';

describe('member functions', () => {

    // DELETES CREATED MEMBER DATA DATA
    afterEach(async () => {
        await knex('members')
            .where({ username: 'testUsername' })
            .orWhere({ username: 'testNewUsername' })
            .del();
    });
   
   // CREATE A NEW MEMBER
    describe('createMember', () => {
        it('adds a new member and returns an id', async () => {

            // CREATE A TEST MEMBER
            const testUsername = 'testUsername';
            const testEmail = 'testEmail';
            const testPass = 'testPass';
            await createMember(testEmail, testPass, testUsername);

            // RETURN TEST MEMBER ID AND CONFRIM IT IS AN INTEGER / NOT NULL
            const getUser = await knex('members')
                .where({ username: testUsername })
                .select('id')
                .returning('id');
            expect(getUser[0].id).to.be.finite;

        });

        // UPDATE MEMBER USERNAME TEST 
        describe('updateUsernameById', () => {
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

    });

});

describe('spirit functions', () => {

    // DELETES CREATED DATA
    after(async () => {
        await knex('members')
            .where({ username: 'testUsername' })
            .orWhere({ username: 'testNewUsername' })
            .del();
        await knex('reviews').truncate();
    });

    describe('getAllDistillers', () => {
        it('gets an array of all distillers', async () => {

            const allDistillers = await getAllDistillers();
            expect(allDistillers).to.have.lengthOf(3);
        })
    })

    describe('getSpiritsByType', () => {
        it('gets a spirit type and returns an array of spirits', async () => {

            const spirit_type = 'gin';
            const spiritArray = await getSpiritsByType(spirit_type);
            expect(spiritArray).to.have.lengthOf(3);

        });
    });
    describe('getSpiritsByDistiller', () => {
        it('gets a distiller name and returns an array of spirts', async () => {

            const distillerName = 'Amass';
            const distiller = await getDistillerIdByName(distillerName); 
            const spiritArray = await getSpiritsByDistiller(distiller.id);
            expect(spiritArray).to.have.lengthOf(2);

        });
    });

    describe('createReview', () => {

        it('takes review input from client and returns a review object', async () => {

            // CREATE A TEST MEMBER -- GET MEMBER ID
            const testUsername = 'testUsername';
            const testEmail = 'testEmail';
            const testPass = 'testPass';
            const member = await createMember(testEmail, testPass, testUsername);

            // GET SPIRIT ID
            const spirit_name = 'Grey Whale Gin';
            const spirit = await getSpiritById(spirit_name);

            // SPIRIT REVIEW
            const review = 'this is the most delicious gin ever';
            
            // INSERT REVIEW INTO TABLE
            const newReview = await createReviewBySpiritId(spirit, review, member.id);
            expect(newReview).to.be.an('object');

        });
    });
});
