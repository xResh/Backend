/* Replace with your SQL commands */
CREATE TABLE auth_tokens (
	token varchar(255) NOT NULL, 
	user_id int(11) NOT NULL, 
	expired tinyint(1)
);