DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS forms CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE users(
	user_id SERIAL,
	user_name TEXT NOT NULL,
	user_email TEXT NOT NULL,
	user_password TEXT NOT NULL,
	user_is_admin BOOL DEFAULT FALSE,
	PRIMARY KEY(user_id)
);
	

CREATE TABLE forms(
	form_id SERIAL,
	admin_id INT NOT NULL,
	form_is_not_sent_yet BOOL DEFAULT true,
	PRIMARY KEY(form_id),
	FOREIGN KEY (admin_id)
	REFERENCES users(user_id)
);


CREATE TABLE questions(
	form_id INT NOT NULL,
	question_id SERIAL,
	question_title TEXT,
	PRIMARY KEY(question_id),
	FOREIGN KEY (form_id)
	REFERENCES forms(form_id)
);


CREATE TABLE answers(
	answer_id SERIAL,
	question_id INT NOT NULL,
	answer_text TEXT,
	PRIMARY KEY(answer_id),
	FOREIGN KEY (question_id)
	REFERENCES questions(question_id)
);

INSERT INTO users (user_name, user_email, user_password, user_is_admin)
VALUES ('Admin', 'admin@admin.com', 'dnuOQa1GQMjo2g9/JbRVFjRoxLeRgD+YYtMFuHFhzlP3dLcQ', true);