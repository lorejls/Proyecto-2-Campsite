// console.log(matchesData)

// jornada 1.1
// let matchDayGame = matchesData.matches[0].matchday
// console.log(matchDayGame)

// let homeTeamName = matchesData.matches[0].homeTeam.name
// console.log(homeTeamName)

// let awayTeamName = matchesData.matches[0].awayTeam.name
// console.log(awayTeamName)

// let finalScore = matchesData.matches[0].homeTeam.name + ' ' + matchesData.matches[0].score.fullTime.homeTeam + ' - ' + matchesData.matches[0].score.fullTime.awayTeam + ' '+ matchesData.matches[0].awayTeam.name
// console.log(finalScore)

// let gameDate = matchesData.matches[0].utcDate
// console.log(gameDate)

// let homeTeamCrest = "https://crests.football-data.org/" + matchesData.matches[0].homeTeam.id + ".svg"
// console.log(homeTeamCrest)

// //jornada 1.2
// let matchDayGameTwo = matchesData.matches[1].matchday
// console.log(matchDayGameTwo)

// let homeTeamNameTwo = matchesData.matches[1].homeTeam.name
// console.log(homeTeamNameTwo)

// let awayTeamNameTwo = matchesData.matches[1].awayTeam.name
// console.log(awayTeamNameTwo)

// let finalScoreTwo = matchesData.matches[1].homeTeam.name + ' ' + matchesData.matches[1].score.fullTime.homeTeam + ' - ' + matchesData.matches[1].score.fullTime.awayTeam + ' '+ matchesData.matches[1].awayTeam.name
// console.log(finalScoreTwo)

// let gameDateTwo = matchesData.matches[1].utcDate
// console.log(gameDateTwo)

// let homeTeamCrestTwo = "https://crests.football-data.org/" + matchesData.matches[1].homeTeam.id + ".svg"
// console.log(homeTeamCrestTwo)

// //jornada 1.3
// let matchDayGameThree = matchesData.matches[2].matchday
// console.log(matchDayGameThree)

// let homeTeamNameThree = matchesData.matches[2].homeTeam.name
// console.log(homeTeamNameThree)

// let awayTeamNameThree = matchesData.matches[2].awayTeam.name
// console.log(awayTeamNameThree)

// let finalScoreThree = matchesData.matches[2].homeTeam.name + ' ' + matchesData.matches[2].score.fullTime.homeTeam + ' - ' + matchesData.matches[2].score.fullTime.awayTeam + ' '+ matchesData.matches[2].awayTeam.name
// console.log(finalScoreThree)

// let gameDateThree = matchesData.matches[2].utcDate
// console.log(gameDateThree)

// let homeTeamCrestThree = "https://crests.football-data.org/" + matchesData.matches[2].homeTeam.id + ".svg"
// console.log(homeTeamCrestThree)

let matchesTable = matchesData.matches

function matchesTableBuilder(results){
    let table = document.getElementById("matches-body")
    for(i=0; i<results.length; i++){

        let tr = document.createElement("tr")
        
        let matchDate =  new Date(results[i].utcDate)
        console.log(matchDate)

        let localEnsign = document.createElement("img")
        localEnsign.setAttribute("src",  "https://crests.football-data.org/" + results[i].homeTeam.id + ".svg")
        localEnsign.classList.add("images-Ensign") 
        console.log(localEnsign)

        let homeTeamName = document.createElement("p")
        homeTeamName.innerHTML = results[i].homeTeam.name
        console.log(homeTeamName)

        let fullTimeScore = document.createElement("p")
        fullTimeScore.innerHTML = results[i].score.fullTime.homeTeam + " - " + results[i].score.fullTime.awayTeam
        console.log(fullTimeScore)

        let awayTeamName = document.createElement("p")
        awayTeamName.innerHTML = results[i].awayTeam.name
        console.log(awayTeamName)

        let awayEnsign = document.createElement("img")
        awayEnsign.setAttribute("src",  "https://crests.football-data.org/" + results[i].awayTeam.id + ".svg")
        awayEnsign.classList.add("images-Ensign") 
        console.log(awayEnsign)

        let finalResults = [matchDate.toLocaleString(),localEnsign,homeTeamName,fullTimeScore,awayTeamName,awayEnsign]

        for(j=0; j<finalResults.length; j++){
            const td = document.createElement("td")
            td.append(finalResults[j])
            tr.append(td)
        }
        table.append(tr)
    }

}

matchesTableBuilder(matchesTable)