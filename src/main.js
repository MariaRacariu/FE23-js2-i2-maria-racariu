import express from "express";
import * as db from "./api/main.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    db.getTasks().then(users => res.json(users))
    console.log(users);
    console.log("Hello");
})