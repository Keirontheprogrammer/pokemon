// window.onload = function() {
//     const games = [
//         { name: 'Pokémon Red and Blue', releaseDate: '1996-02-27' },
//         { name: 'Pokémon Gold and Silver', releaseDate: '1999-11-21' },
//         { name: 'Pokémon Sword and Shield', releaseDate: '2019-11-15' },
//         // Add more games here...
//     ];

    const gamesList = document.getElementById('gamesList');
    games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = `${game.name} - Released: ${game.releaseDate}`;
        gamesList.appendChild(listItem);
    });

