// setup
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));


app.get('/api/health', (req, res) => {
    res.json({status: "ok", message: "bubblepop backend running!"});
}); 

// get top scores
app.get('/api/scores/top', (req, res) => {
    // dummy data while db is connected
    const topScores = [     
        {player_id:'alec', score:150, date:'2023-03-13'},
        {player_id:'cameron', score:176, date:'2025-10-10'},
        {player_id:'andy', score:130, date:'2024-08-01'}
    ];

    // sends the scores as json
    res.json(topScores);
});

// post scores to dummy db
app.post('/api/scores', (req, res) => {
    const { player, score } = req.body;

    // for now just send to terminal
    console.log("received score:", { player, score });

    res.json({
        message: "Score received and saved (not really)",
        data: { player, score, date: new Date().toISOString() }
    })
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
