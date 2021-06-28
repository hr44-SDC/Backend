USE ratings_and_reviews;
LOAD DATA LOCAL INFILE '/home/scott/Hack_Reactor/backend_new/Backend/db/reviews_photos.csv' INTO TABLE ratings_and_reviews.reviews_photos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, review_id, photo_url);

