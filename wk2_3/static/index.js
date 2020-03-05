// client side

// this function should display on the screen the data matching the location based on the button clicked

// click CA button to run checkLocation('California');
document.querySelector('.ca-button').addEventListener('click', () => fetch('/api/getGins/California')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.search-location').innerHTML = 'California';
        document.querySelector('.results-list').innerHTML = data;
    })); 
    
// click TX button to run checkLocation('Texas');
document.querySelector('.tx-button').addEventListener('click', () => fetch('/api/getGins/Texas')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.search-location').innerHTML = 'Texas';
        document.querySelector('.results-list').innerHTML = data;
    })); 