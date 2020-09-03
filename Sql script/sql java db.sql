CREATE DATABASE store;
use store;
create table users(
        id integer auto_increment primary key,
	    username varchar(30),
		password varchar(88)
);
select * from users;
drop database store;