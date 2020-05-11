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
  PRIMARY KEY (`id`)
);

-- creacion de la tabla
CREATE TABLE  genero  (
   id  int NOT NULL AUTO_INCREMENT,
   nombre  varchar(30) DEFAULT NULL,
   PRIMARY KEY (`id`)
);

-- alter tabla peliculas no decia nada la guía pero lo dejo por las dudas
/*
ALTER TABLE  peliculas.pelicula  
ADD COLUMN genero_id  int NULL AFTER  trama ,
 PRIMARY KEY (`id`),
  FOREIGN KEY ( `genero_id` )
  REFERENCES  peliculas.genero (`id` );
*/

-- creacion de la tabla actor
CREATE TABLE  actor  (
   id  int NOT NULL AUTO_INCREMENT,
   nombre  varchar(70) DEFAULT NULL,
  PRIMARY KEY ( `id` )
);

-- creacion de la tabla actor_pelicula
CREATE TABLE  actor_pelicula  (
	id  int NOT NULL AUTO_INCREMENT,
   actor_id  int NOT NULL,
   pelicula_id int NOT NULL,
   PRIMARY KEY (`id`),
  FOREIGN KEY (`actor_id`) REFERENCES `peliculas`.`actor` (`id`),
  FOREIGN KEY (`pelicula_id`) REFERENCES `peliculas`.`pelicula` (`id`)
);
