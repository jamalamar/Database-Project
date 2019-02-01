CREATE TABLE items(
	item_id			integer			NOT NULL,
	name			varchar(255)	NOT NULL,
	publish_date	date 			NOT NULL,
	price			integer			NOT NULL,
	PRIMARY KEY(item_id)
);