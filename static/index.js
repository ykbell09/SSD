// POPLUATES DISTILLER SELECT ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {

    const query = `query allDistillers {
        allDistillers {
        distiller_name
        id
        }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
    })
        .then(response => response.json())
        .then(data => {

            // GETS ARRAY OF ALL DISTILLER NAMES FROM DATABASE
            data = data.data.allDistillers.map(distiller => `${distiller.distiller_name}`);

            // CREATES AN HTML ELEMENT TO INSERT QUERY RESULTS AS SELECT OPTIONS
            const distillerSelect = document.querySelector('#distillerSelect');

            const makeDistillerSelectOptions = (item) => {
                const distillerOption = document.createElement('option');
                distillerOption.value = item;
                distillerOption.innerText = item;
                distillerSelect.appendChild(distillerOption);
            };
            data.forEach(makeDistillerSelectOptions);

        });
});

// EVENT LISTENER FOR SEARCH BY DISTILLER SELECT OPTIONS
document.querySelector('#distillerSelect').addEventListener('change', () => {

    // GETS THE DISTILLER NAME SELCTED BY CLIENT
    const selectedDistiller = document.querySelector('#distillerSelect').selectedOptions[0].value;

    // QUERY TO GET LIST OF SPIRITS BY DISTILLER
    const query =
        `query Spirits($distiller_name: String!) {
        spiritsByDistiller(distiller_name: $distiller_name) {
            spirit_name
        }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query, variables: { distiller_name: selectedDistiller }
        })
    })
        .then(response => response.json())
        .then(data => {

            // CLEARS LIST FROM ANY PREVIOUS SEARCH
            if (document.querySelector('.resultList') !== null) {
                document.querySelector('.resultList').remove()
            }

            // RESETS TYPE FORM IF IT HAS OPTIONS SELECTED
            document.querySelector('#typeForm').reset();

            if (data.data.spiritsByDistiller !== null) {
                
                data = data.data.spiritsByDistiller.map(spirit => `${spirit.spirit_name}`)

                // CREATES AN HTML ELEMENT TO INSERT A LIST & INSERTS QUERY RESULTS AS LIST ITEMS
                const resultsP = document.querySelector('.results-list');
                const list = document.createElement('ul');
                list.className = 'resultList';

                const makeListItems = (item) => {

                    const listItem = document.createElement('li');
                    listItem.className = 'listItem';
                    listItem.innerText = item;
                    resultsP.appendChild(list);
                    list.appendChild(listItem);
                };
                data.forEach(makeListItems);
            }
        });
});

// EVENT LISTENER FOR SEARCH BY TYPE SELECT OPTIONS
document.querySelector('#typeSelect').addEventListener('change', () => {

    // GETS TYPE SELECTED BY CLIENT
    const selected_type = document.querySelector('#typeSelect').selectedOptions[0].value;


    // QUERY TO GET LIST OF SPIRITS BY TYPE 
    const query =
        `query Spirits($spirit_type: String!) {
            spiritsByType(spirit_type: $spirit_type) {
                spirit_name
            }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query, variables: { spirit_type: selected_type }
        })
    })
        .then(response => response.json())
        .then(data => {

            // CLEARS LIST FROM ANY PREVIOUS SEARCH
            if (document.querySelector('.resultList') !== null) {
                document.querySelector('.resultList').remove()
            }

            // RESETS DISTILLER FORM IF IT HAS OPTIONS SELECTED
            document.querySelector('#distillerForm').reset();

            if (data.data.spiritsByType !== null) {

                data = data.data.spiritsByType.map(spirit => `${spirit.spirit_name}`);

                // CREATES AN HTML ELEMENT TO INSERT A LIST & INSERTS QUERY RESULTS AS LIST ITEMS
                const resultsP = document.querySelector('.results-list');
                const list = document.createElement('ul');
                list.className = 'resultList';

                const makeListItems = (item) => {

                    const listItem = document.createElement('li');
                    listItem.className = 'listItem';
                    listItem.innerText = item;
                    resultsP.appendChild(list);
                    list.appendChild(listItem);
                };
                data.forEach(makeListItems);

            }
        });

});

// XX LEAVE A REVIEW IF LOGGED IN
document.querySelector('#reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // GET VALUES OF REVIEW FORM FIELDS 
    const spiritName = document.querySelector('#reviewSelect').selectedOptions[0].value;
    const review = document.querySelector('#reviewText').value;

    const mutationQuery = `mutation createReview($spirit_name: String!, $review: String!) {
        createReview(reviewInput: {
            spirit_name: $spirit_name,
            review: $review
        }) {
            id
            review
        }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: mutationQuery, variables: { spirit_name: spiritName, review: review }
        })
    })
        .then(response => response.json())
        .then(data => {

            if (data.data.createReview === null) {
                alert('please log in to leave a review');
            } else {

                const reviewId = data.data.createReview.id;
                alert('Thank you for your review. It\'s review #' + reviewId)

                // CLEARS FORM
                document.querySelector('#reviewForm').reset();
            }

        });
});

// SIGN UP BUTTON ADDS MEMBER TO MEMBERS TABLE, LOG IN AND SHOW WELCOME 
document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const addEmail = document.querySelector('#addEmail').value;
    const addPassword = document.querySelector('#addPassword').value;
    const addUsername = document.querySelector('#addUsername').value;

    // DB CREATE QUERY 
    const mutationQuery = `mutation newMemberSignUp($email_address: String!, $password: String!, $username: String!) {
        signUp(member: {
            email_address: $email_address,
            password: $password,
            username: $username
        }) {
            username
            email_address
            id
            }
        }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: mutationQuery, variables: { email_address: addEmail, password: addPassword, username: addUsername }
        })
    })
        .then(response => response.json())
        .then(data => {

            // ALERTS SUCCESS OR FAILURE
            if (data.data.signUp == null) {
                alert('Something when wrong! It is possible your sign up failed because you already have an account, or you did not complete all fields.');

                // CLEARS FORM
                document.querySelector('#addForm').reset();

            } else {
                alert('You are now a member, ' + data.data.signUp.username + '! Your new member ID is ' + data.data.signUp.id);

                // GET MEMBER DATA
                const username = data.data.signUp.username;
                const userEmail = data.data.signUp.email_address;

                // CLEARS FORM
                document.querySelector('#addForm').reset();

                // HIDES LOGIN AND SIGNUP FORMS, SHOW PROFILE
                const forms = document.querySelectorAll('.member');
                forms.forEach(element => {
                    element.className = 'hide member item';
                });
                document.querySelector('.profile').className = 'show profile item';

                // SHOWS MEMBER DATA ON PROFILE
                document.querySelector('#profileUsername').innerHTML = username;
                document.querySelector('#profileEmail').innerHTML = userEmail;


                // CLEAR ANY EXISTING WELCOME MESSAGE
                // if (document.querySelector('.welcome-text') !== null) {
                //     document.querySelector('.welcome-text').remove()
                // }       
                // CREATES NEW MESSAGE IF SIGN UP IS SUCCESSFUL
                // const welcomeMessageDiv = document.querySelector('.welcome-message');
                // const welcomeMessageEl = document.createElement('h3');
                // welcomeMessageEl.className = 'welcome-text';
                // welcomeMessageEl.innerHTML = 'welcome, ' + username;
                // welcomeMessageDiv.appendChild(welcomeMessageEl);

            }

        });
});

// LOG IN BUTTON - CHECKS MEMBERS TABLE AND DISPLAYS WELCOME MESSAGE AND USER PROFILE
document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // GETS CLIENT ENTERED DATA AND QUERIES MEMBERS TABLE
    const loginEmail = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#password').value;
    const mutationQuery = `mutation memberLogin($email_address: String!, $password: String!) {
            login(member: {
                email_address: $email_address,
                password: $password
            }) {
                username
                email_address
            }
        }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: mutationQuery, variables: { email_address: loginEmail, password: password }
        })
    })
        .then(response => response.json())
        .then(data => {

            // if... else statment -- ALERT IF LOG IN FAILED
            if (data.data.login == null) {
                alert('Login Failed');

                // CLEARS FORM
                document.querySelector('#loginForm').reset();

            } else {

                // GETS USER DATA
                const username = data.data.login.username;
                const userEmail = data.data.login.email_address;

                // CLEARS FORM
                document.querySelector('#loginForm').reset();

                // CLEAR EXISTING MESSAGE
                // if (document.querySelector('.welcome-text') !== null) {
                //     document.querySelector('.welcome-text').remove()
                // }

                // CREATES NEW MESSAGE
                // const welcomeMessageDiv = document.querySelector('.welcome-message');
                // const welcomeMessageEl = document.createElement('h3');
                // welcomeMessageEl.className = 'welcome-text';
                // welcomeMessageEl.innerHTML = 'welcome, ' + username;
                // welcomeMessageDiv.appendChild(welcomeMessageEl);
                // document.querySelector('#loginForm').reset();

                // HIDES LOGIN AND SIGNUP FORMS, SHOW PROFILE
                const forms = document.querySelectorAll('.member');
                forms.forEach(element => {
                    element.className = 'hide member item';
                });
                document.querySelector('.profile').className = 'show profile item';

                // SHOWS MEMBER DATA ON PROFILE
                document.querySelector('#profileUsername').innerHTML = username;
                document.querySelector('#profileEmail').innerHTML = userEmail;

            }
        })
});

// SIGN OUT BUTTON LOGS OUT CURRENT USER AND UPDATES UI
document.querySelector('#logoutForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // HIDES PROFILE, SHOWS LOGIN AND SIGNUP FORMS
    const forms = document.querySelectorAll('.member');
    forms.forEach(element => {
        element.className = 'show member item';
    });
    document.querySelector('.profile').className = 'hide profile item';
    if (document.querySelector('.welcome-text') !== null) {
        document.querySelector('.welcome-text').remove()
    }

    // DESTROY CURRENT SESSION
    fetch('/logout')

});

// UPDATE FORM -- UPDATES USERNAME IN MEMBERS TABLE
document.querySelector('#updateForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // GET UPDATED MEMBER DATA FROM FORM
    const updatedUsername = document.querySelector('#updateUsername').value;
    const updatedEmail = document.querySelector('#updateEmail').value;


    // ALERT IF BUTTON PRESSED WITH NO VALUES ENTERED
    if (updatedUsername == '' && updatedEmail == '') {
        alert('please enter at least one value');
    }
    else {

        // IF USERNAME ONLY IS ENTERED UPDATE MEMBER TABLE
        if (updatedUsername !== '') {
            const mutationQueryUsername = `mutation updateUsername($username: String!) {
            updateUsername(usernameInput: {username: $username}) {
                username
            }
        }`;

            fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    query: mutationQueryUsername, variables: { username: updatedUsername }
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (updatedEmail === '') {

                        // ALERT SUCCESSFUL CHANGE
                        const newUsername = data.data.updateUsername.username;
                        alert('Your username has been updated to ' + newUsername);

                        // UPDATE PROFILE UI
                        document.querySelector('#profileUsername').innerHTML = newUsername;

                        // CLEARS FORM
                        document.querySelector('#updateForm').reset();

                    }
                });
        } // END OF USERNAME IF
    } // END OF IF ... ELSE   
}); // END OF USERNAME UPDATE 

// UPDATE FORM -- UPDATES EMAIL ADDRESS ONLY, OR EMAIL ADDRESS AND USERNAME IN MEMBER TABLE
document.querySelector('#updateForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // GET UPDATED MEMBER DATA FROM FORM
    const updatedUsername = document.querySelector('#updateUsername').value;
    const updatedEmail = document.querySelector('#updateEmail').value;

    // IF EMAIL ADDRESS IS ENTERED UPDATE MEMBER TABLE
    if (updatedEmail !== '') {
        const mutationQueryEmail = `mutation updateEmail($email_address: String!) {
                updateEmail(emailInput: {email_address: $email_address}) {
                    email_address
                    username
                }
            }`;

        fetch('/api/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: mutationQueryEmail, variables: { email_address: updatedEmail }
            })
        })
            .then(response => response.json())
            .then(data => {

                if (updatedUsername !== '') {
                    const newUsername = data.data.updateEmail.username;
                    const newEmail = data.data.updateEmail.email_address;

                    // ALERT NEW INFO
                    alert('your username has been updated to ' + newUsername + ' and your email address has been updated to ' + newEmail);

                    // UPDATE UI
                    document.querySelector('#profileEmail').innerHTML = newEmail;
                    document.querySelector('#profileUsername').innerHTML = newUsername;

                    // CLEARS FORM
                    document.querySelector('#updateForm').reset();


                } else {
                    const newEmail = data.data.updateEmail.email_address;

                    // ALERT NEW INFO
                    alert('your email address has been updated to ' + newEmail);

                    // UPDATE UI
                    document.querySelector('#profileEmail').innerHTML = newEmail;

                    // CLEARS FORM
                    document.querySelector('#updateForm').reset();

                }
            });
    }
});

// CHECKS THE SESSION TO KEEP THE USER SIGNED IN ON REFRESH AND UPDATES UI FOR LOGGED IN MEMBER
// XX - REFRESH DOES NOT SHOW UPDATED USER NAME IF THEY CHANGE IT WHILE LOGGED IN AND DON'T LOG OUT -- NEED TO UPDATE SESSION
document.addEventListener('DOMContentLoaded', () => {

    const query = `query getLoggedInMember {
        currentMember {
            username
            email_address
        }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'applicaton/json'
        },
        body: JSON.stringify({ query })
    })
        .then(response => response.json())
        .then(data => {

            // IF MEMBER IS STILL SIGNED IN
            if (data.data.currentMember !== null) {

                // GETS MEMBER DATA
                const username = data.data.currentMember.username;
                const userEmail = data.data.currentMember.email_address

                // CLEARS EXISTING MESSAGE AND CREATES NEW MESSAGE
                // if (document.querySelector('.welcome-text') !== null) {
                //     document.querySelector('.welcome-text').remove()
                // }
                // const welcomeMessageDiv = document.querySelector('.welcome-message');
                // const welcomeMessageEl = document.createElement('h3');
                // welcomeMessageEl.className = 'welcome-text';
                // welcomeMessageEl.innerHTML = 'welcome back, ' + username;
                // welcomeMessageDiv.appendChild(welcomeMessageEl);

                // HIDES LOGIN AND SIGNUP FORMS, SHOW PROFILE
                const forms = document.querySelectorAll('.member');
                forms.forEach(element => {
                    element.className = 'hide member item';
                });
                document.querySelector('.profile').className = 'show profile item';

                // SHOWS MEMBER DATA ON PROFILE
                document.querySelector('#profileUsername').innerHTML = username;
                document.querySelector('#profileEmail').innerHTML = userEmail;

            }

        })

});