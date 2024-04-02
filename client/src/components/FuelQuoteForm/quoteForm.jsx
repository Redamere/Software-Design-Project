import React from 'react';
import './quoteForm.css';

// const router = require("./routes/QuoteForm")
import {useEffect, useState} from 'react'

//components
import formDetails from './formDetails';
//import QuoteForm from "./components/FuelQuoteForm/quoteForm"

//documentation


const QuoteForm = () => {

const [quoteForms, setQuoteForms] = useState(null)

useEffect(() => {

    const fetchQuoteForm = async () => {
        const response = await fetch("/api/quoteForm")
        const json = await response.json()

        if (response.ok){
            setQuoteForms(json)
        }
    }
    fetchQuoteForm()
}, [])

    return (
        <div>
        <meta charSet="UTF-8" />
        <h1 id="title">Fuel Quote Form</h1>
        {/*Must have  --
    Gallons requested (numeric, required)
    Delivery Address (Non-editable, comes from client profile)
    Delivery Date (Calendar, Date Picker)
    Suggested Price/gallon (numberic non-editable, price will be calculated 
        by pricing module -- We are not building this yet (2/17/2024))
    -Total Amount Due (numeric non-editable, calculated [gallons * price])
*/} 
        <div className="testDetails">
            <p>Test details</p>
            {quoteForms && quoteForms.map((thisQuoteForm) => (
              <p key={thisQuoteForm._id}>{thisQuoteForm.FormAddress}</p>
            ))}
        </div>

        <form id="myForm">
          <div className="grid-containerE">
            <div className="grid-itemB">
              <label htmlFor="gallonsRequested">Gallons Requested:</label>
              <input type="text" id="gallonsRequested" name="gallonsRequested" placeholder="How many gallons?" required/>
              <p>How many gallons are you requesting?</p>
              <p/>
              <button name="gallonsRequested" value="gallonsRequested" type="submit">Submit</button>
            </div>
            <div className="grid-itemB">
              <label htmlFor="deliveryDate">Delivery Date:</label>
              <input type="date" id="deliveryDate" name="deliveryDate" />
              <p>What delivery date would you expect?</p>
              <form action method="post"><button name="dateSubmit" value="dateSubmit" type="submit">Submit</button></form>
            </div>
          </div></form>
        <div className="grid-containerD">
          <div className="grid-itemB">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <input type="text" name="deliveryAddress" id="deliveryAddress" placeholder="Your delivery address" readOnly />
            <p>This is the delivery Address where your product will be delivered. (Address is default based on customer profile)</p>
            <form action method="get"><button name="deliveryAddress" value="deliveryAddress" type="submit">Get My Address</button></form>
          </div>
          <div className="grid-itemB">
            <label htmlFor="suggestedPrice">Suggested Price</label>
            <input type="text" name="suggestedPrice" id="suggestedPrice" placeholder="Your suggested price" readOnly  /> 
            <p>This is the suggested price per gallon of your product, automatically calculated</p>
            <form action method="get"><button name="getPrice" value="getPrice" type="submit">Calculate Suggested Price</button></form>
          </div>
          <div className="grid-itemB">
            {/* <h2 style="text-align: left;">Total Amount Due</h2> */}
            <label htmlFor="totalAmountDue">Total Amount Due</label>
            <input type="text" name="totalAmountDue" id="totalAmountDue" placeholder="Your total amount due" readOnly value ="$400" />
            <p>Total calculated amount due based on price and amount of gallons</p>
            <form action method="get"><button name="getTotalAmount" value="getTotalAmount" type="submit">Calculated Total Ammunt Due</button></form>
          </div>
        </div>
      </div>
    ); }


export default QuoteForm;
