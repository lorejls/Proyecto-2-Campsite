console.log(team)

const divEquipos= document.getElementById("logos-equipos")

function createTeams(equipo){
    
    for (let i = 0; i < equipo.length; i++) {
        let linkE = document.createElement("a")
        linkE.setAttribute("href", equipo[i].website )
        // linkE.href = equipo[i].website
        linkE.target = "_blank"
        

        let boxE = document.createElement("div")
        // boxE.classList.add("col")
        boxE.classList.add("fila2")


        let imgE = document.createElement("img")
        imgE.setAttribute("src", equipo[i].crest)
        imgE.classList.add("imgL")


        boxE.append(imgE)
        linkE.append(boxE)
        divEquipos.append(linkE)
    }
}


createTeams(team.teams)

// const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
// const yourUrl =
//   "https://api.football-data.org/v4/matches";

// fetch(corsAnywhere + yourUrl, {
//   method: "GET",
//   headers: new Headers({
//     "X-Auth-Token": "059e535324dc40b6ad400487fc71dc33",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.matches)
//     crearEquipo(data.matches)
//   })
//   .catch((err) => console.log(err));


//   function crearEquipo(pepito){
//    const divPartido = document.getElementById("box1")
//    for (let i = 0; i < pepito.length; i++) {
    
//     let boxP = document.createElement("div")
//     boxP.classList.add("bg-primary", "mb-2")

//     let equipos = document.createElement("p")
//     equipos.innerHTML = pepito[i].homeTeam.name + "-" + pepito[i].awayTeam.name

//     let fecha = new Date(pepito[i].utcDate)
//     fecha.toLocaleString()

//     boxP.append(equipos)
//     boxP.append(fecha)
//     divPartido.append(boxP)
    
//    }
//   }