


function renderChart(data, labels) {
  var ctx = document.getElementById("myChart").getContext('2d');
  console.log(data,labels);

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'data',
              data: data,
          }]
      },
  });
}


  d3.csv('./data.csv')
  .then(data => {
    console.log(data.map((e) => (Object.values(e)[3])));

      var dataPrices = data.map((e) => (Object.values(e)[3]).replace('.','').replace(',','.'))
      var labels = data.map((e) => (Object.values(e)[0]))
      // var labels = data.map((e,i) => (i))
      console.log(dataPrices,labels);

  renderChart(dataPrices.reverse(),labels.reverse())
  })

