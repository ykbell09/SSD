// Client side JS -- search buttons, forms, etc.

// NEED TO CONVERT RESULTING ARRAY OF OBJECTS TO LIST ITEMS
// select Amass from dropdown to get spirits from api
document.querySelector('#search-box').addEventListener('click', () => fetch('/api/graphql')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.results-list').innerHTML = data;
    }));


// submit new user data and alert the new user id
document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUserName = document.querySelector('#addName').value;
    const newUserEmail = document.querySelector('#addEmail').value;
    const userObject = { first_name: newUserName, email_address: newUserEmail };

    fetch('/api/addUser', {
        method: 'post',
        body: JSON.stringify(userObject),
        headers: { "Content-Type": "application/json" }
    })
        .then(response => response.json())
        .then(data => {
            alert('New User Id ' + data.id)
        });
});

