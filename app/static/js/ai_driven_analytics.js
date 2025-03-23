class AiDrivenAnalyticsPage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      var dataTable = _this.realTimeTrafficAndDemandDataInTable();

      // Graph Section
      _this.predictiveSmartChargingScheduling();
      _this.batteryLevelsBeforeAndAfterAiScheduledChargingChart();
      _this.aiPoweredChargingForecastGraphArea('ai_powered_charging_forecast_graph_area');

      _this.predictedVehicleDemandOverNextSixHoursGraph('predicted_vehicle_demand_over_next_six_hours_graph');
      _this.fleetDowntimeInsuranceAutomationPieChartDisplay('fleet_downtime_insurance_automation_pie_chart');

      _this.componentHealthStatusBarGraph('component_health_status_bar_graph');
      _this.predictedFailureOverTimeGraphMake("predicted_failure_over_time_graph");
    });
  }

  realTimeTrafficAndDemandDataInTable() {
    return $('#real_time_traffic_and_demand_data_show_table').DataTable({
      dom: "<'text-muted'Bi>\n        <'table-responsive'tr>\n        <'mt-4'p>",
      buttons: [],
      language: {
        paginate: {
          previous: '<i class="fa fa-lg fa-angle-left"></i>',
          next: '<i class="fa fa-lg fa-angle-right"></i>'
        }
      },
      autoWidth: false,
      ajax: 'static/data/ai_driven_analytics/real_time_traffic_and_demand_data.json',
      deferRender: true,
      order: [1, 'asc'],
      columns: [{
        data: 'id',
        className: 'col-checker align-middle',
      }, {
        data: 'current_location',
        className: 'align-middle'
      }, {
        data: 'assigned_location',
        className: 'align-middle'
      }, {
        data: 'demand_level',
        className: 'align-middle'
      }, {
        data: 'traffic_condition',
        className: 'align-middle'
      }, {
        data: 'weather_condition',
        className: 'align-middle'
      }, {
        data: 'dispatch_time',
        className: 'align-middle text-right',
        orderable: false,
        searchable: false
      }, {
        data: 'eta',
        className: 'align-middle text-right',
        orderable: false,
        searchable: false
      }],
      columnDefs: [ {
        targets: 0,
        render: function render(data, type, row, meta) {
          return "<a href=\"vehicle_show#id/".concat(row.id, "\" class=\"tile tile-img mr-1\">\n            <img class=\"img-fluid\" src=\"https://anl.sg/31/isuzu-24ft-truck-lorries-open-canopy-box.jpg\" alt=\"Card image cap\">\n          </a>\n          <a href=\"vehicle_show#id/").concat(row.id, "\">").concat(row.vehicle_name, "</a>");
        }
      }]
    });
  }

  predictiveSmartChargingScheduling(){
    var yValues1 = [36, 28, 23, 24, 15, 27, 37, 33];  // First dataset
    var yValues2 = [20, 23, 19, 17, 11, 19, 26, 23];  // Second dataset

    // Create a new chart with two datasets
    new Chart("predictive_smart_charging_scheduling_chart", {
      type: "bar",
      data: {
        labels: ["12AM", "3AM", "6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],

        datasets: [{
          label: "Hybrid's",
          backgroundColor: "#ea6759",
          data: yValues1
        }, {
          label: "EV's",
          backgroundColor: "#00a28a",
          data: yValues2
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Predictive Smart Charging Scheduling In Graph"
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

  batteryLevelsBeforeAndAfterAiScheduledChargingChart(){
    var yValues1 = [16, 28, 23, 24, 33];  // First dataset
    var yValues2 = [20, 23, 19, 17, 20];  // Second dataset

    // Create a new chart with two datasets
    new Chart("battery_levels_before_and_after_ai_scheduled_charging_chart", {
      type: "bar",
      data: {
        labels: ["BMW", "Audi", "Toyota", "Lexus", "Honda"],

        datasets: [{
          label: "Predicted After Trip",
          backgroundColor: "#379900",
          data: yValues1
        }, {
          label: "Current Battery",
          backgroundColor: "#ea6759",
          data: yValues2
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "Battery Levels Before & After AI-Scheduled Charging"
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

  aiPoweredChargingForecastGraphArea(id) {
    var hoursAndDistanceData = [
      [new Date('2025-03-13').getTime(), 20], [new Date('2025-03-14').getTime(), 400], [new Date('2025-03-15').getTime(), 550], [new Date('2025-03-16').getTime(), 200]
    ];

    var dataset = [{
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
        axisLabel: 'Date',
        axisLabelUseCanvas: true,
        axisLabelFontFamily: 'inherit, sans-serif',
        axisLabelColour: Looper.getMutedColor(),
        tickFormatter: function (value, axis) {
          var date = new Date(value);
          var day = date.getDate();
          var month = date.getMonth() + 1; // months are 0-based
          return day + '/' + (month < 10 ? '0' + month : month);
        }
      },
      yaxis: {
        axisLabel: 'Energy Demand (Kwh)',
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

  predictedVehicleDemandOverNextSixHoursGraph(id) {
    var data = {
      labels: ['12PM', '2PM', '4PM', '5PM', '6PM'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').green,
        borderColor: Looper.getColors('brand').green,
        data: [5, 4, 9, 7, 4]
      }]
    };

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

  fleetDowntimeInsuranceAutomationPieChartDisplay(id){
    var obj = {
      values: [32.17, 28.30, 39.53],
      colors: ["#00a28a", "#b76ba3", "#f7c46c"],
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

  componentHealthStatusBarGraph(id){
    var data = {
      labels: ["Engine Oil", "Battery", "Break Pads", "Tire Pressure"],
      datasets: [{
        backgroundColor: Looper.getColors('brand').green,
        borderColor: Looper.getColors('brand').green,
        data: [267, 355, 478, 322]
      }]
    };

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

  predictedFailureOverTimeGraphMake(id) {
    var cost = [];
    var days = ["Battery", "Engine Oil", "Break Pads", "Tire Pressure"];

    var weeklyCost = [14, 9, 2, 8];

    for (var i = 0; i < days.length; i++) {
      cost.push([i, weeklyCost[i]]);
    }

    var dataset = [{
      data: cost,
      color: Looper.colors.brand.purple
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
        ticks: days.map((day, index) => [index, day]),
        tickLength: 0,
        axisLabel: 'Component' // Label for the x-axis
      },
      yaxis: {
        min: 0,
        max: 15,
        axisLabel: 'Days Until Predicted Failure' // Label for the x-axis
      }
    };

    options = $.extend(true, {}, Looper.flotDefaultOptions(), options);
    $(`#${id}`).plot(dataset, options);
  }
}

const aiDrivenAnalyticsPage = new AiDrivenAnalyticsPage();
