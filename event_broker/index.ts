import express from 'express';
import axios from 'axios';

import { Dict, EventModel } from './models/event_model';

const app = express();
app.use(express.json());

app.post('/event', async (req, res) => {
    const event: EventModel = req.body;

    console.log(event);
    
    await axios.post('http://localhost:4000/event', event).catch((err) => console.log(err)); // Posts service
    await axios.post('http://localhost:4001/event', event).catch((err) => console.log(err)); 
    await axios.post('http://localhost:4002/event', event).catch((err) => console.log(err));// Comments service

    res.send();
});

app.listen(4005, () => console.log("Event broker is running on port 4005..."));