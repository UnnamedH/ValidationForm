create database sessionStorage;
use sessionStorage;
create table sessions
(
  sessionId nvarchar(450) not null primary key
);
select * from sessions;
drop database sessionStorage;