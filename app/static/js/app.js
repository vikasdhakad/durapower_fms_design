class DashboardPage {
  constructor(){
    var last_3_months_fuel_trends = {
      labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').indigo,
        borderColor: Looper.getColors('brand').indigo,
        data: [345, 120, 155, 65, 465]
      }]
    };
    this.makeBarGraph(last_3_months_fuel_trends, 'last_3_months_fuel_trends');

    var last_3_months_mileage_trends = {
      labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').orange,
        borderColor: Looper.getColors('brand').orange,
        data: [387, 221, 225, 325, 80]
      }]
    };
    this.makeBarGraph(last_3_months_mileage_trends, 'last_3_months_mileage_trends');

    var co2_emission_report = {
      labels: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').green,
        borderColor: Looper.getColors('brand').green,
        data: [155, 65, 465, 265, 225, 325, 80]
      }]
    };
    this.makeBarGraph(co2_emission_report, 'co2_emission_report');
  }

  makeBarGraph(data, id) {
    var canvas = $(`#${id}`)[0].getContext('2d');
    var chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 3
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 100
            }
          }]
        }
      }
    });
  }

}

const dashboardPage = new DashboardPage();
