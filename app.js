const express = require('express');
const app = express();
app.use(express.json());

app.listen(5000, () => {
    console.log('Server is running on port 3000');
});
require('./routes/branchesRoutes')(app); 


