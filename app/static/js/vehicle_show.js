class VehicleShowPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      _this.costOfOwenershipBarChart();    
    });
  }

  costOfOwenershipBarChart(){
    var yValues1 = [16, 28, 23, 24, 33];
    var yValues2 = [20, 23, 19, 17, 20];
    var yValues3 = [4, 5, 3, 2, 6];

    // Create a new chart with two datasets
    new Chart("cost_of_owenership_bar_chart", {
      type: "bar",
      data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb"],

        datasets: [{
          label: "Fuel Costs",
          backgroundColor: "#379900",
          data: yValues1
        }, {
          label: "Maintenance cost",
          backgroundColor: "#ea6759",
          data: yValues2
        }, {
          label: "Other Cost",
          backgroundColor: "#2b5a92",
          data: yValues3
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Cost of Ownership"
        },
        scales: {
          xAxes: [{
            stacked: true  // Stack the bars
          }],
          yAxes: [{
            stacked: true  // Stack the bars
          }]
        }
      }
    });
  }
}

const vehicleShowPage = new VehicleShowPage();
