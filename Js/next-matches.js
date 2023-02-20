console.log(team)

const divEquipos= document.getElementById("equipos-escudos")

function createTeams(equipo){
    
    for (let i = 0; i < equipo.length; i++) {
        let linkE = document.createElement("a")
        linkE.setAttribute("href", equipo[i].website )
        // linkE.href = equipo[i].website
        linkE.target = "_blank"
        

        let boxE = document.createElement("div")
        // boxE.classList.add("col")
        // boxE.classList.add("fila2")


        let imgE = document.createElement("img")
        imgE.setAttribute("src", equipo[i].crest)
        imgE.classList.add("imgL")


        boxE.append(imgE)
        linkE.append(boxE)
        divEquipos.append(linkE)
    }
}


createTeams(team.teams)