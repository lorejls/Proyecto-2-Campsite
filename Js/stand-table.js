// let standingsTable = standingsData.standings[0].table


function getData(url) {
  spinnerOn()
    //PASO 1 - declarar URL DE CORS 
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
        console.log(data)
        tableBuilder(data.standings[0].table)


      })
      .catch((err) => console.log(err));
  }
  
  getData(
    "https://api.football-data.org/v2/competitions/2014/standings?season2022"
  );


function tableBuilder(results){
    let table = document.getElementById("table-body")
    for(let i=0; i<results.length; i++){
        let tr = document.createElement("tr")

        let position = document.createElement("p")
        position.innerHTML = results[i].position
        console.log(position)

        let ensign = document.createElement("img")
        ensign.setAttribute("src", results[i].team.crestUrl)
        ensign.classList.add("images-Ensign")
        console.log(ensign)

        let team = document.createElement("p")
        team.innerHTML = results[i].team.name
        console.log(team)

        let matchesplayed = document.createElement("p")
        matchesplayed.innerHTML = results[i].playedGames
        console.log(matchesplayed)

        let won = document.createElement("p")
        won.innerHTML = results[i].won
        console.log(won)

        let draw = document.createElement("p")
        draw.innerHTML = results[i].draw
        console.log(draw)

        let losts = document.createElement("p")
        losts.innerHTML = results[i].lost
        console.log(losts)

        let goalsFor = document.createElement("p")
        goalsFor.innerHTML = results[i].goalsFor
        console.log(goalsFor)
        
        let goalsAgainst = document.createElement("p")
        goalsAgainst.innerHTML = results[i].goalsAgainst
        console.log(goalsAgainst)

        let goalDifference = document.createElement("p")
        goalDifference.innerHTML = results[i].goalDifference
        console.log(goalDifference)

        let points = document.createElement("p")
        points.innerHTML = results[i].points
        console.log(points)

        let finalStandingTable = [position,ensign,team,matchesplayed,won, draw, losts, goalsFor, goalsAgainst, goalDifference, points]
            for(let j=0; j<finalStandingTable.length; j++){
                const td= document.createElement("td")

                td.append(finalStandingTable[j])
                tr.append(td)
            }
        table.append(tr)
    }
}

function spinnerOn(){
  document.getElementById("spinner").style.display="block"
}

function spinnerOff(){
  document.getElementById("spinner").style.display="none"
}


