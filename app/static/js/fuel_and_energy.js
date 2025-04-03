class FuelAndEnergyPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      _this.iceVsEvFleetPerformanceBarGraph('fuel_cost_projections_for_next_6_months_based_on_driver_behavior');
    });
  }

  iceVsEvFleetPerformanceBarGraph(id){
    var yValues1 = [350, 340, 345, 310, 330];
    var yValues2 = [0, 0, 50, 0, 0, 200];
    var yValues3 = [0, 0, 0, 30, 50, 0];

    // Create a new chart with two datasets
    new Chart(id, {
      type: "bar",
      data: {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],

        datasets: [{
          label: "Current Fuel Cost $",
          backgroundColor: "#c2bbaa",
          data: yValues1
        },{
          label: "Projected Saving $",
          backgroundColor: "green",
          data: yValues2
        },{
          label: "Projected Additional Cost $",
          backgroundColor: "red",
          data: yValues3
        }]
      },

      options: {
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false
            },
            ticks: {
              maxRotation: 0,
              maxTicksLimit: 5
            },
            scaleLabel: {
              display: true,
              labelString: '' // Label for the x-axis
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Fuel Cost ($)' // Label for the y-axis
            }
          }]
        }
      }

      // options: {
      //   legend: { display: true },
      //   title: {
      //     display: true,
      //     text: "ICE vs EV Fleet Performance"
      //   },
      //   scales: {
      //     x: [{
      //       stacked: true,  // Disable stacking for x-axis
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'Months' // Left y-axis for usage
      //       }
      //     }],
      //     y: [{
      //       stacked: true,  // Disable stacking for y-axis
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'Fuel Cost ($)' // Left y-axis for usage
      //       }
      //     }]
      //   }
      // }
    });
  }
}

const fuelAndEnergyPage = new FuelAndEnergyPage();
