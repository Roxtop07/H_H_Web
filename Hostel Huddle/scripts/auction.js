let teamCounter = 3; // Starting team count after Team A and Team B
let teamData = {
    team1: { name: 'PHOENIX', points: 10000, players: [] },
    team2: { name: 'RUDRA', points: 10000, players: [] },
    team3: { name: 'WINGERS', points: 10000, players: [] }
};

// Load team data from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedTeamData = localStorage.getItem('teamData');
    if (storedTeamData) {
        teamData = JSON.parse(storedTeamData);
        populateTeams();
    }
});

// Function to populate teams from teamData
function populateTeams() {
    Object.keys(teamData).forEach(teamId => {
        const team = teamData[teamId];
        document.getElementById(`${teamId}-points`).textContent = team.points;
        const playerList = document.getElementById(`${teamId}-players`);
        playerList.innerHTML = '';
        team.players.forEach(player => {
            playerList.innerHTML += `
                <li id="player-${player.name}-${teamId}">
                    ${player.name} - Bid: ${player.bid}
                    <button class="delete-button" onclick="deletePlayer('${teamId}', '${player.name}', '${player.id}')">Delete</button>
                </li>`;
        });
    });
}

// Function to save team data to local storage
function saveTeamData() {
    localStorage.setItem('teamData', JSON.stringify(teamData));
}

// Function to bid a player to a team
function bidPlayer(playerName, playerPrice, playerId) {
    const teamChoice = prompt(`Which team would you like to place ${playerName} in? Type 'A', 'B', or 'C'`);

    const validTeams = { a: 'team1', b: 'team2', c: 'team3' };
    const teamId = validTeams[teamChoice.toLowerCase()];

    if (teamId) {
        const bidAmount = prompt(`Enter the bid amount for ${playerName}:`);

        if (isNaN(bidAmount) || bidAmount <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        }

        if (teamData[teamId].points >= bidAmount) {
            teamData[teamId].players.push({ name: playerName, bid: bidAmount });
            teamData[teamId].points -= bidAmount;
            document.getElementById(`${teamId}-players`).innerHTML += `
                <li id="player-${playerName}-${teamId}">
                    ${playerName} - Bid: ${bidAmount}
                    <button class="delete-button" onclick="deletePlayer('${teamId}', '${playerName}', '${playerId}')">Delete</button>
                </li>`;
            document.getElementById(`${teamId}-points`).textContent = teamData[teamId].points;
            saveTeamData(); // Save data to local storage after bidding
        } else {
            alert(`Team ${teamChoice.toUpperCase()} does not have enough points!`);
        }
    } else {
        alert("Invalid input. Please choose 'A', 'B' or 'C'.");
    }
}

// Function to delete a player from a team
function deletePlayer(teamId, playerName, playerId) {
    const playerIndex = teamData[teamId].players.findIndex(player => player.name === playerName);

    if (playerIndex > -1) {
        const refundedBid = teamData[teamId].players[playerIndex].bid;
        teamData[teamId].players.splice(playerIndex, 1);
        teamData[teamId].points += parseInt(refundedBid);

        const playerItem = document.getElementById(`player-${playerName}-${teamId}`);
        if (playerItem) playerItem.remove();

        document.getElementById(`${teamId}-points`).textContent = teamData[teamId].points;
        document.getElementById(playerId).style.display = 'block';
        saveTeamData(); // Save data to local storage after deleting a player
    } else {
        alert("Player not found in the team.");
    }
}

// Function to add a new team
function addTeam() {
    const teamName = prompt("Enter the name for the new team:");

    if (teamName) {
        const newTeamId = `team${teamCounter}`;
        teamCounter++;

        teamData[newTeamId] = { name: teamName, points: 10000, players: [] };

        const teamElement = document.createElement('div');
        teamElement.classList.add('team');
        teamElement.id = newTeamId;
        teamElement.innerHTML = `
            <h3>${teamName}</h3>
            <p>Points: <span id="${newTeamId}-points">10000</span></p>
            <ul id="${newTeamId}-players"></ul>
            <button class="delete-team" onclick="deleteTeam('${newTeamId}')">Delete Team</button>
        `;
        document.getElementById('team-container').appendChild(teamElement);
        saveTeamData(); // Save data to local storage after adding a new team
    }
}

// Function to delete a team
function deleteTeam(teamId) {
    const teamElement = document.getElementById(teamId);
    if (teamElement) {
        teamElement.remove();
        delete teamData[teamId];
        saveTeamData(); // Save data to local storage after deleting a team
    }
}

// Function to add a new player card dynamically
function addPlayer() {
    const playerName = prompt("Enter the player's name:");
    const playerDesc = prompt("Enter the player's description:");
    const playerPrice = prompt("Enter the player's price:");

    if (playerName && playerDesc && playerPrice) {
        const playerCard = document.createElement('div');
        playerCard.classList.add('card');
        playerCard.id = playerName.toLowerCase().replace(/\s/g, '');
        playerCard.dataset.price = playerPrice;
        playerCard.innerHTML = `
            <h3>${playerName}</h3>
            <p class="player-description">${playerDesc}</p>
            <button class="bid-button" onclick="bidPlayer('${playerName}', ${playerPrice}, '${playerCard.id}')">Bid Player</button>
            <button class="delete-button" onclick="deletePlayerCard('${playerCard.id}')">Delete</button>
        `;
        document.getElementById('player-cards').appendChild(playerCard);
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to delete a player card
function deletePlayerCard(playerId) {
    const playerCard = document.getElementById(playerId);
    if (playerCard) {
        playerCard.remove();
    }
}

// Function to reset the bidding to its initial state
function resetBidding() {
    Object.keys(teamData).forEach(teamId => {
        teamData[teamId].points = 10000;
        teamData[teamId].players = [];

        document.getElementById(`${teamId}-players`).innerHTML = '';
        document.getElementById(`${teamId}-points`).textContent = teamData[teamId].points;
    });

    const playerCards = document.querySelectorAll('.card');
    playerCards.forEach(card => {
        card.style.display = 'block';
    });

    saveTeamData(); // Save data to local storage after resetting the bidding
    alert("The bidding has been reset to the initial state.");
}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
