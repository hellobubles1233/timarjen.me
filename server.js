const express = require('express');
const app = express();
const port = 3000;

// ... existing code ...

app.get('/api/content', async (req, res) => {
    try {
        // Replace with your database query logic
        const data = await database.query('SELECT * FROM content');
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// ... existing code ...

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});