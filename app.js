const ctx = document.getElementById("Chart").getContext("2d");
const monthsNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const country_url = "https://api.covid19api.com/total/country/";
var country_name;

let app_data = [],
cases_list = [],
recovered_list = [],
deaths_list = [],
deaths = [],
formatedDates = [];

// Initial Data
init();

function init() {
  var user_input = prompt("Please Enter a Country: ");
  if (user_input != null) {
    country_name = country_url+user_input;
  }

  $.get(country_name, function(DATA) {

    let last_entry = DATA.length - 1;
    let before_last_entry = DATA.length - 2;
    let list_length = DATA.length;

    let Country = (DATA[0].Country);
    $(".country-title").html(Country);

    let Confirmed = (DATA[last_entry].Confirmed).toLocaleString();
    $("#s-confirmed").html(Confirmed);

    let CountryNewConfirmed = (DATA[last_entry].Confirmed - DATA[before_last_entry].Confirmed).toLocaleString();
    if ((CountryNewConfirmed < 0) || (CountryNewConfirmed = Confirmed)) {
      CountryNewConfirmed = 0;
      $("#s-newconfirmed").html("+"+CountryNewConfirmed);
    } else {
      $("#s-newconfirmed").html("+"+CountryNewConfirmed);
    }

    let Recovered = (DATA[last_entry].Recovered).toLocaleString();
    $("#s-recovered").html("+"+Recovered);

    let CountryNewRecovered = (DATA[last_entry].Recovered - DATA[before_last_entry].Recovered).toLocaleString();
    if ((CountryNewRecovered < 0) || (CountryNewRecovered = Recovered)) {
      CountryNewRecovered = 0;
      $("#s-newrecovered").html("+"+CountryNewRecovered);
    } else {
      $("#s-newrecovered").html("+"+CountryNewRecovered);
    }

    let Deaths = (DATA[last_entry].Deaths).toLocaleString();
    $("#s-deaths").html(Deaths);

    let CountryNewDeaths = (DATA[last_entry].Deaths - DATA[before_last_entry].Deaths).toLocaleString();
    if ((CountryNewDeaths < 0) || (CountryNewDeaths = Deaths)) {
      CountryNewDeaths = 0;
      $("#s-newdeaths").html("+"+CountryNewDeaths);
    } else {
      $("#s-newdeaths").html("+"+CountryNewDeaths);
    }

    cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
    for (var current = 0; current in DATA; current++) {
      dates.push(DATA[current].Date);
      cases_list.push(DATA[current].Confirmed).toLocaleString();
      recovered_list.push(DATA[current].Recovered).toLocaleString();
      deaths_list.push(DATA[current].Deaths).toLocaleString();

      let my_chart;

      axesLinearChart();

      function axesLinearChart() {
        if(my_chart) {
          my_chart.destroy();
        }
        my_chart = new Chart(ctx, {
            type: 'line',
            data: {
              datasets: [{
                label: 'Cases',
                data: cases_list,
                fill : false,
                borderColor : 'SteelBlue',
                backgroundColor: 'SteelBlue',
                borderWidth : 2,
                LineTension: 5,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1.7,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
              },{
                label: 'Recovered',
                data: recovered_list,
                fill : false,
                borderColor : '#fff',
                backgroundColor: '#fff',
                borderWidth : 2,
                LineTension: 5,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1.7,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
              },{
                label: 'Deaths',
                data: deaths_list,
                fill : false,
                borderColor : '#e54c10',
                backgroundColor: '#e54c10',
                borderWidth : 2,
                LineTension: 5,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1.7,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10
              }],
              labels: dates
            },
              options: {
                responsive : true,
                maintainAspectRatio : false
              }
            });
           }
          }
     });

} 
