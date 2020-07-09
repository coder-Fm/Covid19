//const country_name_element = document.querySelector(".country .name");
const url = "https://api.covid19api.com/summary";
const country_url = "https://api.covid19api.com/total/country/";
const ctx = document.getElementById("Chart").getContext("2d");
const monthsNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

let app_data = [],
cases_list = [],
recovered_list = [],
deaths_list = [],
deaths = [],
formatedDates = [];

// Initial Data
init();
//axesLinearChart();

function init() {

  var country_name;
  var user_input = prompt("Please Enter a Country: ");
  if (user_input != null) {
    country_name = country_url+user_input;
    //console.log(country_name);
  }

  $.get(url, function(data) {


    let TotalConfirmed = (data.Global.TotalConfirmed).toLocaleString();
    $("#confirmed").html(TotalConfirmed);
    let TotalRecovered  = (data.Global.TotalRecovered).toLocaleString();
    $("#recovered").html(TotalRecovered);
    let TotalDeaths  = (data.Global.TotalDeaths).toLocaleString();
    $("#deaths").html(TotalDeaths);
    let NewConfirmed = (data.Global.NewConfirmed).toLocaleString();
    $("#newconfirmed").html("+" + NewConfirmed);
    let NewRecovered = (data.Global.NewRecovered).toLocaleString();
    $("#newrecovered").html("+" + NewRecovered);
    let NewDeaths = (data.Global.NewDeaths).toLocaleString();
    $("#newdeaths").html("+" + NewDeaths);

  });



  $.get(country_name, function(DATA) {
    //console.log(DATA);

    let last_entry = DATA.length - 1;
    let before_last_entry = DATA.length - 2;
    let list_length = DATA.length;

    let Country = (DATA[0].Country);
    $(".country-title").html(Country);

    let Confirmed = (DATA[last_entry].Confirmed).toLocaleString();
    $("#s-confirmed").html(Confirmed);
    let CountryNewConfirmed = (DATA[last_entry].Confirmed - DATA[before_last_entry].Confirmed).toLocaleString() || 0;
    $("#s-newconfirmed").html("+"+CountryNewConfirmed);

    let Recovered = (DATA[last_entry].Recovered).toLocaleString();
    let CountryNewRecovered = (DATA[last_entry].Recovered - DATA[before_last_entry].Recovered).toLocaleString() || 0;
    if (Recovered <= 0) {
      Recovered = (DATA[before_last_entry].Recovered).toLocaleString();
      CountryNewRecovered = 0;
      $("#s-newrecovered").html("+"+CountryNewRecovered);
      $("#s-recovered").html(Recovered); }

    let CountryNewDeaths = (DATA[last_entry].Deaths - DATA[before_last_entry].Deaths).toLocaleString() || 0;
    let Deaths = (DATA[last_entry].Deaths).toLocaleString();
    if (Deaths <= 0) {
      Deaths = (DATA[before_last_entry].Deaths).toLocaleString();
      CountryNewDeaths = 0;
      $("#s-newdeaths").html("+"+CountryNewDeaths);
      $("#s-deaths").html(Deaths); }

  });

  $.get(country_name, function(data) {
    cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
    for (var current = 0; current in data; current++) {
      dates.push(data[current].Date);
      cases_list.push(data[current].Confirmed).toLocaleString();
      recovered_list.push(data[current].Recovered).toLocaleString();
      deaths_list.push(data[current].Deaths).toLocaleString();
      //formatedDates.push(`${monthsNames[dates.getMonth()]}/${dates.getDate()}`);
      //dates.push((data[current].Date).getDate() + "/" + (data[current].Date).getMonth() + 1);

      //console.log(dates);

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
              labels: dates//formatedDates
            },
              options: {
                responsive : true,
                maintainAspectRatio : false
              }
            });
           }
          }
     });

} // end of init
