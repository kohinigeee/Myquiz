create table logininfo (
    nameid varchar(255) primary key,
    hashpass varchar(255),
    accountid int unique
);

create table account (
    id serial primary key,
    name varchar(255) 
);

create table quiz ( 
    id serial primary key,
    problem text,
    answer varchar(255),
    author_id integer references account(id)
);

