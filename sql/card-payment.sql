CREATE TABLE payment_card(
	user			integer			NOT NULL FOREIGN KEY(user_id) ,
	card_name		varchar(255)	NOT NULL,
	card_number		integer			NOT NULL,
	exp_date		date 			NOT NULL,
	sn				smallint		NOT NULL,
	REFERENCES users(user_id)
);