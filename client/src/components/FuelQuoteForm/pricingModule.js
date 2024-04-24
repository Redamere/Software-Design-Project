//Pricing Module

// Current price per gallon = $1.50
// Margin = Current Price * (Location Factor - Rate History + Gallons Requested Factor + Company Profit Factor)

// Location Factor = 2% for Texas, 4% for out of state
// Rate History factor = 1% if client requested fuel before, 0% if no history (You can query fule quote table to check if there are any rows for the client)
// Gallons requested factor = 2% if more than 1000 gallons, 3% if less 
// company profit factor = 10% always

// Ex: 1500 gallons requested in state, does not have hsitory (quote history data does not exist)
// Margin = (0.2 -0.1 + 0.2 + .1) * 1.50 = 1.95
// Suggested Price/gallon => 1.50 + .195 = $1.695
// Total amount due = 1500 * 1.695 = 2542.50

let getPrice = (userGallons, ifTexas, ifHistory) => {
    let returnPrice, margin, locationFactor, rateHistoryFactor, gallonsRequestedFactor;
    const suggestedPrice = 1.50;
    const companyFactor = .1;
    if (ifTexas) {
        locationFactor = .02;
    }
    else {
        locationFactor = .04;
    }

    if (ifHistory){
        rateHistoryFactor = .01;
    }
    else {
        rateHistoryFactor = 0;
    }
    
    if (userGallons > 1000){
        gallonsRequestedFactor = .02;
    }
    else {
        gallonsRequestedFactor = .03;
    }

        margin = (locationFactor + rateHistoryFactor + gallonsRequestedFactor + companyFactor) + suggestedPrice;
        returnPrice + userGallons * suggestedPrice;

    return returnPrice;
}

export default PricingModule