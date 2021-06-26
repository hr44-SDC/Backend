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
  feature VARCHAR (50),
  featureValue VARCHAR (100),
  productId INT UNIQUE NOT NULL,
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT EXISTS styleAndPrice (
  id SERIAL PRIMARY KEY,
  styleId INT UNIQUE NOT NULL,
  styleName VARCHAR(50),
  originalPrice INT,
  salePrice INT,
  defaultStyle BOOLEAN NOT NULL,
  productId INT UNIQUE NOT NULL,
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  mainUrl VARCHAR (200),
  thumbnailUrl VARCHAR (200),
  styleId INT UNIQUE NOT NULL,
  productId INT UNIQUE NOT NULL,
  FOREIGN KEY (styleId)
    REFERENCES styleAndPrice (styleId),
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT EXISTS sizeAndQuantity (
  id SERIAL PRIMARY KEY,
  quantity INT,
  size VARCHAR(15),
  productId INT UNIQUE NOT NULL,
  styleId INT UNIQUE NOT NULL,
  FOREIGN KEY (styleId)
    REFERENCES styleAndPrice (styleId),
  FOREIGN KEY (productId)
    REFERENCES products (productId)
);

CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  userSession INT NOT NULL,
  active BOOLEAN NOT NULL,
  productId INT UNIQUE NOT NULL,
  FOREIGN KEY (productId)
    REFERENCES products (productId)
)