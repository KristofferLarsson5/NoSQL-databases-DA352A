const { connectDB } = require('../config');
const { ObjectId } = require('mongodb');

async function getData(req, res) {
    try {
        const db = await connectDB();

        const employees = await db.collection('employees').find().toArray();
        const customers = await db.collection('customers').find().toArray();
        const recipes = await db.collection('recipes').find().toArray();

        res.render('employee', { employees, customers, recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addCustomer(req, res) {
    try {
        const db = await connectDB();
        const { name, contactDetails } = req.body;

        await db.collection('customers').insertOne({ name, contactDetails });

        res.redirect('/employee');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addRecipe(req, res) {
    try {
        const db = await connectDB();
        const { name, instructions, origin, dietaryRestrictions, createdBy } = req.body;
        const dietaryRestrictionsArray = dietaryRestrictions.split(',').map(str => str.trim());

        
        await db.collection('recipes').insertOne({
            name,
            instructions,
            origin,
            dietaryRestrictions: dietaryRestrictionsArray,
            createdBy: new ObjectId(createdBy) 
        });

        res.redirect('/manager');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeCustomer(req, res) {
    try {
        const db = await connectDB();
        const { customerId } = req.body;

        await db.collection('customers').deleteOne({_id: new ObjectId(customerId )});

        res.redirect('/employee');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function removeRecipe(req, res) {
    try {
        const { recipeId } = req.body;
        console.log('Recipe ID:', recipeId);

        const db = await connectDB();
        await db.collection('recipes').deleteOne({ _id: new ObjectId(recipeId) });

        res.redirect('/employee');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getData, addCustomer,removeCustomer, addRecipe,removeRecipe };
