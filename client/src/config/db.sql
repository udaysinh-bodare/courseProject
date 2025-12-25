set sql_safe_updates = 0;
show databases;


use sunbeam_db;

create table users (
  email varchar(30) primary key,
  password varchar(200) ,
  role enum ('admin','student')
);

create table students(
   reg_no int auto_increment primary key,
   name varchar(20) ,
   email varchar(20),
   course_id int,
   mobile_no int,
   profile_pic blob,
   constraint fk2 foreign key (course_id) references courses(course_id) on update cascade on delete cascade,
   constraint fk3 foreign key (email) references users(email) on update cascade on delete cascade
);

alter table students
modify column mobile_no varchar(10);

drop table students;

create table courses(
  course_id int  primary key auto_increment,
  course_name varchar(20),
  description varchar(40),
  fees int,
  start_date date,
  end_date date,
  video_expire_days int
);

drop table courses;

alter table courses
modify column course_id int  auto_increment;

create table videos(
  video_id int primary key auto_increment,
  course_id int,
  title varchar(20),
  description varchar(40),
  youtube_url varchar(20),
  added_at date,
  constraint fk1 foreign key (course_id) references courses(course_id) on update cascade on delete cascade
);

alter table videos modify column description varchar(200);
alter table videos modify column youtube_url varchar(200);
alter table videos modify column title varchar(200);
drop table videos;


drop database sunbeam_db;
drop table videos;

delete from users where email = "mattay@gmail.com";

show tables;
select * from courses;
select * from videos;
select * from users;
select * from students;
desc videos;
delete from courses;
