CREATE TABLE gins (
    id serial,
    gin_name varchar(50),
    distiller_id integer,
    state_located char(2),
    rating integer,
    created_on timestamp,
    updated_on timestamp
);

CREATE TABLE distillers (
    id serial,
    distiller_name varchar(50),
    website varchar(30),
    phone integer,
    tours boolean
);

CREATE TABLE gins_distillers (
    gin_id integer,
    distiller_id integer
);

CREATE TABLE users (
    id serial,
    first_name varchar(30),
    email_address varchar(50),
    created_on timestamp
);