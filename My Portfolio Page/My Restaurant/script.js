function myFunction() {
  var x = document.querySelector(".nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

$("body>div").on("click",
()=>{
  $(".responsive").removeClass("responsive");
}
);

$("body>footer").on("click",
()=>{
  $(".responsive").removeClass("responsive");
}
);

function getRandomIntInclusive(min, max) {
  const min2 = Math.ceil(min);
  const max2 = Math.floor(max);
  return Math.floor(Math.random() * (max2 - min2 + 1) + min2);
}

function initMap() {
  // so much so familiar, but we will need this to inject markers later!
  console.log('initMap');
  const map = L.map('map').setView([38.9869, -76.9426], 10);
  // const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 13,
    attribution: '© OpenStreetMap'
}).addTo(map);

  return map; // this "return" is how we get our active map object back for marker injection later
}

function markerPlace(array, map) {
  // we're going to store some state here by returning the markers so we can remove them later.
  console.log(array);
  // First, we have to remove our pre-existing markers from the map
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      // Do marker specific actions here
      console.log(layer);
      layer.remove();
    }
  });

  // now for each element in our restaurant array, we add a marker to the map
  // we already checked in our filter that the required column exists
  array.forEach((m) => {
    // destructure our coordinates from the restaurant object
    const {coordinates} = m.geocoded_column_1;

    // the restaurant object has reversed lat and long sometimes
    L.marker([coordinates[1], coordinates[0]]).addTo(map);
  });
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name} </li>`;
    target.innerHTML += str;
  });
}

function processRestaurants(list) {
  /* This method does not guarantee uniqueness, but it is about as simple to follow as is possible */
  if(!list) {
    console.log("Missing list")
    return
  }
  console.log('fired restaurants list');
  const range = [...Array(15).keys()];
  const newArray = range.map((m) => {
    const index = getRandomIntInclusive(0, list.length);
    return list[index];
  });
  return newArray;
}

/*
    ## Main Event
*/
async function mainEvent() {
  // NEW CODE - initialise the map from Leaflet
  const map = initMap();

  // Set up our constants, which include our side effect targets
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button[type="submit"]');
  const loadAnimation = document.querySelector('.lds-ellipsis');
  const restoName = document.querySelector('#resto'); // rearrange our target elements so they are together
  submit.style.display = 'none';

  /* API data request */
  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json(); // convert it to JSON

  if (arrayFromJson.length > 0) { // these functions run once the data has loaded
    // Show the submit button
    submit.style.display = 'block';
    // Hide the load animation
    loadAnimation.classList.remove('lds-ellipsis');
    loadAnimation.classList.add('lds-ellipsis_hidden');

    // Process our form's button action
    let currentArray;
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = processRestaurants(arrayFromJson);

      /*

        If we want to put restaurants on the map, they need a location!
        Here we're filtering based on whether the lat-long 'geocoded_column_1' value has been found.
        If it doesn't exist, it will return "undefined,"
        Which is a "falsey" value - a negative or non-true value
        Declaring something a "Boolean" like this will "coerce" the result to be true or false
        In the Input event, we will "chain" two filters to get a refined list
      */
      const restaurants = currentArray.filter((item) => Boolean(item.geocoded_column_1));

      injectHTML(restaurants); // we're passing the data set into the new function
      markerPlace(restaurants, map); // and here we're adding some markers to the map
    });

    // Process our input field's action
    restoName.addEventListener('input', (event) => {
      // this is an error catcher, the filter does nothing until something exists
      if (!currentArray.length) { return; }

      // Debug logging to make sure the code is doing what we think it is
      // console.log(event.target.value);
      // console.log(currentArray);

      const restaurants = currentArray
        .filter((item) => {
          // our first filter handles name comparisons
          const lowerCaseName = item.name.toLowerCase();
          const lowerCaseQuery = event.target.value.toLowerCase();
          return lowerCaseName.includes(lowerCaseQuery);
        }) // and we can "chain" it to a second filter that checks for locations
        .filter((item) => Boolean(item.geocoded_column_1));

      if (restaurants.length > 0) {
        injectHTML(restaurants);
        // here we use the "map" instance from our initMap function
        // to attach markers from the restaurants list to the map
        markerPlace(restaurants, map);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
