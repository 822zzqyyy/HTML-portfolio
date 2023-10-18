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
//Add event listeners to each checkbox to control whether
//chart displays or not.
$(`#chart1`).click(() => {
  $(`.chart1`).toggle();
});
$(`#chart2`).click(() => {
  $(`.chart2`).toggle();
});
$(`#chart3`).click(() => {
  $(`.chart3`).toggle();
});
$(`#chart4`).click(() => {
  $(`.chart4`).toggle();
});

//API function
async function chartData() {
  let result = await fetch("https://data.princegeorgescountymd.gov/resource/weik-ttee.json");
  let data = await result.json();
  return data
}

//Below 4 async functions are to extact data for charts.
async function agencyCount(dataset) {
  let dict = {};
  let agency = await dataset.map((da) => da.county_agency);
  agency.forEach(element => {
      if (Object.keys(dict).includes(element)) {
          dict[element] += 1;
      } else {
          dict[element] = 1;
      }
  });
  return dict
}

async function permitTypeCount(dataset) {
  let dict = {};
  let permitType = await dataset.map((da) => da.permit_type);
  permitType.forEach(element => {
      if (Object.keys(dict).includes(element)) {
          dict[element] += 1;
      } else {
          dict[element] = 1;
      }
  });
  return dict
}

async function cityCount(dataset) {
  let dict = {};
  let city = await dataset.map((da) => da.city);
  city.forEach(element => {
      if (Object.keys(dict).includes(element)) {
          dict[element] += 1;
      } else {
          dict[element] = 1;
      }
  });
  return dict
}

async function categoryCount(dataset) {
  let dict = {};
  let category = await dataset.map((da) => da.permit_category);
  category.forEach(element => {
      if (Object.keys(dict).includes(element)) {
          dict[element] += 1;
      } else {
          dict[element] = 1;
      }
  });
  return dict
}

//JQuery corresponding canvas for chart.
const ctx1 = $('#myChart1');
const ctx2 = $('#myChart2');
const ctx3 = $('#myChart3');
const ctx4 = $('#myChart4');

async function mainEvent() {
    var originalData = await chartData(); //fetch data from API
    
    //Create data for different charts.
    var agency = await agencyCount(originalData);
    var permitType = await permitTypeCount(originalData);
    var city = await cityCount(originalData);
    var category = await categoryCount(originalData);

    //keys are x-labels, values are y-labels.
    const agencyKeys = await Object.keys(agency);
    const agencyValues = await Object.values(agency);
    const permitTypeKeys = await Object.keys(permitType);
    const permitTypeValues = await Object.values(permitType);
    const cityKeys = await Object.keys(city);
    const cityValues = await Object.values(city);
    const categoryKeys = await Object.keys(category);
    const categoryValues = await Object.values(category);


    //Chart.js
    new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: agencyKeys,
      datasets: [{
        label: '# of Agencies',
        data: agencyValues,
        borderWidth: 1,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)']
      }]
    },
    options: {
      indexAxis: 'y',
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: permitTypeKeys,
      datasets: [{
        label: '# of Type',
        data: permitTypeValues,
        borderWidth: 1
      }]
    },
    options: {
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: cityKeys,
      datasets: [{
        label: '# of City',
        data: cityValues,
        borderWidth: 1
      }]
    },
    options: {
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: categoryKeys,
      datasets: [{
        label: '# of Category',
        data: categoryValues,
        borderWidth: 1
      }]
    },
    options: {
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", async () => mainEvent()); // the async keyword means we can make API request