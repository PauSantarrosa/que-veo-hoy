-- creacion de la tabla pelicula
CREATE TABLE  pelicula  (
   id  int NOT NULL AUTO_INCREMENT,
   titulo  varchar(100) NOT NULL,
   duracion  int DEFAULT NULL,
   director  varchar(400) DEFAULT NULL,
   anio  int DEFAULT NULL,
   fecha_lanzamiento  date DEFAULT NULL,
   puntuacion  int DEFAULT NULL,
   poster  varchar(300) DEFAULT NULL,
   trama  varchar(700) DEFAULT NULL,
  PRIMARY KEY ( id ),
  KEY  peli_pk  ( id )
);

-- creacion de la tabla
CREATE TABLE  genero  (
   id  int NOT NULL AUTO_INCREMENT,
   nombre  varchar(30) DEFAULT NULL,
  PRIMARY KEY ( id ),
  KEY  id_pk  ( id )
);

-- alter tabla peliculas no decia nada la guía pero lo dejo por las dudas
/*
ALTER TABLE  peliculas.pelicula  
ADD COLUMN genero_id  int NULL AFTER  trama ,
ADD INDEX  fk_peli_genero_idx  ( genero_id  ASC) VISIBLE;

ALTER TABLE  peliculas.pelicula  
ADD CONSTRAINT  fk_peli_genero 
  FOREIGN KEY ( genero_id )
  REFERENCES  peliculas.genero ( id );
*/
