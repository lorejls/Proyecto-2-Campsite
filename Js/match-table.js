
let matchesTable = matchesData.matches;

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

        let fullTimeScore = document.createElement("p");
        fullTimeScore.innerHTML =
            results[i].score.fullTime.homeTeam +
            " - " +
            results[i].score.fullTime.awayTeam;
        console.log(fullTimeScore);
        fullTimeScore.classList.add("texto-score");

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

// let inputFiltro = document.getElementById("partidos");
let buscar = document.getElementById("buscar-partido");
// let radioButtons = document.querySelector("input[type=radio]:checked");

// let partidosFiltrar = matchesTable.filter(partido => partido.status == "FINISHED")
// console.log(partidosFiltrar)

buscar.addEventListener("click", () => {
    filtrar(matchesTable);
});

function filtrar(equipoFiltrarNuevo) {
    let inputFiltro = document.getElementById("partidos");
    let radioButtons = document.querySelector("input[type=radio]:checked");
    let equiposFiltrar = equipoFiltrarNuevo.filter((partido) => {
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
            return false;
        }
    });

    console.log(equiposFiltrar);
    matchesTableBuilder(equiposFiltrar);

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
                resultadoRadioButton.status !== "FINISHED" &&
                radioButtons.value === "ProximosPartidos"
            ) {
                return true;
            }
        })
    // console.log(radioButtons.value)
    console.log(radioButtonsFiltro);
    matchesTableBuilder(radioButtonsFiltro);
}
// radioButtons.addEventListener('click', () => {

// })