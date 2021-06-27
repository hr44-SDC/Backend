DROP DATABASE IF EXISTS ratings_and_reviews;
CREATE DATABASE ratings_and_reviews;

USE ratings_and_reviews;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  helpfulness INT NOT NULL,
  date DATE NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  reccomended BINARY NOT NULL,
  reported BINARY NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

CREATE TABLE reviews_photos (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  photo_url TEXT NOT NULL,
  PRIMARY KEY (id)
  -- FOREIGN KEY (review_id)
  --   REFERENCES reviews(id)
  --   ON DELETE CASCADE
);

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