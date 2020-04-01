var conn = require('../lib/conexionbd');

//devolvemos todas las peliculas
function retriveAllMovies(req,res){
    var sqlSelect= "select id, titulo,duracion,director,anio,fecha_lanzamiento,puntuacion,poster,trama FROM  pelicula";
    conn.query(sqlSelect,function(error, resultado, fields){
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

module.exports = {
    retriveAllMovies: retriveAllMovies
};