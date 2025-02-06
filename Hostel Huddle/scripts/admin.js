document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission for updating points
    document.getElementById('update-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const team = document.getElementById('team').value;
        const points = document.getElementById('points').value;

        fetch('php/update_points.php', {
            method: 'POST',
            body: new URLSearchParams({
                team_id: team,
                points: points
            })
        }).then(response => response.json())
          .then(data => alert(data.message));
    });

    // Export data to CSV
    document.getElementById('export-teams').addEventListener('click', () => {
        window.location.href = 'php/export_csv.php?type=teams';
    });

    document.getElementById('export-players').addEventListener('click', () => {
        window.location.href = 'php/export_csv.php?type=players';
    });
});
