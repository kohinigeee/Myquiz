create table logininfo (
    nameid varchar(255) primary key,
    hashpass varchar(255),
    accountid int unique
);

create table account (
    id serial primary key,
    name varchar(255) 
);


-- quiztype�̐ݒ�
create table quiztype (
    type_id serial primary key,
    type_name VARCHAR (128) NOT NULL UNIQUE
);

insert into quiztype(type_name) values ('���ꓚ');
insert into quiztype(type_name) values ('�l����');
insert into quiztype(type_name) values ('�摜�t�����ꓚ');
insert into quiztype(type_name) values ('�摜�t���l����');

--quizgenre�̐ݒ�
create table quizgenre (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(128) NOT NULL UNIQUE
);

insert into quizgenre(genre_name) values ('���R�Ȋw');
insert into quizgenre(genre_name) values ('���w�E��w�E�N�w');
insert into quizgenre(genre_name) values ('���j�E�n���E�Љ�');
insert into quizgenre(genre_name) values ('���y');
insert into quizgenre(genre_name) values ('�X�|�[�c');
insert into quizgenre(genre_name) values ('�|�\');
insert into quizgenre(genre_name) values ('�T�u�J���`���[');
insert into quizgenre(genre_name) values ('���C�t�X�^�C��');
insert into quizgenre(genre_name) values ('�m���W������');


create table simplequiz ( 
    id serial primary key,
    problem text,
    answer varchar(255),
    commentary TEXT,
    author_id integer references account(id),
    type_id INT,
    genre_id INT,
    updated_time TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (type_id) REFERENCES quiztype(type_id),
    FOREIGN KEY (genre_id) REFERENCES quizgenre(genre_id)
);