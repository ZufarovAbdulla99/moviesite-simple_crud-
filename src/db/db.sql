CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.5
);

INSERT INTO movies
(name, year, rating)
VALUES
('Abdullajon', 1995, 4.7),
('Shum bola', 1992, 4.6),
('Titanik', 1996, 4.8)