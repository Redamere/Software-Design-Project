const History = require('../models/quoteHistoryModels')

// post table row
const createQuote = async (req, res) => {
    const { gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalAmount } = req.body
    try {
        const history = await History.create({ gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalAmount })
        response.status(200).json(history)
    } catch (error) {
        res.status(400).json({ error: error.json })
    }
}




// get table row