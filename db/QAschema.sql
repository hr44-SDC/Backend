-- DROP DATABASE IF EXISTS QAData

-- CREATE DATABASE QAData

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  question_body VARCHAR (1000) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR (60) NOT NULL,
  asker_email VARCHAR (60) NOT NULL,
  question_reported INT NOT NULL,
  question_helpfulness INT NOT NULL,
)

CREATE TABLE answers (
  answer_id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  answer_body VARCHAR (1000) NOT NULL,
  answer_date BIGINT NOT NULL,
  answerer_name VARCHAR (60) NOT NULL,
  answerer_email VARCHAR (60) NOT NULL,
  answer_reported INT NOT NULL,
  answer_helpfulness INT NOT NULL,
)

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (250) NOT NULL
)

/*
did not use these, ended up importing via pgadmin

/COPY questions FROM '../questions.csv' DELIMITER ',' CSV HEADER;

/COPY answers FROM '../answers.csv' DELIMITER ',' CSV HEADER;

/COPY photos FROM '../answers_photos.csv' DELIMITER ',' CSV HEADER;


creating indexes ---------------------------------------------------

create index product_index on questions(product_id)
create index question_index on answers(question_id)
create index answer_index on photos(answer_id)

creating sequences -------------------------------------------------

CREATE SEQUENCE question_id_sequence
START 3518963
INCREMENT 1
OWNED BY questions.question_id

INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, question_helpfulness, question_reported)
VALUES (nextval('question_id_sequence'), 1000011, 'this is a test question', 1624771227753, 'raerae', 'raerae@gmail.com', 0, 0)

CREATE SEQUENCE answer_id_sequence
START 6879307
INCREMENT 1
OWNED BY answers.answer_id

INSERT INTO answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness)
VALUES (nextval('answer_id_sequence'), 3518964, 'this is a test answer', 1624904792287, 'rae', 'rae@gmail.com', 0, 0 )

CREATE SEQUENCE photo_id_sequence
START 2063760
INCREMENT 1
OWNED BY photos.id

INSERT INTO photos (id, answer_id, url)
VALUES (nextval('photo_id_sequence'), 6879302, 'https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80')

*/
