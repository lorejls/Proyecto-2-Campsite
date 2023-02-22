// Important information!!
// When cors aren´t working correctly you must:
// Step 1- uncomment the following variable:
let matchesTable = matchesData.matches;
let ligaFrancesa = francesa.matches
let ligaInglesa = premier.matches
// // Step 2- activate the following function:
fetchOnOff(matchesTable)

// Step 3- comment the following call (lines 14-15 and 16):
// getData(
//     "https://api.football-data.org/v2/competitions/2014/matches?season2022"
// );


// getData(
//     "https://api.football-data.org/v2/competitions/2014/matches?season2022"
// );

if (matchesTable === undefined) {
    spinnerOn()
} else {
    spinnerOff()
}

let equiposFiltrar = []
let inputFiltro = document.getElementById("partidos")
let buttons = document.getElementsByName("inlineRadioOptions")
let alerta1 = document.getElementById("alerta1")
let alerta2 = document.getElementById("alerta2")
let alerta3 = document.getElementById("alerta3")
let botFrancesa = document.getElementById("ligue1")
let botInglesa = document.getElementById("premier")
let botSant = document.getElementById("ligaSant")

const urlFranc = "https://api.football-data.org/v2/competitions/2015/matches?season=2022"
const urlIngl = "https://api.football-data.org/v2/competitions/2021/matches?season=2022"
const urlSant = "https://api.football-data.org/v2/competitions/2014/matches?season=2022"



botFrancesa.addEventListener("click", () => {
    // getData(urlFranc) 
    inputFiltro.value = ""
    fetchOnOff(ligaFrancesa)
    console.log(equiposFiltrar)
});
botInglesa.addEventListener("click", () => {
    // getData(urlIngl)
    inputFiltro.value = ""
    fetchOnOff(ligaInglesa)
});
botSant.addEventListener("click", () => {
    // getData(urlSant)
    inputFiltro.value = ""
    fetchOnOff(matchesTable)
});



function getData(url) {
    spinnerOn()
    const cors = "https://cors-anywhere.herokuapp.com/";
    fetch(cors + url, {
            method: "GET",
            headers: new Headers({
                "X-Auth-Token": "c6b8a8b349c042b78cad4fd0f868e49a",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }),
        })
        .then((response) => response.json())
        .then((data) => {

            spinnerOff()

            matchesTableBuilder(data.matches);

            let searchBar = document.getElementById("partidos")
            searchBar.addEventListener("keyup", () => {
                filtrar(data.matches);
            });

            searchBar.addEventListener("keydown", () => {
                alerta1.style.display = "none"
                alerta2.style.display = "none"
                resetKdwn()
                filtrar(data.matches);

            });
            let botonBorrar = document.getElementById("borrar-busqueda")
            botonBorrar.addEventListener('click', () => {
                // alerta1.style.display = "none"
                // alerta2.style.display = "none"
                reset()
                matchesTableBuilder(data.matches)
            })
        })
        .catch((err) => console.log(err));
}

function matchesTableBuilder(results) {
    let table = document.getElementById("matches-body");
    table.innerHTML = "";
    for (i = 0; i < results.length; i++) {
        let tr = document.createElement("tr");

        let matchDayGame = document.createElement("p");
        matchDayGame.innerHTML = results[i].matchday;
        // console.log(matchDayGame);
        matchDayGame.classList.add("texto-score");

        let matchDate = new Date(results[i].utcDate);
        // console.log(matchDate);

        let localEnsign = document.createElement("img");
        localEnsign.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].homeTeam.id + ".svg"
        );
        localEnsign.classList.add("images-Ensign");
        // console.log(localEnsign);

        let homeTeamName = document.createElement("p");
        homeTeamName.innerHTML = results[i].homeTeam.name;
        // console.log(homeTeamName);

        let fullTimeScore = results[i].score.fullTime.homeTeam +
            " - " + results[i].score.fullTime.awayTeam;
        if (fullTimeScore === "null - null") {
            fullTimeScore = "Por jugar"
        } else {
            fullTimeScore.textContent = results[i].score.fullTime.homeTeam +
                " - " +
                results[i].score.fullTime.awayTeam;
        }

        let awayTeamName = document.createElement("p");
        awayTeamName.innerHTML = results[i].awayTeam.name;
        // console.log(awayTeamName);

        let awayEnsign = document.createElement("img");
        awayEnsign.setAttribute(
            "src",
            "https://crests.football-data.org/" + results[i].awayTeam.id + ".svg"
        );
        awayEnsign.classList.add("images-Ensign");
        // console.log(awayEnsign);
        let finalResults = [
            homeTeamName, localEnsign,
            fullTimeScore, awayEnsign,
            awayTeamName,
            matchDate.toLocaleString(), matchDayGame,
        ];
        for (j = 0; j < finalResults.length; j++) {
            const td = document.createElement("td");
            td.append(finalResults[j]);
            tr.append(td);
        }
        table.append(tr);
    }
}

function fetchOnOff(datos) {

    // spinnerOff()
    document.getElementById("spinner").style.display = "none"

    matchesTableBuilder(datos);
    let timeOut
    let searchBar = document.getElementById("partidos")
    searchBar.addEventListener("keyup", () => {
        clearTimeout(timeOut)
        timeOut= setTimeout(filtrar, 400)
    });

    searchBar.addEventListener("keydown", () => {
        alerta1.style.display = "none"
        alerta2.style.display = "none"
        resetKdwn()
        filtrar(datos);

    });
    let botonBorrar = document.getElementById("borrar-busqueda")
    botonBorrar.addEventListener('click', () => {
        alerta1.style.display = "none"
        alerta2.style.display = "none"
        reset()
        matchesTableBuilder(datos)
    })
}


function spinnerOn() {
    document.getElementById("spinner").style.display = "block"
}

function spinnerOff() {
    document.getElementById("spinner").style.display = "none"
}

alerta1.style.display = "none"
alerta2.style.display = "none"
alerta3.style.display = "none"

function filtrar(equipoFiltrarNuevo) {
    console.log(inputFiltro.value)
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
        } else {
            return false
        }
    });
   

    console.log(equiposFiltrar);
    matchesTableBuilder(equiposFiltrar);
    if (equiposFiltrar.length === 0) {
        alerta1.style.display = "block"
        return matchesTableBuilder(equipoFiltrarNuevo)
    }
}

function filtroBotones(datosNuevos) {
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
            }
        }
        if (
            resultadoRadioButton.status === "SCHEDULED" &&
            radioButtons.value === "ProximosPartidos"
        ) {
            return true;
        }
        // This alert is spected to work once there are no more matches left to play on this season. 
        // if(resultadoRadioButton.status === "FINISHED" &&
        // radioButtons.value === "ProximosPartidos"){
        //     return alerta3.style.display = "block"
        // }
    })

    console.log(radioButtonsFiltro);
    matchesTableBuilder(radioButtonsFiltro);

    if ((inputFiltro.value == "" && radioButtons.value == "PartidosGanados") || (inputFiltro.value == "" && radioButtons.value == "PartidosEmpatados") || (inputFiltro.value === "" && radioButtons.value === "PartidosPerdidos") || (inputFiltro.value === "" && radioButtons.value === "ProximosPartidos")) {
        alerta2.style.display = "block"
        return matchesTableBuilder(matchesTable)
    }
    if ((equiposFiltrar.length == 0 && radioButtons.value == "PartidosGanados") || (equiposFiltrar.length == 0 && radioButtons.value == "PartidosEmpatados") || (equiposFiltrar.length === 0 && radioButtons.value === "PartidosPerdidos") || (equiposFiltrar.length === 0 && radioButtons.value === "ProximosPartidos")) {
        return matchesTableBuilder(matchesTable)
    }
}

function reset() {
    document.getElementById("partidos").value = "";
    for (i = 0; i < buttons.length; i++) {
        buttons[i].checked = false
    }
}

function resetKdwn() {
    if (inputFiltro.length === 0 || inputFiltro.length === matchesTable.length || inputFiltro.value === "") {
        for (i = 0; i < buttons.length; i++) {
            buttons[i].checked = false
        }
    }
}