CREATE DATABASE calendarDB;

USE calendarDB;

CREATE TABLE tbl_holiday(
h_dateName	VARCHAR(50)	NOT NULL,	
h_isHoliday	VARCHAR(50)	NOT NULL,	
h_locdate	INT	NOT NULL	PRIMARY KEY,
h_seq	INT		
);