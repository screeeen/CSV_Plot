function renderChart(riders) {
  var ctx = document.getElementById("Ages").getContext("2d");
  var ctx2 = document.getElementById("Countries").getContext("2d");
  var ctx3 = document.getElementById("Sport").getContext("2d");
  var ctx4 = document.getElementById("SportMod").getContext("2d");

  var currentYear = new Date().getFullYear();
  var ages = riders.map((rider) => currentYear - rider.age);
  var country = riders
    // .filter((rider) => rider.country !== "Spain")
    .map((rider) => rider.country);
  var sport = riders.map((rider) => rider.sport);

  var sportMod = sport.map((sport) => {
    if (
      sport === "WCS Men + WCS Miniramp" ||
      sport === "WCS Women + WCS Miniramp" ||
      sport === "WCS Miniramp"
    ) {
      return "WCS Miniramp";
    } else {
      return sport;
    }
  });

  ages.sort((a, b) => a - b);

  const freqMapAges = ages.reduce(
    (map, year) => map.set(year, (map.get(year) || 0) + 1),
    new Map()
  );

  const freqMapCountry = country.reduce(
    (map, country) => map.set(country, (map.get(country) || 0) + 1),
    new Map()
  );

  const freqMapSport = sport.reduce(
    (map, sport) => map.set(sport, (map.get(sport) || 0) + 1),
    new Map()
  );

  const freqMapSportMod = sportMod.reduce(
    (map, sportMod) => map.set(sportMod, (map.get(sportMod) || 0) + 1),
    new Map()
  );

  const xAxisArrAges = Array.from(freqMapAges.keys()); // array of unique years
  const yAxisArrAges = Array.from(freqMapAges.values()); // array of frequencies for each year
  xAxisArrAges.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrAges.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const xAxisArrCountry = Array.from(freqMapCountry.keys()); // array of unique years
  const yAxisArrCountry = Array.from(freqMapCountry.values()); // array of frequencies for each year
  xAxisArrCountry.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrCountry.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const xAxisArrSport = Array.from(freqMapSport.keys()); // array of unique years
  const yAxisArrSport = Array.from(freqMapSport.values()); // array of frequencies for each year
  console.log(freqMapSport.keys());
  console.log(freqMapSport["WCS Men"]);
  console.log(freqMapSport.keys()[1]);



  xAxisArrSport.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrSport.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const xAxisArrSportMod = Array.from(freqMapSportMod.keys()); // array of unique years
  const yAxisArrSportMod = Array.from(freqMapSportMod.values()); // array of frequencies for each year
  // xAxisArrSportMod.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  // yAxisArrSportMod.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  var Ages = new Chart(ctx, {
    type: "radar",
    data: {
      labels: xAxisArrAges,
      datasets: [
        {
          label: "ages",
          data: yAxisArrAges,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Distribution of Ages",
      },
    },
  });

  var Countries = new Chart(ctx2, {
    type: "radar",
    data: {
      labels: xAxisArrCountry,
      datasets: [
        {
          label: "countries",
          data: yAxisArrCountry,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Geographic Distribution",
      },
        scales: {
            r: {
                max: 12,
                min: 1,
                ticks: {
                    stepSize: 1
                }
            }
        }
    },
  });

  var Sports = new Chart(ctx3, {
    type: "radar",
    data: {
      labels: xAxisArrSport,
      datasets: [
        {
          label: "contest",
          data: yAxisArrSport,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Contest registered",
      },
    },
  });

  var SportsDistro = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: xAxisArrSportMod,
      datasets: [
        {
          label: "contest Distro",
          data: yAxisArrSportMod,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Contest Distro",
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              min: 0,
              // max: 20,
            },
          },
        ],
      },
    },
  });
}

/* set up XMLHttpRequest */
var url = "./data/skate_28_July.xls";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function (e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {
    type: "binary",
  });

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  var data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  var riders = data
    .map((e) => [
      {
        age: parseInt(e.born_date.toString().slice(6)),
        country: e.origin,
        sport: e.category,
      },
    ])
    .flat(1);

  console.log("riders", riders);
  renderChart(riders);
};

oReq.send();
