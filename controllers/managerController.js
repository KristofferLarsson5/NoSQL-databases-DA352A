const { connectDB } = require('../config');
const { ObjectId } = require('mongodb');
async function getAllData(req, res) {
    try {
        const db = await connectDB();

        const managers = await db.collection('managers').find().toArray();
        const employees = await db.collection('employees').find().toArray();
        const customers = await db.collection('customers').find().toArray();
        const recipes = await db.collection('recipes').find().toArray();

        res.render('manager', { managers, employees, customers, recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function addEmployee(req, res) {
    try {
        const db = await connectDB();
        const { name, contactDetails } = req.body;

        await db.collection('employees').insertOne({ name, contactDetails });

        res.redirect('/manager');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function addCustomer(req, res) {
    try {
        const db = await connectDB();
        const { name, contactDetails, favorites } = req.body;
        const favoriteRecipes = favorites.split(',').map(id => id.trim());
        const favoriteRecipesObjectIds = favoriteRecipes.map(id => new ObjectId(id));
        await db.collection('customers').insertOne({
            name,
            contactDetails,
            favorites: favoriteRecipesObjectIds
        });
        res.redirect('/manager');
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
            createdBy: "Manager"
        });

        res.redirect('/manager');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function removeEmployee(req, res) {
    try {
        const { employeeId } = req.body;
        console.log('Employee ID:', employeeId);

        const db = await connectDB();
        await db.collection('employees').deleteOne({ _id: new ObjectId(employeeId) }); 

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

        res.redirect('/manager');
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

        res.redirect('/manager');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { getAllData, addEmployee,removeEmployee, addCustomer, removeCustomer, addRecipe, removeRecipe };
