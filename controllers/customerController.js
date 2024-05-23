const { connectDB } = require('../config');
const { ObjectId } = require('mongodb');

async function getData(req, res) {
    try {
        const { customerId } = req.query; 
        const db = await connectDB();

        const customer = await db.collection('customers').findOne({ _id: new ObjectId(customerId) });
        const recipes = await db.collection('recipes').find().toArray();

        res.render('customer', { customer, recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function addComment(req, res) {
    try {
        const { customerId, recipeId, comment } = req.body;  // Access customerId from req.body
        console.log(`Customer ID: ${customerId}`); // Log customerId to verify

        const db = await connectDB();
        if (!ObjectId.isValid(customerId) || !ObjectId.isValid(recipeId)) {
            console.log("RECIPE ID", recipeId);
            console.log("CUSTOMER ID", customerId);
            return res.status(400).json({ error: 'Invalid customer or recipe ID' });
        }

        await db.collection('recipes').updateOne(
            { _id: new ObjectId(recipeId) },
            { $push: { comments: { body: comment, date: new Date(), customer: new ObjectId(customerId) } } }
        );

        res.redirect(`/customer?customerId=${customerId}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getData, addComment };
