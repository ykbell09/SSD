// graphql api to display spirits by distiller using option selected by client
document.querySelector('#searchSelect').addEventListener('change', () => {
    // GETS THE DISTILLER ID SELCTED BY CLIENT - selected_id
    const selected_id = document.querySelector('#searchSelect').selectedOptions[0].value;

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
        .then(data => document.querySelector('.results-list').innerHTML = data.data.spiritsByDistiller.map(spirit => `${spirit.spirit_name}`))
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