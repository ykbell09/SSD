INSERT INTO distillers 
    (id, distiller_name)
    VALUES
    (1001, 'The Spirit Guild'),
    (1002, 'Amass'),
    (1003, 'Golden State Distillery');

INSERT INTO spirits 
    (id, spirit_name, distiller_id)
VALUES 
    (2001, 'Amass Dry Gin', 1002),
    (2002, 'Amass Botanic Vodka', 1002),
    (2003, 'Grey Whale Gin', 1003),
    (2004, 'Astral Pacific Gin', 1001),
    (2005, 'Vapid Vodka', 1001);