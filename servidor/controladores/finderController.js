var conn = require('../lib/conexionbd');

//devolvemos todas las peliculas
function retriveAllMovies(req, res) {
    var totalRows;
    var titulo = req.query.titulo;
    var anio = req.query.anio;
    var genero = req.query.genero;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;
    var columna_orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    var sqlSelect = "select peli.id ,titulo,duracion,director,anio,fecha_lanzamiento,puntuacion,poster,trama, genero_id from pelicula peli, genero gen ";
    var sqlWhere = " where peli.genero_id = gen.id ";
    var sqlTotal = "select count(*) as total from pelicula peli,genero gen ";

    if (titulo) {
        sqlWhere = sqlWhere + "and peli.titulo like concat(\'" + titulo + "\', \'%\')";
    }
    if (!esUndefined(genero)) {
        sqlWhere = sqlWhere + "and peli.genero_id =" + genero;
    }
    if (!esUndefined(anio)) {
        sqlWhere = sqlWhere + " and peli.anio =" + anio;
    }
    sqlTotal = sqlTotal + sqlWhere;
    conn.query(sqlTotal, function (errTotal, resultTotal, fieldsTotal) {
        if (errTotal) {
            console.log("error obteniendo total de peliculas", errTotal.message);
            return res.status(404).send("Uhps, hubo un problema al buscar las peliculas");
        }
        totalRows = resultTotal[0].total;
        console.log("total rows: " + totalRows);
    });
    // totalRows = obtainTotalRows(sqlWhere);
    //agregamos la condicion en la query para ordenar de acuerdo al criterio indicado
    sqlWhere = sqlWhere + " order by " + columna_orden + " " + tipo_orden;
    //agregamos la limitación de pelis x páginas 
    var numeroPagina = calcularFilas(pagina,cantidad);  
    if(numeroPagina ===52){
        sqlWhere = sqlWhere + " limit " + numeroPagina ;
    }else{
        sqlWhere = sqlWhere + " limit " + numeroPagina + ", " + cantidad;
    }
   
    console.log(" WHERE : " + sqlWhere);
    //defino la query final para obtener las peliculas a consultar
    sqlSelect = sqlSelect + sqlWhere;
     console.log(" SELECT: " + sqlSelect);
    conn.query(sqlSelect, function (errAllMoive, resultAllMoive, fieldsAllMoive) {
        if (errAllMoive) {
            console.log("error consultando la tabla pelicula", errAllMoive.message);
            return res.status(404).send("Uhps, hubo un problema al buscar las peliculas");
        }
        var responseMovies = {
            'peliculas': resultAllMoive,
            'total': totalRows
        };
        res.send(JSON.stringify(responseMovies));
    });
};

//funcion que calcula la cantidad de filas a mostrar segun la pagina recibida
function calcularFilas(pagina,cantidad){
    var numPagina = 0;
    var paginaActual=Number(pagina);
    if(paginaActual === 1){
        console.log("es uno");
       return numPagina = Number(cantidad);
    }else{
        //var totalPaginas = Math.ceil(totalFilas/cant);
        var i=1;
        while(i < paginaActual ){
            numPagina = 1 + ( Number(cantidad) * i);
         i=i+1;
        }
     return  numPagina;
    }
    console.log(" pagina : " + pagina + " numPagina : "+ numPagina +"," + cantidad);
}

//devolvemos todos los generos de peliculas
function retriveAllGender(req, res) {
    var sqlSelect = "select id, nombre from genero";
    conn.query(sqlSelect, function (errAllGen, resultAllGen, fieldsAllGen) {
        if (errAllGen) {
            console.log("error consultando la tabla genero", errAllGen.message);
            return res.status(404).send("Uhps,hubo un problema al buscar los generos de peliculas");
        }
        var responseGen = {
            'generos': resultAllGen
        };
        res.send(JSON.stringify(responseGen));
    });
};

//Buscar pelicula por id
function retriveMovieById(req, res) {
    var id = req.params.id;
    console.log("id:" + id);
    var sqlSelect ="select peli.id ,titulo,duracion,director,anio,fecha_lanzamiento,puntuacion, poster,trama, gen.nombre as genero,act.nombre ";
    var sqlFrom = "from genero gen inner join pelicula peli on gen.id =peli.genero_id inner join actor_pelicula actpe on actpe.pelicula_id =peli.id inner join actor act on actpe.actor_id=act.id ";
    var sqlWhere = "where peli.id = " + id;
    sqlSelect = sqlSelect + sqlFrom + sqlWhere;
    console.log("query by id: " + sqlSelect);
    conn.query(sqlSelect, function (errMovieById, resultMovieById, fieldsMovieById) {
        if (errMovieById) {
            console.log("error consultado pelicula por id " + errMovieById.message);
            return res.status(404).send("Uhps,hubo un problema al buscar la pelicula que seleccionaste");
        } 
        if (resultMovieById.length == 0) {
            console.log("No se encontró la pelicula con id: "+ id);
            return res.status(404).send("No se encontró más información para la película seleccionada");
        }else{
            var responseMovieById = {
                'genero': resultMovieById[0].genero, //esta info se repite asi que la tomo del primer registro
                'pelicula': resultMovieById[0],
                'actores': resultMovieById //asi me devuelve el array con los actores
            };
            res.send(JSON.stringify(responseMovieById));
        }
        
        
    });
}; 

//armamos la query para obtener el total
/* function obtainTotalRows(sqlWhere) {
    var sqlTotal = "select count(*) as total from pelicula peli,genero gen ";
    var total;
    sqlTotal = sqlTotal + sqlWhere;
    console.log("sqlTotal" + sqlTotal);
    conn.query(sqlTotal, function (errTotal, resultTotal, fieldsTotal) {
        if (errTotal) {
            console.log("error obteniendo total de peliculas", errTotal.message);
            return res.status(404).send("Uhps, hubo un problema al buscar las peliculas");
        }
        total = resultTotal[0].total;
        console.log("total rows: " + total);
    });
    return total;
}; */

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
    retriveAllGender: retriveAllGender,
    retriveMovieById: retriveMovieById
};