CREATE TABLE IF NOT EXISTS tasks (
    Id VARCHAR (36) PRIMARY KEY,
    Owner VARCHAR (250) NOT NULL,
    Email VARCHAR (250) NOT NULL,
    Company VARCHAR (250) NOT NULL,
    Date VARCHAR (30) NOT NULL,
    Description varchar NOT NULL,
    Status VARCHAR (10) NOT NULL
);

CREATE TABLE IF NOT EXISTS filemeta (
    Id VARCHAR (36) PRIMARY KEY,
    File VARCHAR (250) NOT NULL,
    Created TIMESTAMP NOT NULL,
    Status VARCHAR (10) NOT NULL
);

CREATE INDEX idx_filemeta_file ON filemeta(File);