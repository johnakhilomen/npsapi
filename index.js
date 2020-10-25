const apiKey = "kSKFJRm1oQyKlvLhETSmThg6zQVDeYpGjcwJDoJd";
const searchURL="https://api.nps.gov/api/v1/parks";

function submitForm(){
    $('#parkForm').submit(e => {
      e.preventDefault();
      const userInput = $('#state-name-input').val();
      const numResults = $('#max-results-input').val();
      getParkResults(userInput, numResults);
    });
}

function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParkResults(query, maxResults=10){
  const params = {
      key: apiKey,
      stateCode: query,      
      maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&fields=addresses'
    
  fetch(url)
    .then(response =>{
        if (response.ok){
            return response.json();
        }        
    })
    .then(response => renderParkResults(response.data))
    .catch(err =>alert(err));    
}

function renderParkResults(parkList){
    console.log(parkList);
    $('#results-list').html("");
    $('#results').text("Check your search result below:");
    parkList.forEach(item =>{
    $('#results-list').append(`<li><h3>${item.fullName}</h3>
    <p>${item.description}</p><a href=${item.url}>Park's Website</a><div id="addresses"><h5>${item.addresses[0].type}:</h5><p class="addresses">${item.addresses[0].line1}</p><p class="addresses">${item.addresses[0].city}</p><p class="addresses">${item.addresses[0].stateCode}</p>
    <p class="addresses">${item.addresses[0].city}, ${item.addresses[0].stateCode}, ${item.addresses[0].postalCode}</p></div></li>`)
    });
}

function init(){
    submitForm();
}

$(init);