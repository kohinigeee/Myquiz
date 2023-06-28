create table logininfo (
    nameid varchar(255) primary key,
    hashpass varchar(255),
    accountid int unique
);

create table account (
    id serial primary key,
    name varchar(255) 
);


-- quiztypeの設定
create table quiztype (
    type_id serial primary key,
    type_name VARCHAR (128) NOT NULL UNIQUE
);

insert into quiztype(type_name) values ('一問一答');
insert into quiztype(type_name) values ('四択問題');
insert into quiztype(type_name) values ('画像付き一問一答');
insert into quiztype(type_name) values ('画像付き四択問題');

--quizgenreの設定
create table quizgenre (
    genre_id SERIAL PRIMARY KEY,
    genre_name VARCHAR(128) NOT NULL UNIQUE
);

insert into quizgenre(genre_name) values ('自然科学');
insert into quizgenre(genre_name) values ('文学・語学・哲学');
insert into quizgenre(genre_name) values ('歴史・地理・社会');
insert into quizgenre(genre_name) values ('音楽');
insert into quizgenre(genre_name) values ('スポーツ');
insert into quizgenre(genre_name) values ('芸能');
insert into quizgenre(genre_name) values ('サブカルチャー');
insert into quizgenre(genre_name) values ('ライフスタイル');
insert into quizgenre(genre_name) values ('ノンジャンル');


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