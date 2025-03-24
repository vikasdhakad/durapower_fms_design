class DashboardPage {
  constructor(){
    var _this = this
    $(document).ready(function() {

      _this.proecessToDisplayBarGraph(_this);
      _this.evUsageGraphMake('ev_usage_graph_area');
      _this.weeklyIdlCostLineGraphMake('weekly_idl_cost_graph');
      _this.fuelUsagePieChartMake('fuel_usage_pie_chart');

      _this.top5AggressiveDriversChart();
      _this.handleGrapsTooltips();
      _this.driverSafetyScorecardPieChartMake('driver_safety_scorecard');

      setTimeout(function() {
        _this.manageVehicleConditionEasyPieChart(_this);
        _this.addCenterTextOnTotalVechicleEasyPieChart('total_vechicle_easypiechart_3', "632")
      }, 1500); // 2000 milliseconds (2 seconds) delay
    });
  }

  addCenterTextOnTotalVechicleEasyPieChart(id, text1){
    var canvas = $(`#${id}`).children('canvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = Looper.skin === 'dark' ? '#ffffff' : '#555555';
    ctx.font = "30px Arial";

    ctx.rotate(299.22);  // Rotate by the angle
    ctx.fillText(text1, -30, 10);
  }

  manageVehicleConditionEasyPieChart(_this){
    _this.addCenterTextOnVehicleConditionEasyPieChart('vehicle_condition_easypiechart_1', "10%", "Health Rate")
    _this.addCenterTextOnVehicleConditionEasyPieChart('vehicle_condition_easypiechart_2', "50%", "Health Rate")
    _this.addCenterTextOnVehicleConditionEasyPieChart('vehicle_condition_easypiechart_3', "70%", "Health Rate")
  }

  addCenterTextOnVehicleConditionEasyPieChart(id, text1, text2){
    var canvas = $(`#${id}`).children('canvas')[0];
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = Looper.skin === 'dark' ? '#ffffff' : '#555555';
    ctx.font = "30px Arial";

    ctx.rotate(299.22);  // Rotate by the angle

    ctx.fillText(text1, -30, 0);
    ctx.font = "15px Arial";
    ctx.fillText(text2, -35, 20);
  }

  proecessToDisplayBarGraph(_this){
    var last_3_months_fuel_trends = {
      labels: ['Dec 2024', 'Jan 2025', 'Feb 2025'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').indigo,
        borderColor: Looper.getColors('brand').indigo,
        data: [190, 320, 480]
      }]
    };
    _this.makeBarGraph(last_3_months_fuel_trends, 'last_3_months_fuel_trends', 'Month', 'Fuel Burned');

    var last_3_months_mileage_trends = {
      labels: ['Dec 2024', 'Jan 2025', 'Feb 2025'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').orange,
        borderColor: Looper.getColors('brand').orange,
        data: [160, 340, 470]
      }]
    };
    _this.makeBarGraph(last_3_months_mileage_trends, 'last_3_months_mileage_trends', 'Month', 'Distance Driven');

    var co2_emission_report = {
      labels: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').green,
        borderColor: Looper.getColors('brand').green,
        data: [155, 65, 465, 265, 225, 325, 80]
      }]
    };
    _this.makeBarGraph(co2_emission_report, 'co2_emission_report', '', '');

    var driving_distance_graph = {
      labels: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').green,
        borderColor: Looper.getColors('brand').green,
        data: [155, 65, 465, 265, 225, 325, 80]
      }]
    };
    _this.makeBarGraph(driving_distance_graph, 'driving_distance_graph', '', '');
  }

  makeBarGraph(data, id, label_x, label_y) {
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
            },
            scaleLabel: {
              display: true,
              labelString: label_x // Label for the x-axis
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
              labelString: label_y // Label for the y-axis
            }
          }]
        }
      }
    });
  }

  evUsageGraphMake(id) {
    var hoursAndDistanceData = [
      [1, 400], [2, 350], [3, 500], [4, 600], [5, 650], [6, 456],
      [7, 276], [8, 289], [9, 334], [10, 510], [11, 480],
      [12, 470], [13, 460], [14, 510], [15, 515], [16, 530]
    ]; // dataset

    var dataset = [{
      label: 'EV Usage',
      data: hoursAndDistanceData,
      color: Looper.colors.brand.blue
    }];

    var options = {
      series: {
        lines: {
          show: true,
          fill: true
        }
      },
      xaxis: {
        tickLength: 0,
        axisLabel: 'Hours',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelPadding: 10,
        axisLabelFontFamily: 'inherit, sans-serif',
        axisLabelColour: Looper.getMutedColor(),
        //tickSize: [40, 'year'],
      },
      yaxis: {
        axisLabel: 'Distance (KM)',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelPadding: 3,
        axisLabelFontFamily: 'inherit, sans-serif',
        axisLabelColour: Looper.getMutedColor(),
        tickFormatter: function tickFormatter(v, axis) {
          return v;
        }
      },
      legend: {
        noColumns: 3,
        position: 'nw'
      },
      grid: {
        hoverable: true,
        borderWidth: 0,
        color: Looper.getMutedColor()
      }
    }; // merge our setting with flot options

    options = $.extend(true, {}, Looper.flotDefaultOptions(), options); // init chart

    $(`#${id}`).plot(dataset, options);
  }

  weeklyIdlCostLineGraphMake(id) {
    var cost = [];
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Example of cost data (replace these with actual values if needed)
    var weeklyCost = [6, 45, 110, 145, 160, 130, 155];  // Example cost values for each day

    // Create the dataset for cost
    for (var i = 0; i < days.length; i++) {
      cost.push([i, weeklyCost[i]]);  // Push cost and corresponding day index
    }

    var dataset = [{
      data: cost,
      label: 'Cost ($)',
      color: Looper.colors.brand.purple  // Adjust color if needed
    }, {
      data: days,
      label: 'Days',
      color: Looper.colors.brand.teal  // Adjust color if needed
    }];
    
    var options = {
      series: {
        lines: {
          show: true
        },
        points: {
          fillColor: Looper.skin === 'dark' ? Looper.getColors('gray')[200] : Looper.white,
          show: true
        }
      },
      colors: [Looper.colors.brand.purple, Looper.colors.brand.teal],
      grid: {
        hoverable: true,
        borderWidth: 0,
        color: Looper.getMutedColor()
      },
      legend: {
        position: 'se'
      },
      xaxis: {
        ticks: days.map((day, index) => [index, day]),  // Map days to x-axis labels
        tickLength: 0
      },
      yaxis: {
        min: 0,
        max: 200  // Adjust based on your cost range
      }
    }; // Merge our setting with flot options

    options = $.extend(true, {}, Looper.flotDefaultOptions(), options);
    $(`#${id}`).plot(dataset, options);
  }

  fuelUsagePieChartMake(id){
    var obj = {
      values: [22.81, 77.19],
      colors: ['#ea6759', '#00a28a'],
      animation: true, // Takes boolean value & default behavious is false
      animationSpeed: 0, // Time in miliisecond & default animation speed is 20ms
      fillTextData: true, // Takes boolean value & text is not generate by default 
      fillTextColor: '#fff', // For Text colour & default colour is #fff (White)
      fillTextAlign: 1.30, // for alignment of inner text position i.e. higher values gives closer view to center & default text alignment is 1.85 i.e closer to center
      fillTextPosition: 'inner', // 'horizontal' or 'vertical' or 'inner' & default text position is 'horizontal' position i.e. outside the canvas
      doughnutHoleSize: 50, // Percentage of doughnut size within the canvas & default doughnut size is null
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

  handleGrapsTooltips() {
    // line and bar ev_usage_graph_area weekly_idl_cost_graph
    $('<div id="flot-tooltip" class="flot-tooltip"></div>').appendTo('body');
    $(document).on('plothover', '#ev_usage_graph_area, #weekly_idl_cost_graph, #maintenance_performance_cost_graph', function (event, pos, item) {
      if (item) {
        var x = item.datapoint[0].toFixed(2);
        var y = item.datapoint[1].toFixed(2);
        var series = item.series.label === undefined ? item.series.data[item.dataIndex][0] : item.series.label + ' of ' + x;
        $('#flot-tooltip').html(series + ' = ' + y).css({
          top: item.pageY + 5,
          left: item.pageX + 5
        }).fadeIn(300);
      } else {
        $('#flot-tooltip').hide();
      }
    }); // flot area

    // $('<div id="flot-tooltip2" class="flot-tooltip"></div>').appendTo('body');
    // $(document).on('plothover', '#flot-area', function (event, pos, item) {
    //   if (item) {
    //     var x = item.datapoint[0];
    //     var y = item.datapoint[1];
    //     var color = item.series.color;
    //     $('#flot-tooltip2').html("<strong>".concat(item.series.label, "</strong><br>").concat(new Date(x).getFullYear(), " : <strong>Population : ").concat(y, "</strong> <br> <em>(multiply by 10,000)</em>")).css({
    //       top: item.pageY + 5,
    //       left: item.pageX + 5,
    //       borderColor: color,
    //       color: Looper.getDarkColor(),
    //       backgroundColor: Looper.getLightColor()
    //     }).fadeIn(300);
    //   } else {
    //     $('#flot-tooltip2').hide();
    //   }
    // }); // barhor

    // $('<div id="flot-tooltip3" class="flot-tooltip"></div>').appendTo('body');
    // $(document).on('plothover', '#flot-barhor', function (event, pos, item) {
    //   if (item) {
    //     var x = item.datapoint[0];
    //     var y = item.datapoint[1];
    //     var color = item.series.color;
    //     $('#flot-tooltip3').html("<strong>".concat(item.series.label, " :</strong> ").concat(x)).css({
    //       top: item.pageY + 9,
    //       left: item.pageX - 100,
    //       borderColor: color,
    //       color: Looper.getDarkColor(),
    //       backgroundColor: Looper.getLightColor()
    //     }).fadeIn(300);
    //   } else {
    //     $('#flot-tooltip3').hide();
    //   }
    // }); // combine

    // $('<div id="flot-tooltip4" class="flot-tooltip"></div>').appendTo('body');
    // $(document).on('plothover', '#flot-combine', function (event, pos, item) {
    //   if (item) {
    //     var x = item.datapoint[0];
    //     var y = item.datapoint[1];
    //     var color = item.series.color;
    //     var date = 'Jan ' + new Date(x).getDate();
    //     var unit = '';

    //     if (item.series.label == 'Sea Level Pressure') {
    //       unit = 'hPa';
    //     } else if (item.series.label == 'Wind Speed') {
    //       unit = 'km/hr';
    //     } else if (item.series.label == 'Temperature') {
    //       unit = 'Â°C';
    //     }

    //     $('#flot-tooltip4').html("'<strong>".concat(item.series.label, "'</strong><br>").concat(date, "' : <strong>").concat(y, "'</strong> ").concat(unit)).css({
    //       top: item.pageY + 5,
    //       left: item.pageX + 5,
    //       borderColor: color,
    //       color: Looper.getDarkColor(),
    //       backgroundColor: Looper.getLightColor()
    //     }).fadeIn(300);
    //   } else {
    //     $('#flot-tooltip4').hide();
    //   }
    // });
  }

  top5AggressiveDriversChart(){
    var yValues1 = [16, 28, 23, 24, 33];
    var yValues2 = [20, 23, 19, 17, 20];
    var yValues3 = [5, 7, 3, 11, 8];

    // Create a new chart with two datasets
    new Chart("top_5_aggressive_drivers", {
      type: "bar",
      data: {
        labels: ["Emma W.", "David P.", "Sarah L.", "John D.", "Mike T."],

        datasets: [{
          label: "Harsh Braking",
          backgroundColor: "#346cb0",
          data: yValues1
        }, {
          label: "Harsh Cornering",
          backgroundColor: "#23b5ee",
          data: yValues2
        }, {
          label: "Harsh Acceleration",
          backgroundColor: "#00a28a",
          data: yValues3
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: ""
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

  driverSafetyScorecardPieChartMake(id){
    var obj5 = {
      values: [15, 50, 20, 66],
      colors: ['#00a28a', '#346cb0', '#f7c46c', '#b76ba3'],
      animation: false,
      doughnutHoleSize: 60,
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

    setTimeout(function() {
      var canvas = document.getElementById(id);
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = Looper.skin === 'dark' ? '#ffffff' : '#555555';
      ctx.font = "30px Arial";

      var width = canvas.width / 2.1
      var height = canvas.height / 2
      ctx.fillText("75.25", width, height+20);
      ctx.font = "15px Arial";
      ctx.fillText("Average Score", width + 5, height - 12);
    }, 3500);
  }

}

const dashboardPage = new DashboardPage();
