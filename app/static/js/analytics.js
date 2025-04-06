class AnalyticsPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      _this.iceVsEvFleetPerformanceBarGraph();
      _this.fuelAndEnergyWastagePieChartMake('fuel_and_energy_wastage_pie_chart');
      _this.driverRiskScorePredictionGraph();
      _this.iceVsEvFleetPerformanceTcoComparison();

      setTimeout(_this.fleetEfficiencyVsFleetEfficiencyWithLoadIdlingGraphView, 5000); // 5 seconds
    });
  }

  fleetEfficiencyVsFleetEfficiencyWithLoadIdlingGraphView() {
    let iframe = document.getElementById('fleet_efficiency_vs_fleet_efficiency_with_load_idling_graph_view');
    iframe.src = '';  // Temporarily remove the source
    iframe.src = '/fleet-efficiency-vs-fleet-efficiency-with-load-idling-graph';  // Reassign the source
    console.log('Retrying iframe load...');
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

  driverRiskScorePredictionGraph(){
    const ctx = document.getElementById('driver_risk_score_prediction_graph').getContext('2d');
    const data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      datasets: [
        {
          label: "Past Risk Scores",
          data: [30, 35, 50, 65, 75, 90],
          borderColor: "blue",
          backgroundColor: "blue",
          fill: false,
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 5,
        },
        {
          label: "Predicted Risk",
          data: [null, null, null, null, null, null, 100, 110, 125],
          borderColor: "red",
          backgroundColor: "red",
          borderDash: [5, 5],
          fill: false,
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 5,
        },
        {
          label: "High Risk Threshold",
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
          borderColor: "red",
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointStyle: false,
        }
      ]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        legend: { display: true },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },

        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Months' // Label for the x-axis
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Risk Score' // Label for the y-axis
            }
          }]
        }
      }
    };

    new Chart(ctx, config);
  }

  iceVsEvFleetPerformanceTcoComparison(){
    const ctx = document.getElementById('ice_vs_ev_fleet_performance_tco_comparison').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Diesel', 'Hybrid', 'EV'],
        datasets: [{
          label: 'Total Cost of Ownership ($/km)',
          data: [0.60, 0.50, 0.35],
          backgroundColor: ['#FF9999', '#FFE0B3', '#66CC66'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `$${tooltipItem.raw.toFixed(2)}`;
              }
            }
          }
        },

        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Vehicle Type' // Label for the x-axis
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Total Cost of Ownership ($/km)' // Label for the y-axis
            }
          }]
        }
      }
    });
  }
}

const analyticsPage = new AnalyticsPage();
