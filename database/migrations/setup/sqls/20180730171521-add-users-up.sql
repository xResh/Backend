/* Replace with your SQL commands */
CREATE TABLE users (
	id int(11) NOT NULL AUTO_INCREMENT, 
	first_name varchar(255), 
	last_name varchar(255), 
	created_at datetime default CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY(id)
);