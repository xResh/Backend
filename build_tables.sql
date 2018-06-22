CREATE TABLE users (
	id INTEGER NOT NULL AUTO_INCREMENT,
	first_name varchar(255),
	last_name varchar(255),
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(ID)
);

CREATE TABLE fb_users (
	fb_id varchar(255) NOT NULL,
	user_id INTEGER NOT NULL
);
