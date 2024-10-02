// window.onload = function() {
//     const animations = [
//         { name: 'Pokémon: The First Movie', releaseDate: '1998-07-18' },
//         { name: 'Pokémon: The Power of One', releaseDate: '1999-07-17' },
//         { name: 'Pokémon: The Rise of Darkrai', releaseDate: '2007-07-14' },
//         // Add more animations here...
//     ];

    const animationsList = document.getElementById('animationsList');
    animations.forEach(animation => {
        const listItem = document.createElement('li');
        listItem.textContent = `${animation.name} - Released: ${animation.releaseDate}`;
        animationsList.appendChild(listItem);
    });

