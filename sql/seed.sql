INSERT INTO gins
    (id, gin_name, distiller_id, state_located, rating, created_on, updated_on)
VALUES
    (1, 'Gray Whale', 1, 'CA', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Amass Dry Gin', 2, 'CA', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Greenhouse Artisan Gin', 3, 'TX', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Astral Pacific Gin', 4, 'CA', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO distillers
    (id, distiller_name, website, phone, tours)
VALUES
    (1, 'Golden State Distillery', 'https://www.graywhalegin.com/', null, false),
    (2, 'Amass Spirits', 'https://www.amass.com/', null, false),
    (3, 'Dynasty Spirits', 'http://www.dynastyspirits.com/', null, false),
    (4, 'The Spirit Guild', 'http://www.thespiritguild.com/', 2136431498, true);

INSERT INTO gins_distillers
    (gin_id, distiller_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4);

INSERT INTO users
    (id, first_name, email_address, created_on)
VALUES
    (1, 'Yvette', 'ykbell09@gmail.com', CURRENT_TIMESTAMP),
    (2, 'Patrick', 'patrick@egerbits.com', CURRENT_TIMESTAMP);