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

// 8. Una vez fuera del loop de partidos, iterar por el array estadisticas

// 9. Añadir la key avg a cada objeto, con el valor goals/matches

// 10. Hacer console.log() para ver que todo está correcto.

let matchesTable = matchesData.matches;
let arrayEstadisticas = []
let arrayEstadisticas2 = []
let arrayEstadisticas3= []

let nuevoArray= []
let nuevoArray2= []
let nuevoArray3= []

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

    for( p=0; p<arrayEstadisticas.length; p++ ){
        let media = (arrayEstadisticas[p].goals / arrayEstadisticas[p].matches).toFixed(2)
        arrayEstadisticas[p].avg = media
}

arrayEstadisticas.sort((a,b)=>b.avg-a.avg)
nuevoArray= arrayEstadisticas.slice(0,5)
console.log(nuevoArray)

}
estadisticas(matchesTable)


function statisticsTableBuilder(results) {
    let table = document.getElementById("statistics-body");
    for (i = 0; i < results.length; i++) {
        let tr = document.createElement("tr");

        let teamEnsign = document.createElement("img");
        teamEnsign.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].id + ".svg"
        );
        teamEnsign.classList.add("images-Ensign");
        console.log(teamEnsign);

        let teamName = document.createElement("p");
        teamName.innerHTML = results[i].name;
        console.log(teamName);


        let goalsTotal = document.createElement("p");
        goalsTotal.innerHTML = results[i].goals;
        console.log(goalsTotal);

        let matchesPlayed = document.createElement("p");
        matchesPlayed.innerHTML = results[i].matches;
        console.log(matchesPlayed);

        let average = document.createElement("p");
        average.innerHTML = results[i].avg;
        console.log(average);

        let finalResults = [
            teamEnsign,teamName,goalsTotal,matchesPlayed,average];
        for (j = 0; j < finalResults.length; j++) {
            const td = document.createElement("td");
            td.append(finalResults[j]);
            tr.append(td);
        }
        table.append(tr);
    }
}
statisticsTableBuilder(nuevoArray)


function estadisticasVisitante(datosInic) {

    let arrayEstadisticas2 = []
    for (i = 0; i < datosInic.length; i++) {
        if (datosInic[i].status === "SCHEDULED") {
            continue
        }

        let equVisitanteEncontrado2

        let idAwayTeam = datosInic[i].awayTeam.id
        let awayTeam = datosInic[i].awayTeam.name
        let goalsAway = datosInic[i].score.fullTime.awayTeam

        for (m = 0; m < arrayEstadisticas2.length; m++) {

            if (arrayEstadisticas2[m].id === idAwayTeam) {
                equVisitanteEncontrado2 = arrayEstadisticas2[m]
            }
        }
        if (equVisitanteEncontrado2 === undefined) {
            equVisitanteEncontrado2 = {
                id: idAwayTeam,
                name: awayTeam,
                goals: goalsAway,
                matches: 1
            }
            arrayEstadisticas2.push(equVisitanteEncontrado2)
        } else {
            equVisitanteEncontrado2.matches++
            equVisitanteEncontrado2.goals += goalsAway
        }
    }
    console.log(arrayEstadisticas2)

    for( p=0; p<arrayEstadisticas2.length; p++ ){
        let media = (arrayEstadisticas2[p].goals / arrayEstadisticas2[p].matches).toFixed(2)
        arrayEstadisticas2[p].avg = media
}

arrayEstadisticas2.sort((a,b)=>a.goals-b.goals)
nuevoArray2= arrayEstadisticas2.slice(0,5)
console.log(nuevoArray2)

}
estadisticasVisitante(matchesTable)

function visitorTableBuilder(results) {
    let table = document.getElementById("visitor-body");
    for (i = 0; i < results.length; i++) {
        let tr = document.createElement("tr");

        let teamEnsign2 = document.createElement("img");
        teamEnsign2.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].id + ".svg"
        );
        teamEnsign2.classList.add("images-Ensign");
        console.log(teamEnsign2);

        let teamName2 = document.createElement("p");
        teamName2.innerHTML = results[i].name;
        console.log(teamName2);


        let goalsTotal2 = document.createElement("p");
        goalsTotal2.innerHTML = results[i].goals;
        console.log(goalsTotal2);

        let matchesPlayed2 = document.createElement("p");
        matchesPlayed2.innerHTML = results[i].matches;
        console.log(matchesPlayed2);

        let average2 = document.createElement("p");
        average2.innerHTML = results[i].avg;
        console.log(average2);

        let finalResults = [
            teamEnsign2,teamName2,goalsTotal2,matchesPlayed2,average2];
        for (j = 0; j < finalResults.length; j++) {
            const td = document.createElement("td");
            td.append(finalResults[j]);
            tr.append(td);
        }
        table.append(tr);
    }
}
visitorTableBuilder(nuevoArray2)


function estadisticas3(datosInic) {

    let arrayEstadisticas3 = []
    for (i = 0; i < datosInic.length; i++) {
        if (datosInic[i].status === "SCHEDULED") {
            continue
        }

        let equVisitanteEncontrado2

        let idAwayTeam = datosInic[i].awayTeam.id
        let awayTeam = datosInic[i].awayTeam.name
        let goalsHome = datosInic[i].score.fullTime.homeTeam

        for (m = 0; m < arrayEstadisticas3.length; m++) {

            if (arrayEstadisticas3[m].id === idAwayTeam) {
                equVisitanteEncontrado2 = arrayEstadisticas3[m]
            }
        }
        if (equVisitanteEncontrado2 === undefined) {
            equVisitanteEncontrado2 = {
                id: idAwayTeam,
                name: awayTeam,
                goals: goalsHome,
                matches: 1
            }
            arrayEstadisticas3.push(equVisitanteEncontrado2)
        } else {
            equVisitanteEncontrado2.matches++
            equVisitanteEncontrado2.goals += goalsHome
        }
    }
    console.log(arrayEstadisticas3)


arrayEstadisticas3.sort((a,b)=>a.goals-b.goals)
nuevoArray3= arrayEstadisticas3.slice(0,5)
console.log(nuevoArray3)

}
estadisticas3(matchesTable)

function nuevoTableBuilder(results) {
    let table = document.getElementById("nuevo-body");
    for (i = 0; i < results.length; i++) {
        let tr = document.createElement("tr");

        let teamEnsign3 = document.createElement("img");
        teamEnsign3.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].id + ".svg"
        );
        teamEnsign3.classList.add("images-Ensign");
        console.log(teamEnsign3);

        let teamName3 = document.createElement("p");
        teamName3.innerHTML = results[i].name;
        console.log(teamName3);


        let goalsTotal3 = document.createElement("p");
        goalsTotal3.innerHTML = results[i].goals;
        console.log(goalsTotal3);

        let matchesPlayed3 = document.createElement("p");
        matchesPlayed3.innerHTML = results[i].matches;
        console.log(matchesPlayed3);



        let finalResults = [
            teamEnsign3,teamName3,goalsTotal3,matchesPlayed3];
        for (j = 0; j < finalResults.length; j++) {
            const td = document.createElement("td");
            td.append(finalResults[j]);
            tr.append(td);
        }
        table.append(tr);
    }
}
nuevoTableBuilder(nuevoArray3)