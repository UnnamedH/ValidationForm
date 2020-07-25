create database FormDataBase;
use FormDataBase;
create table users(
	id integer auto_increment primary key,
    username varchar(30),
    email varchar(100),
    password varchar(88)
);
select * from users;
drop database FormDataBase;