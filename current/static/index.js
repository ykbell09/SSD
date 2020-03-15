// import response from 'express';
// KEEP GETTING ERROR (localhost/:1 Uncaught TypeError: Failed to resolve module specifier "express". Relative references must start with either "/", "./", or "../".)
// if I remove this statement, then I get "response is not defined" error (line 27)

// graphql api to display spirits by distiller using option selected by client
document.querySelector('#searchSelect').addEventListener('change', () => {
    // GETS THE DISTILLER ID SELCTED BY CLIENT - selected_id
    const selected_id = document.querySelector('#searchSelect').selectedOptions[0].value;
    console.log(selected_id);

    const query = `query Spirits($distillerId: ID) {
        spiritsByDistiller(distiller_id: $distillerId) {
            name
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
        .then(data => document.querySelector('.result-list').innerHTML = data.data.spiritsByDistiller.map(spirit => `${name}`))
});


// LOG IN button -- currently logs values
document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const loginEmail = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#password').value;
    console.log(loginEmail, password)
});


// SIGN IN button -- currently logs values
document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const addEmail = document.querySelector('#addEmail').value;
    const addPassword = document.querySelector('#addPassword').value;
    const userObject = { email_address: addEmail, password: addPassword };
    console.log(userObject);
});