document.addEventListener('DOMContentLoaded', () => {
    fetch('php/get_points.php')
        .then(response => response.json())
        .then(teams => {
            const tableBody = document.querySelector('#points-table tbody');
            teams.forEach(team => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${team.team_name}</td>
                    <td>${team.wins}</td>
                    <td>${team.losses}</td>
                    <td>${team.bonus_points}</td>
                    <td>${team.total_points}</td>
                `;
                tableBody.appendChild(row);
            });
        });
});
