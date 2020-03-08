// Client Side 

const testFunction = () => {
    fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query: "{ distiller }" })
    })
        .then(r => r.json())
        .then(result => console.log('data returned:', result.data.distiller));
};

// SELECT menu currently provides distiller id based on client selection
// 'testFunction' (above), confirms connection to graphql api with test data
document.querySelector('#searchSelect').addEventListener('change', () => {
    const distiller_id = document.querySelector('#searchSelect').selectedOptions[0].value;
    console.log(distiller_id);
    testFunction();
    return distiller_id;
});

// SUBSCRIBE button currently returns entered data in the console
document.querySelector('#addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newUserName = document.querySelector('#addName').value;
    const newUserEmail = document.querySelector('#addEmail').value;
    const userObject = { first_name: newUserName, email_address: newUserEmail };
    console.log(userObject);
})
