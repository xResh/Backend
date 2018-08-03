/* Replace with your SQL commands */
CREATE TABLE server (
	id int(11) NOT NULL AUTO_INCREMENT, 
	name varchar(255), 
	code varchar(255) UNIQUE, 
	active tinyint(1), 
	created_at DATETIME default CURRENT_TIMESTAMP NOT NULL, 
	created_by int(11) NOT NULL, 
	PRIMARY KEY(id)
);