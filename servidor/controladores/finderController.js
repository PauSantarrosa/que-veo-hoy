var conn = require('../lib/conexionbd');

//devolvemos todas las peliculas
function retriveAllMovies(req, res) {
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var genero = req.query.genero;
    var sqlSelect = "select peli.id as 'peliculaId',titulo,duracion,director,anio,fecha_lanzamiento,puntuacion,poster,trama, genero_id from pelicula peli, genero gen where peli.genero_id = gen.id ";
    if (titulo) {
        sqlSelect = sqlSelect + "and peli.titulo like concat(\'" + titulo + "\', \'%\')";
    }

    if (!esUndefined(genero)) {
        sqlSelect = sqlSelect + "and peli.genero_id =" + genero;

    }
    if (!esUndefined(anio)) {
        sqlSelect = sqlSelect + " and peli.anio =" + anio;
    }
console.log(sqlSelect);
    conn.query(sqlSelect, function (error, resultado, fields) {
        if (error) {
            console.log("error consultando la tabla pelicula", error.message);
            return res.status(404).send("Uhps, hubo un problema al buscar las peliculas");
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    });
}

//devolvemos todos los generos de peliculas
function retriveAllGender(req, res) {
    var sqlSelect = "select id, nombre from genero";
    conn.query(sqlSelect, function (error, resultado, fields) {
        if (error) {
            console.log("error consultando la tabla genero", error.message);
            return res.status(404).send("Uhps,hubo un problema al buscar los generos de peliculas");
        }
        var response = {
            'generos': resultado
        };
        res.send(JSON.stringify(response));
    });
}

//funcion que valida que los datos ingresados no sean nulos o undefined.Devuelve true si lo son false si no
function esUndefined(dato) {
    if ((typeof dato === "undefined") || (isNaN(dato))) {
        //si es undefined , no numerico o  null 
        return true;
    } else {
        return false;
    }
}
module.exports = {
    retriveAllMovies: retriveAllMovies,
    retriveAllGender: retriveAllGender
};