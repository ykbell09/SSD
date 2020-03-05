// Client side JS -- search buttons, forms, etc.

// Location buttons -- need to be refactored, use dropdown
// NEED TO CONVERT RESULTING ARRAY OF OBJECTS TO LIST ITEMS
// click California button to fetch CA api
document.querySelector('.ca-button').addEventListener('click', () => fetch('/api/getGins/CA')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.search-location').innerHTML = 'California';
        document.querySelector('.results-list').innerHTML = data;
    }));

// click Texas button to fetch TX api
document.querySelector('.tx-button').addEventListener('click', () => fetch('/api/getGins/TX')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.search-location').innerHTML = 'Texas';
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

// submit remove user data and alert confirmation
document.querySelector('#deleteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const removeEmail = document.querySelector('#removeEmail').value;

    fetch('/api/removeUser', {
        method: 'post',
        body: JSON.stringify({ removeEmail }),
        headers: { "content-Type": "application/json" }
    })
        .then(response => response.json());
});

// submit new website and alert confirmation
document.querySelector('#websiteUpdate').addEventListener('submit', (e) => {
    e.preventDefault();
    const newWebsite = document.querySelector('#updateWebsite').value;
    const distillerId = document.querySelector('#distillerId').value;
    const updateWebsiteData = { distillerId, newWebsite };

    fetch('/api/updateWebsite', {
        method: 'post',
        body: JSON.stringify(updateWebsiteData),
        headers: { "content-Type": "application/json" }
    })
        .then(response => response.json());
});
