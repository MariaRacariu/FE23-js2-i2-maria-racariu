import fs from 'fs/promises';

async function readDataBase() {
    const db = await fs.readFile('./tasksdb.json');
    return JSON.parse(db);
}

async function getTasks() {
    const db = await readDatabase();
    return db;
}

export { getTasks };