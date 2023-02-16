
let matchesTable = matchesData.matches;
let equiposFiltrar = []
let inputFiltro = document.getElementById("partidos")
let buttons = document.getElementsByName("inlineRadioOptions")
let alerta1 = document.getElementById("alerta1")
let alerta2 = document.getElementById("alerta2")
let alerta3 = document.getElementById("alerta3")

alerta1.style.display="none"
alerta2.style.display="none"
// alerta3.style.display="none"

function matchesTableBuilder(results) {
    let table = document.getElementById("matches-body");
    table.innerHTML = "";
    for (i = 0; i < results.length; i++) {
        let tr = document.createElement("tr");

        let matchDayGame = document.createElement("p");
        matchDayGame.innerHTML = results[i].matchday;
        console.log(matchDayGame);
        matchDayGame.classList.add("texto-score");

        let matchDate = new Date(results[i].utcDate);
        console.log(matchDate);

        let localEnsign = document.createElement("img");
        localEnsign.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].homeTeam.id + ".svg"
        );
        localEnsign.classList.add("images-Ensign");
        console.log(localEnsign);

        let homeTeamName = document.createElement("p");
        homeTeamName.innerHTML = results[i].homeTeam.name;
        console.log(homeTeamName);

        let fullTimeScore = results[i].score.fullTime.homeTeam +
            " - " + results[i].score.fullTime.awayTeam;
        if(fullTimeScore==="null - null"){
            fullTimeScore= "Por jugarse"
        }else{
            fullTimeScore.textContent=results[i].score.fullTime.homeTeam +
            " - " +
            results[i].score.fullTime.awayTeam;
        }

        let awayTeamName = document.createElement("p");
        awayTeamName.innerHTML = results[i].awayTeam.name;
        console.log(awayTeamName);

        let awayEnsign = document.createElement("img");
        awayEnsign.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].awayTeam.id + ".svg"
        );
        awayEnsign.classList.add("images-Ensign");
        console.log(awayEnsign);
        let finalResults = [
            homeTeamName,localEnsign,
            fullTimeScore,awayEnsign,
            awayTeamName,
            matchDate.toLocaleString(),matchDayGame,
        ];
        for (j = 0; j < finalResults.length; j++) {
            const td = document.createElement("td");
            td.append(finalResults[j]);
            tr.append(td);
        }
        table.append(tr);
    }
}

matchesTableBuilder(matchesTable);


let searchBar= document.getElementById("partidos")
searchBar.addEventListener("keyup", () => {
    filtrar(matchesTable);
});

window.addEventListener("load", ()=>{
    let spinner= document.getElementById("spinner")
    spinner.style.display= "none"

    spinner.addEventListener("transitionend", ()=>{
        document.body.removeChild("spinner")
    })
}
)
searchBar.addEventListener("keydown", () => {
    resetKdwn()
    filtrar(matchesTable);
    alerta1.style.display="none"
    alerta2.style.display="none"
});

function filtrar(equipoFiltrarNuevo) {
    equiposFiltrar = equipoFiltrarNuevo.filter((partido) => {
        if (
            partido.homeTeam.name
            .toLowerCase()
            .includes(inputFiltro.value.toLowerCase()) ||
            partido.awayTeam.name
            .toLowerCase()
            .includes(inputFiltro.value.toLowerCase())
        ) {
            return true;
        }else{
            return false
        }
    });
    if(equiposFiltrar.length === 0){
        return alerta1.style.display="block"
    }

    console.log(equiposFiltrar);
    matchesTableBuilder(equiposFiltrar);
}


function filtroBotones(){
    let radioButtons = document.querySelector("input[type=radio]:checked");
    let radioButtonsFiltro = equiposFiltrar.filter((resultadoRadioButton) => {
            if (radioButtons.value === "PartidosGanados") {
                if (
                    (resultadoRadioButton.homeTeam.name
                        .toLowerCase()
                        .includes(inputFiltro.value.toLowerCase()) &&
                        resultadoRadioButton.score.winner === "HOME_TEAM") ||
                    (resultadoRadioButton.awayTeam.name
                        .toLowerCase()
                        .includes(inputFiltro.value.toLowerCase()) &&
                        resultadoRadioButton.score.winner === "AWAY_TEAM")
                ) {
                    return true;
                }
            }
            if (
                resultadoRadioButton.score.winner === "DRAW" &&
                radioButtons.value === "PartidosEmpatados"
            ) {
                return true;
            }
            if (radioButtons.value === "PartidosPerdidos") {
                if (
                    (resultadoRadioButton.homeTeam.name
                        .toLowerCase()
                        .includes(inputFiltro.value.toLowerCase()) &&
                        resultadoRadioButton.score.winner === "AWAY_TEAM") ||
                    (resultadoRadioButton.awayTeam.name
                        .toLowerCase()
                        .includes(inputFiltro.value.toLowerCase()) &&
                        resultadoRadioButton.score.winner === "HOME_TEAM")
                ) {
                    return true;
                }}
                if (
                    resultadoRadioButton.status === "SCHEDULED" &&
                    radioButtons.value === "ProximosPartidos"
                ) {
                    return true;
                }
})

console.log(radioButtonsFiltro);
matchesTableBuilder(radioButtonsFiltro);

if((inputFiltro.value == "" && radioButtons.value == "PartidosGanados") || (inputFiltro.value == "" && radioButtons.value == "PartidosEmpatados") || (inputFiltro.value === "" && radioButtons.value === "PartidosPerdidos") || (inputFiltro.value === "" && radioButtons.value === "ProximosPartidos")){
    alerta2.style.display="block"
    return matchesTableBuilder(matchesTable)
}
if((equiposFiltrar.length == 0 && radioButtons.value == "PartidosGanados") || (equiposFiltrar.length == 0 && radioButtons.value == "PartidosEmpatados") || (equiposFiltrar.length === 0 && radioButtons.value === "PartidosPerdidos") || (equiposFiltrar.length === 0 && radioButtons.value === "ProximosPartidos")){
    return matchesTableBuilder(matchesTable)
}
}

function reset(){
document.getElementById("partidos").value= "";
for (i = 0; i < buttons.length; i++) {
    buttons [i].checked = false
}
}

let botonBorrar = document.getElementById("borrar-busqueda")
botonBorrar.addEventListener('click', ()=>{
    alerta1.style.display="none"
    alerta2.style.display="none"
    reset()
    matchesTableBuilder(matchesTable)
}
)

function resetKdwn (){
    if(inputFiltro.length === 0 || inputFiltro.length === matchesTable.length || inputFiltro.value === ""){
        for (i = 0; i < buttons.length; i++) {
            buttons [i].checked = false
        }
}
}

// function matchdays(games) {
//     let jornada2 = document.getElementById("formGroupExampleInput2").value;
  
//     let arrayJornada = games.filter((partidos) => {
//       if (partidos.matchday === parseInt(jornada2)) {
//         return true;
//       } else {
//         return false;
//       }
//     });
  
//     console.log(arrayJornada);
//     gamesTable(arrayJornada);
  
//     if (arrayJornada == 0) {
//       createAlert3();
//       return gamesTable(partidos);
//     }
//   }