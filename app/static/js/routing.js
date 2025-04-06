class RoutingPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      // _this.routeOptimizationComparisonBarGraphChart();
      // _this.beforeVsAfterRouteOptimizationEnergyConsumptionBarGraph();
      // _this.vehicleAssignmentToRouteShortVsLongGraph('vehicle_assignment_to_route_short_vs_long');
    });
  }

  routeOptimizationComparisonBarGraphChart(){
    var yValues1 = [16, 28, 23, 24, 33];  // First dataset
    var yValues2 = [20, 29, 31, 27, 46];  // Second dataset

    // Create a new chart with two datasets
    new Chart("route_optimization_comparison_bar_graph", {
      type: "bar",
      data: {
        labels: ["BMW", "Audi", "Toyota", "Lexus", "Honda"],

        datasets: [{
          label: "Optimized Time",
          backgroundColor: "#379900",
          data: yValues2
        },{
          label: "Original Time",
          backgroundColor: "#ea6759",
          data: yValues1
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Route Optimization Comparison: Time Reduction"
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
  
  beforeVsAfterRouteOptimizationEnergyConsumptionBarGraph(){
    var yValues1 = [42, 19, 5, 29, 46];  // First dataset
    var yValues2 = [36, 15, 2, 24, 43];  // Second dataset

    // Create a new chart with two datasets
    new Chart("before_vs_after_route_optimization_energy_consumption_bar_graph", {
      type: "bar",
      data: {
        labels: ["BMW", "Audi", "Toyota", "Lexus", "Honda"],

        datasets: [{
          label: "Original Energy",
          backgroundColor: "#2b5a92",
          data: yValues1
        },{
          label: "Optimized Energy",
          backgroundColor: "#f5b548",
          data: yValues2
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Before vs After Route Optimization Energy Consumption"
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

  vehicleAssignmentToRouteShortVsLongGraph(id){
    var obj = {
      values: [60, 40],
      colors: ["#00a28a", "#f7c46c"],
      animation: true, // Takes boolean value & default behavious is false
      animationSpeed: 0, // Time in miliisecond & default animation speed is 20ms
      fillTextData: true, // Takes boolean value & text is not generate by default 
      fillTextColor: '#fff', // For Text colour & default colour is #fff (White)
      fillTextAlign: 1.30, // for alignment of inner text position i.e. higher values gives closer view to center & default text alignment is 1.85 i.e closer to center
      fillTextPosition: 'inner', // 'horizontal' or 'vertical' or 'inner' & default text position is 'horizontal' position i.e. outside the canvas
      doughnutHoleSize: 0, // Percentage of doughnut size within the canvas & default doughnut size is null
      doughnutHoleColor: Looper.skin === 'dark' ? Looper.getColors('gray')[200] : '#fff', // For doughnut colour & default colour is #fff (White)
      offset: 1, // Offeset between two segments & default value is null
      pie: 'normal', // if the pie graph is single stroke then we will add the object key as "stroke" & default is normal as simple as pie graph
      isStrokePie: { 
        stroke: 20, // Define the stroke of pie graph. It takes number value & default value is 20
        overlayStroke: true, // Define the background stroke within pie graph. It takes boolean value & default value is false
        overlayStrokeColor: '#eee', // Define the background stroke colour within pie graph & default value is #eee (Grey)
        strokeStartEndPoints: 'Yes', // Define the start and end point of pie graph & default value is No
        strokeAnimation: true, // Used for animation. It takes boolean value & default value is true
        strokeAnimationSpeed: 3, // Used for animation speed in miliisecond. It takes number & default value is 20ms
        fontSize: '60px', // Used to define text font size & default value is 60px
        textAlignement: 'center', // Used for position of text within the pie graph & default value is 'center'
        fontFamily: 'Arial', // Define the text font family & the default value is 'Arial'
        fontWeight: 'bold' //  Define the font weight of the text & the default value is 'bold'
      }
    };

    generatePieGraph(id, obj);
  }
}

const routingPage = new RoutingPage();
