const { connectDB } = require('../config');

async function getRecipes(req, res) {
    try {
        const db = await connectDB();

        const recipes = await db.collection('recipes').find().toArray();

        res.render('recipe', { recipes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getRecipes };
