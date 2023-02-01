// let matchesPlayed = standingsData.standings[0].table[0].playedGames
// console.log(matchesPlayed)

// let wonTotal = standingsData.standings[0].table[0].won
// console.log(wonTotal)

// let drawTotal = standingsData.standings[0].table[0].draw
// console.log(drawTotal)

// let lostTotal = standingsData.standings[0].table[0].lost
// console.log(lostTotal)

// let goalsForTotal = standingsData.standings[0].table[0].goalsFor
// console.log(goalsForTotal)

// let goalsAgainstTotal = standingsData.standings[0].table[0].goalsAgainst
// console.log(goalsAgainstTotal)

// let goalDifferenceTotal = standingsData.standings[0].table[0].goalDifference
// console.log(goalDifferenceTotal)

// let pointsTotal = standingsData.standings[0].table[0].points
// console.log(pointsTotal)

let standingsTable = standingsData.standings[0].table
// console.log(standingsTable)

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

tableBuilder(standingsTable)

