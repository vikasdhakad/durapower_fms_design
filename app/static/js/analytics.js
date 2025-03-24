class AnalyticsPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      _this.iceVsEvFleetPerformanceBarGraph();
      _this.fuelAndEnergyWastagePieChartMake('fuel_and_energy_wastage_pie_chart');   
    });
  }

  iceVsEvFleetPerformanceBarGraph(){
    var yValues1 = [42, 19, 5, 29, 46];
    var yValues2 = [36, 15, 8, 24, 26];
    var yValues3 = [39, 7, 2, 15, 43];

    // Create a new chart with two datasets
    new Chart("ice_vs_ev_fleet_performance", {
      type: "bar",
      data: {
        labels: ["Dec", "Jan", "Feb", "Mar", "April"],

        datasets: [{
          label: "EV",
          backgroundColor: "#2b5a92",
          data: yValues1
        },{
          label: "Hybrid",
          backgroundColor: "#f5b548",
          data: yValues2
        },{
          label: "ICE",
          backgroundColor: "#c2bbaa",
          data: yValues3
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "ICE vs EV Fleet Performance"
        },
        scales: {
          x: [{
            stacked: false  // Disable stacking for x-axis
          }],
          y: [{
            stacked: false  // Disable stacking for y-axis
          }]
        }
      }
    });
  }

  fuelAndEnergyWastagePieChartMake(id){
    var obj5 = {
      values: [35, 22, 77, 56],
      colors: ['#00a28a', '#346cb0', '#f7c46c', '#b76ba3'],
      animation: false,
      doughnutHoleSize: 0,
      doughnutHoleColor: '#fff',
      offset: 0,

      // print text on circle start
      animation: true,
      animationSpeed: 0,
      fillTextData: true,
      fillTextColor: '#fff',
      fillTextAlign: 1.30,
      fillTextPosition: 'inner',
      // print text on circle end

      doughnutHoleColor: Looper.skin === 'dark' ? Looper.getColors('gray')[200] : '#fff'
    };
    generatePieGraph(id, obj5);
  }
}

const analyticsPage = new AnalyticsPage();
