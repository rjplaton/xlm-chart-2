//array of currencies
let currencies = [
	{
	name:'Bitcoin',
	abrev: 'btc',
	price: 0,
	},
		{
	name: 'Ethereum',
	abrev: 'eth',
	price: 0,
	},
	{
	name: 'Litecoin',
	abrev: 'ltc',
	price: 0,
	},
		{
	name: 'US Dollar',
	abrev: 'usd',
	price: 0,
	},
];

let btcPrice = currencies[0].price;
let ethPrice = currencies[1].price;
let ltcPrice = currencies[2].price;
let usdPrice = currencies[3].price;

//loop through the corresponding json files per currency
//this will be updated to use an api in the future
function fetchPriceValues() {
	for (let currency of currencies) {
		fetch("./" + currency.abrev + "price.json")
				.then(response => response.json())	
				.then(data => {
				console.log("Got the data!");

				currency.price = data.XLM;
				console.log(currency.price);
				//render function will go here
				});
	}
};

//pseudocode for future checkboxes to add/remove barChart-rows
function createChart() {

	// Fetch the div from the page
    let barChartDiv = document.querySelector('.BarChart');

    // 'empty' the barChartDiv content to ensure we aren't just appending new divs
    barChartDiv.innerHTML = '<h2>How many XLM per...</h2>';

	for (let currency of currencies) {
		//get the values from array of currencies
		let currencyName = currency.name;
		let xlmValue = currency.price;
		let currencyAbrev = currency.abrev;
		let highestPrice = currencies[0].price;
		
		//create a bar div for the currency
		let newRowDiv = document.createElement('div');
		newRowDiv.classList.add('BarChart-row');
		newRowDiv.id = currencyAbrev + 'Row';
		
		let newBarDescDiv = document.createElement('div');
		newBarDescDiv.classList.add('BarChart-rowdesc');
		newBarDescDiv.textContent = '1 ' + currencyName + ' (' + currencyAbrev.toUpperCase() + ')';

		let newBarDiv = document.createElement('div');
		newBarDiv.classList.add('BarChart-bar');
		newBarDiv.classList.add('BarChart-number');
		newBarDiv.id = currencyAbrev + 'Bar';
		newBarDiv.style.width = xlmValue / highestPrice * 100 + '%';
		newBarDiv.onclick = function() { barClick(this.id)};
		newBarDiv.innerHTML = "<p><span>" + currency.price + "</span></p>";


		//add the divs to the page
		barChartDiv.appendChild(newRowDiv);
		newRowDiv.appendChild(newBarDescDiv);
		newRowDiv.appendChild(newBarDiv);

		console.log(currencyName, 'bar created.');
	};
};



function barClick(clickedID) {
	console.log(clickedID)
	if (clickedID === 'btcBar') {
		alert('1 BTC is equal to '+btcPrice+' XLM'+'\n or '+'1 XLM is equal to '+1/btcPrice+' BTC');
	} else if (clickedID === 'ethBar') {
		alert('1 ETH is equal to '+ethPrice+' XLM'+'\n or '+'1 XLM is equal to '+1/ethPrice+' ETH');
	} else if (clickedID === 'ltcBar') {
		alert('1 LTC is equal to '+ltcPrice+' XLM'+'\n or '+'1 XLM is equal to '+1/ltcPrice+' LTC');
	} else if (clickedID === 'usdBar') {
		alert('1 USD is equal to '+usdPrice+' XLM'+'\n or '+'1 XLM is equal to '+1/usdPrice+' USD');
	} 
};

function toggleCurrencyDisplay(clickedID) {
  let currencyRow = document.querySelector('#'+clickedID+'Row');
  if (currencyRow.style.display === "none") {
    currencyRow.style.display = "flex";
  } else {
    currencyRow.style.display = "none";
  }
}



