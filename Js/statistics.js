// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos:

// 1. Crear array vacía (será array de objetos)


// 2. Iterar por todos los partidos
// 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido, si no el null 
// de los goles lo romperá todo.

// 4. Buscar en la array estadísticas el objeto con el mismo id que el homeTeam del partido y guardarlo en una variable

// 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// Rellenar cada key con el valor correspondiente

// 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// Rellenar cada key con el valor correspondiente

// 6. Si existe, actualizar los goles y los partidos

// 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam

let matchesTable = matchesData.matches;
let arrayEstadisticas = []

function estadisticas(datosInic) {


    for (i = 0; i < datosInic.length; i++) {
        if (datosInic[i].status === "SCHEDULED") {
            continue
        }



        let equVisitanteEncontrado

        let idHomeTeam = datosInic[i].homeTeam.id
        let homeTeam = datosInic[i].homeTeam.name
        let goalsHome = datosInic[i].score.fullTime.homeTeam
        let idAwayTeam = datosInic[i].awayTeam.id
        let awayTeam = datosInic[i].awayTeam.name
        let goalsAway = datosInic[i].score.fullTime.awayTeam

        let equLocalEncontrado
        for (j = 0; j < arrayEstadisticas.length; j++) {

            if (arrayEstadisticas[j].id === idHomeTeam) {
                equLocalEncontrado = arrayEstadisticas[j]
            }
        }
        if (equLocalEncontrado === undefined) {
            arrayEstadisticas.push({
                id: idHomeTeam,
                name: homeTeam,
                goals: goalsHome,
                matches: 1
            })
        } else {
            equLocalEncontrado.matches++
            equLocalEncontrado.goals += goalsHome
        }

        for (m = 0; m < arrayEstadisticas.length; m++) {

            if (arrayEstadisticas[m].id === idAwayTeam) {
                equVisitanteEncontrado = arrayEstadisticas[m]
            }
        }
        if (equVisitanteEncontrado === undefined) {
            arrayEstadisticas.push({
                id: idAwayTeam,
                name: awayTeam,
                goals: goalsAway,
                matches: 1
            })
        } else {
            equVisitanteEncontrado.matches++
            equVisitanteEncontrado.goals += goalsAway
        }
    }
    console.log(arrayEstadisticas)

}

estadisticas(matchesTable)



// 8. Una vez fuera del loop de partidos, iterar por el array estadisticas

// 9. Añadir la key avg a cada objeto, con el valor goals/matches

// 10. Hacer console.log() para ver que todo está correcto.