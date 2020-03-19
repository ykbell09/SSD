// graphql api to display spirits by distiller using option selected by client
document.querySelector('#searchSelect').addEventListener('change', () => {
    // GETS THE DISTILLER ID SELCTED BY CLIENT - selected_id
    const selected_id = document.querySelector('#searchSelect').selectedOptions[0].value;

    // GRAPH QL QUERY TO GET LIST OF SPIRITS
    const query =
        `query Spirits($distillerId: ID) {
        spiritsByDistiller(distiller_id: $distillerId) {
            spirit_name
        }
    }`;

    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query, variables: { distillerId: selected_id }
        })
    })
        .then(response => response.json())
        .then(data => {
            // CLEARS LIST FROM ANY PREVIOUS SEARCH
            if (document.querySelector('.resultList') !== null ) {
                document.querySelector('.resultList').remove()
            };       
            
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
        })
});

// SIGN UP button 
document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const addEmail = document.querySelector('#addEmail').value;
    const addPassword = document.querySelector('#addPassword').value;
    // const memberObject = { email_address: addEmail, password: addPassword };
    
    const mutationQuery = `mutation newMemberSignUp($email_address: String!, $password: String!) {
        signUp(member: {
            email_address: $email_address,
            password: $password,
        }) {
            id
            }
        }`;
    
    fetch('api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: mutationQuery, variables: { email_address: addEmail, password: addPassword }
        })
    })
        .then(response => response.json())
        .then(data => {
            alert('You are now a member! Your new member ID is ' + data.data.signUp.id);
            })
    });

// LOG IN button -- currently logs values
    document.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const loginEmail = document.querySelector('#loginEmail').value;
        const password = document.querySelector('#password').value;
        const mutationQuery = `mutation memberLogin($email_address: String!, $password: String!) {
            login(member: {
                email_address: $email_address,
                password: $password,
            }) {
                id
            }
        }`;

        fetch('api/graphql', {
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
                const memberId = data.data.login.id;

                const loggedOutDiv = document.querySelector('.loggedOutDefault');
                loggedOutDiv.className = 'hide';
                const joinDiv = document.querySelector('.subscribe');
                joinDiv.className = 'hide';
                const loggedInDiv = document.querySelector('.loggedInDefault');
                loggedInDiv.className = 'show';
                const logInMessageH3 = document.createElement('h3');
                logInMessageH3.innerHTML = 'Welcome, member ' + memberId + ' !';
                loggedInDiv.appendChild(logInMessageH3);
            })
    });

// CHECKS THE SESSION -- not yet working
// document.addEventListener('load', () => {
//     const query = `query currentMember {
//         currentMember {
//             id
//         }
//     }`;

//     fetch('/api/graphql', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         body: JSON.stringify(query)
//     })
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     });
