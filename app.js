const express = require('express');
const app = express();
const path = require('path'); 

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.set('view engine', 'ejs');
app.set('views', './views');



const managerRoutes = require('./routes/managerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use(express.urlencoded())
app.use('/manager', managerRoutes);
app.use('/employee', employeeRoutes);
app.use('/customer', customerRoutes);
app.use('/recipe', recipeRoutes);
app.get('/', (req, res) => {
    res.render('index');
});

const port = 3000;
const host = 'localhost';

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
