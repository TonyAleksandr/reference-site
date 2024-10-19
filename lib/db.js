// lib/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const databasePromise = open({
    filename: path.join(process.cwd(), 'main.db'),
    driver: sqlite3.Database
});

export const getDb = async () => {
    return await databasePromise;
};

export const initDatabase = async () => {
    const db = getDb();

    await db.exec(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        email TEXT,
        password TEXT,
        name TEXT,
        lastName TEXT
    )`);

};

export const getUsers = async () => {
    const db = await getDb();
    const users = await db.all("SELECT * FROM Users");
    return users;
};
