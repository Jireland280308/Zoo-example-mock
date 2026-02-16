PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Account (
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    Firstname VARCHAR(25) NOT NULL,
    Email VARCHAR(100) NOT NULL,

    -- Use python bcrypt to hash passwords before they are stored
    Password VARCHAR(100) NOT NULL
);