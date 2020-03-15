-- NOT CURRENT

-- selects gins, their distillers and their ratings based located in CA
SELECT gin_name, distiller, rating
FROM gins
WHERE state_located = 'CA';

-- selects all information on gins with a rating of 4 or more
SELECT * 
FROM gins
WHERE rating >= 4;

-- selects information on gin names, distiller and websites from gins and distillers tables
SELECT gins.gin_name, gins.distiller, distillers.website
FROM gins, distillers
WHERE gins.distiller = distillers.distiller_name;

-- selects coctails recommending the use of gin with id of 1
SELECT cocktails.cocktail_name, gins.gin_name
FROM cocktails, gins
WHERE gins.id = cocktails.use_gin
AND gins.id = 1;

-- WEEK 4 PRACTICE
SELECT UPPER(g.gin_name) AS gn, LOWER(c.cocktail_name) AS cn, gc.gin_id AS id
FROM gins g
JOIN gins_cocktails gc
ON g.id = gc.gin_id
JOIN cocktails c
ON gc.cocktail_id = c.id
ORDER BY gn, cn;

COPY
(
  SELECT *
FROM gins
)
TO STDOUT
WITH CSV HEADER;
