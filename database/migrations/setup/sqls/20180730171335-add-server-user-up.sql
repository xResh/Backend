/* Replace with your SQL commands */
CREATE TABLE server_user (
	id int(11) NOT NULL AUTO_INCREMENT, 
	server_id int(11), 
	user_id int(11), 
	role varchar(255), 
	joined_at DATETIME default CURRENT_TIMESTAMP NOT NULL, 
	PRIMARY KEY(id)
);