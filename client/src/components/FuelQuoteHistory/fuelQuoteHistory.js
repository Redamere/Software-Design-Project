import React from 'react';
import './fuelQuoteHistory.css'



const History = () => {
    return (
        <div>
            <table class="table">
                <caption>
                    <h1>Fuel Quote History</h1>
                </caption>
                <tr>
                    <th>Gallons Requested</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Suggested Price / gallon</th>
                    <th>Total Amount Due</th>
                </tr>
                <tr>
                    <td>100</td>
                    <td>123 Main St, Houston, TX</td>
                    <td>2024-02-20</td>
                    <td>2.5</td>
                    <td>250</td>
                </tr>
                <tr>
                    <td>200</td>
                    <td>456 Elm St, Dallas, TX</td>
                    <td>2024-02-15</td>
                    <td>2.4</td>
                    <td>480</td>
                </tr>
                <tr>
                    <td>150</td>
                    <td>789 Pine St, Austin, TX</td>
                    <td>2024-02-10</td>
                    <td>2.6</td>
                    <td>390</td>
                </tr>
            </table>
        </div>
    );
};





/*
//Assuming you have an array of objects that store the fuel quote data
var fuelQuotes = [
    {
        gallonsRequested: 100,
        deliveryAddress: "123 Main St, Houston, TX",
        deliveryDate: "2024-02-20",
        suggestedPrice: 2.5,
        totalAmount: 250
    },
    {
        gallonsRequested: 200,
        deliveryAddress: "456 Elm St, Dallas, TX",
        deliveryDate: "2024-02-15",
        suggestedPrice: 2.4,
        totalAmount: 480
    },
    {
        gallonsRequested: 150,
        deliveryAddress: "789 Pine St, Austin, TX",
        deliveryDate: "2024-02-10",
        suggestedPrice: 2.6,
        totalAmount: 390
    }
];

//Create a table element and append it to the document body
var table = document.createElement("table");
document.body.appendChild(table);

//Create a table header row and append it to the table
var headerRow = document.createElement("tr");
table.appendChild(headerRow);

//Create an array of header names
var headers = ["Gallons Requested", "Delivery Address", "Delivery Date", "Suggested Price / gallon", "Total Amount Due"];

//Loop through the headers array and create a table header cell for each one
for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement("th");
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
}

//Loop through the fuelQuotes array and create a table data row for each one
for (var i = 0; i < fuelQuotes.length; i++) {
    var dataRow = document.createElement("tr");
    table.appendChild(dataRow);

    //Loop through the properties of each fuel quote object and create a table data cell for each one
    for (var prop in fuelQuotes[i]) {
        var dataCell = document.createElement("td");
        dataCell.textContent = fuelQuotes[i][prop];
        dataRow.appendChild(dataCell);
    }
}
*/

// to be able to style the table
/*
fuelQuotes.classList.add("fuelQuotes");
table.classList.add("table");
headerRow.classList.add("headerRow");
headers.classList.add("headers");
dataRow.classList.add("dataRow");
dataCell.classList.add("dataCell");

*/

export default History;
