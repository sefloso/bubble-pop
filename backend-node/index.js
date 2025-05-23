// setup
const express = require('express');
const app = express();
app.use(express.json());


app.get('/api/health', (req, res) => {
    res.json({status: "ok", message: "bubblepop backend running!"});
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
