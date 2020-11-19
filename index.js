"use strict";

const apiKey = "kSKFJRm1oQyKlvLhETSmThg6zQVDeYpGjcwJDoJd";
const searchURL="https://api.nps.gov/api/v1/parks";

function submitForm(){
  $('#parkForm').submit(e => {
    e.preventDefault();
    if(!/^\w(\s*,?\s*\w)*$/.test($("#state-name-input").val())){
      alert("Invalid input");
      return;
    }
    const userInput = $('#state-name-input').val().split(",");
    const numResults = $('#max-results-input').val();
    getParkResults(userInput, numResults);
  });
}
//Format Search Query
function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
//GET Request to NPS API
function getParkResults(query, maxResults){
  const params = {
    key: apiKey,
    stateCode: query,      
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;  
  console.log(url);  
  fetch(url)
    .then(response =>response.json())
    .then(response => renderParkResults(response.data))
    .catch(err =>alert(err));    
}
//Render the GET Request results to the DOM
function renderParkResults(parkList){      
  $('#results-list').empty();
  $('#results').text("Check your search result below:");
  parkList.forEach(item =>{
  $('#results-list').append(`<li><h3>${item.fullName}</h3>
  <p>${item.description}</p><a href=${item.url}>Park's Website</a><div id="addresses"><h5>${item.addresses[0].type}:</h5><p class="addresses">${item.addresses[0].line1}</p><p class="addresses">${item.addresses[0].line2}</p><p class="addresses">${item.addresses[0].line3}</p>
  <p class="addresses">${item.addresses[0].city}, ${item.addresses[0].stateCode}, ${item.addresses[0].postalCode}</p></div></li>`)
});
}

$(submitForm);
