require('dotenv').config()
const app = require('./src/app');
const { conn } = require('./src/db.js')
const { PORT } = process.env;


conn.sync({ force: false }).then(() => {
    app.listen(PORT || 3001, () => {
        console.log(`Server is running on port ${PORT || 3001}`);
    });
});
