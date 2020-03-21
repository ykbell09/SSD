CREATE TABLE distillers
(
    id serial PRIMARY KEY,
    distiller_name VARCHAR(50) UNIQUE NOT NULL,
    added_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spirits
(
    id serial PRIMARY KEY,
    spirit_name VARCHAR(50) NOT NULL,
    distiller_id INTEGER,
    UNIQUE (spirit_name, distiller_id),
    FOREIGN KEY (distiller_id)
     REFERENCES distillers (id)
     ON DELETE CASCADE
     ON UPDATE CASCADE
);

