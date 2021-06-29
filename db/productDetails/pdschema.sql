DROP DATABASE IF EXISTS productdetails;

CREATE DATABASE productdetails;

\c productdetails;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  productId INT UNIQUE NOT NULL,
  name VARCHAR (50) NOT NULL,
  slogan VARCHAR (300),
  description VARCHAR (1000),
  category VARCHAR (50),
  defaultPrice INT
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  productId INT NOT NULL,
  feature VARCHAR (50),
  featureValue VARCHAR (100),
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT  EXISTS styleAndPrice (
  id SERIAL PRIMARY KEY,
  styleId INT UNIQUE NOT NULL,
  productId INT NOT NULL,
  styleName VARCHAR(50),
  salePrice VARCHAR(10),
  originalPrice INT,
  defaultStyle INT,
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  styleId INT UNIQUE NOT NULL,
  mainUrl VARCHAR (200),
  thumbnailUrl VARCHAR (200),
  FOREIGN KEY (styleId)
    REFERENCES styleAndPrice (styleId)
);

CREATE TABLE IF NOT EXISTS sizeAndQuantity (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  size VARCHAR(15),
  quantity INT,
  FOREIGN KEY (styleId)
    REFERENCES styleAndPrice (styleId)
);

CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  userSession INT NOT NULL,
  productId INT NOT NULL,
  active INT,
  FOREIGN KEY (productId)
    REFERENCES products (productId)
)