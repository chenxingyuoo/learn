$(function () {
  function random_numbers() {
    for (var a = [],i = 0; i < 300; ++i) a[i] = i;

    var tmp, current, top = a.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = a[current];
      a[current] = a[top];
      a[top] = tmp;
    }
    return a;
  }
  
  Highcharts.setOptions({
    colors: ['#f47961', '#60be7b', '#4b5d69', '#9fdbea']
  });

  $('#areaChart').highcharts({
    chart: {
      type: 'areaspline',
      zoomType: 'x'
    },
    title: { text: null },
    legend: { enabled: false },

    xAxis: {
      type: 'datetime',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      min: 0.5,
      max: 11,
      plotLines: [{
        color: 'red',
        dashStyle: 'solid',
        value: '3',
        width: '1'
      }]
    },

    yAxis: {
      title: {
        text: null
      }
    },

    tooltip: {
      shared: true
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      areaspline: {
        fillOpacity: 0.8
      },
      series: {
        marker: { enabled: false },
        lineWidth: 0
      }
    },

    series: [{
      name: 'Failing',
      data: random_numbers()
    }, {
      name: 'Unknown',
      data: random_numbers()
    }, {
      name: 'Passing',
      data: random_numbers()
    }]
  });
});