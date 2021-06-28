DROP DATABASE IF EXISTS ratings_and_reviews;
CREATE DATABASE ratings_and_reviews;

USE ratings_and_reviews;

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommended TEXT NOT NULL,
  reported TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT NULL,
  helpfulness INT NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE reviews_photos (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics_reviews (
  id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (id)
);

LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/reviews_photos.csv' INTO TABLE ratings_and_reviews.reviews_photos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, review_id, photo_url);
LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/reviews.csv' INTO TABLE ratings_and_reviews.reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, rating, date, summary, body, recommended, reported, reviewer_name, reviewer_email, response, helpfulness);
LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/characteristic_reviews.csv' INTO TABLE ratings_and_reviews.characteristics_reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, characteristic_id, review_id, value);
LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/characteristics.csv' INTO TABLE ratings_and_reviews.characteristics FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, name);


--  FOREIGN KEY (product_id)
--     REFERENCES products(id)
--     ON DELETE CASCADE

  -- FOREIGN KEY (review_id)
  --   REFERENCES reviews(id)
  --   ON DELETE CASCADE

-- LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/reviews_photos.csv' INTO TABLE ratings_and_reviews.reviews_photos
-- FIELDS TERMINATED BY ','
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n';

-- LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/reviews_photos.csv' INTO TABLE ratings_and_reviews.reviews_photos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' (id, review_id, photo_url);
-- mysql --local-infile=1 -u root -p < schema.sql


-- CREATE TABLE ratings (


-- )

-- CREATE TABLE ratings_characteristics (

-- )