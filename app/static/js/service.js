class ServicePage {
  constructor(){
    var _this = this
    $(document).ready(function() {
      _this.maintenancePerformanceCostGraphMake('maintenance_performance_cost_graph');
      _this.costPerformancePieChartMake('cost_performance_pie_chart');

      _this.handleGrapsTooltips();
      _this.maintenanceCostTrendGraph();
      _this.initTable();
    });
  }

  initTable(){
    var table = $('#maintenanceTable').DataTable({
      "paging": true,        // Enable pagination
      "searching": true,     // Enable search functionality
      "ordering": true,      // Enable sorting
      "order": [[0, 'asc']], // Default sorting by Vehicle Name
    });

    // Add event listener for the action filter
    $('#actionFilter').on('change', function() {
      table.column(4).search(this.value).draw();
    });
  }

  maintenancePerformanceCostGraphMake(id){
    // Monthly data for average maintenance and maintenance frequency
    var averageMaintenanceData = [
      [1, 400], [2, 350], [3, 400], [4, 450], [5, 480], [6, 456],
      [7, 276], [8, 289], [9, 334], [10, 510], [11, 480],
      [12, 470]
    ];

    var maintenanceFrequencyData = [
      [1, 270], [2, 220], [3, 310], [4, 220], [5, 370], [6, 324],
      [7, 156], [8, 167], [9, 222], [10, 390], [11, 362],
      [12, 350]
    ];

    // Month names for x-axis
    var monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    // Convert data to percentage values (scaled between 0 and 100)
    var percentageData = function(data) {
      var maxValue = Math.max(...data.map(item => item[1]));  // Get max value to scale to percentage
      return data.map(item => [item[0], (item[1] / maxValue) * 90]);
    };

    var averageMaintenancePercentage = percentageData(averageMaintenanceData);
    var maintenanceFrequencyPercentage = percentageData(maintenanceFrequencyData);

    var dataset = [{
      label: 'Average Maintenance',
      data: averageMaintenancePercentage,
      color: Looper.colors.brand.blue
    },{
      label: 'Maintenance Frequency',
      data: maintenanceFrequencyPercentage,
      color: Looper.colors.brand.red
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
        axisLabel: 'Month',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelPadding: 10,
        axisLabelFontFamily: 'inherit, sans-serif',
        axisLabelColour: Looper.getMutedColor(),
        ticks: monthNames.map((name, index) => [index + 1, name]),  // Map month names to the x-axis ticks
      },
      yaxis: {
        axisLabel: 'Percentage (%)',
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelPadding: 3,
        axisLabelFontFamily: 'inherit, sans-serif',
        axisLabelColour: Looper.getMutedColor(),
        tickFormatter: function tickFormatter(v, axis) {
          return v.toFixed(2) + '%';  // Format as percentage
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

  costPerformancePieChartMake(id){
    var obj5 = {
      values: [15, 50, 20, 66, 30, 45, 22,26],
      colors: ['#4CAF50', '#00BCD4', '#E91E63', '#FFC107', '#9E9E9E', '#11CBD4', '#2F9C9E', '#BB2312'],
      animation: false,
      doughnutHoleSize: 60,
      doughnutHoleColor: '#fff',
      offset: 5,
      doughnutHoleColor: Looper.skin === 'dark' ? Looper.getColors('gray')[200] : '#fff'
    };
    generatePieGraph(id, obj5);

    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = Looper.skin === 'dark' ? '#ffffff' : '#555555';
    ctx.font = "30px Arial";

    var width = canvas.width / 3.4
    var height = canvas.height / 2
    ctx.fillText("$450k", width, height);
    ctx.font = "15px Arial";
    ctx.fillText("Total Cost", width + 5, height + 22);
  }

  handleGrapsTooltips() {
    // line and bar ev_usage_graph_area weekly_idl_cost_graph
    $('<div id="flot-tooltip" class="flot-tooltip"></div>').appendTo('body');
    $(document).on('plothover', '#maintenance_performance_cost_graph', function (event, pos, item) {
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

  maintenanceCostTrendGraph(label_x, label_y) {
    var data = {
      labels: ['Dec 2024', 'Jan 2025', 'Feb 2025', 'March 2025', 'April 2025', 'May 2025'],
      datasets: [{
        backgroundColor: Looper.getColors('brand').indigo,
        borderColor: Looper.getColors('brand').indigo,
        data: [4200, 4800, 5250, 4950, 5100, 5500]
      }]
    };

    var canvas = $(`#maintenance_cost_trend_graph`)[0].getContext('2d');
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
              maxTicksLimit: 10
            },
            scaleLabel: {
              display: true,
              labelString: 'Months' // Label for the x-axis
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 500,
              callback: function(value) {
                return '$' + value.toLocaleString(); // Add "$" sign and format
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Cost' // Label for the y-axis
            }
          }]
        }
      }
    });
  }
}

const servicePage = new ServicePage();
