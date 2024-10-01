// script.js

document.getElementById('searchBtn').addEventListener('click', fetchPokemon);

function fetchPokemon() {
    const pokemonNameOrId = document.getElementById('pokemonName').value.toLowerCase().trim();

    // API call to fetch Pokémon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
            changeBackgroundColor(data.types); // Call to change background color
        })
        .catch(err => {
            document.getElementById('errorMessage').classList.remove('hidden');
            document.getElementById('pokemonCard').classList.add('hidden');
        });
}

function displayPokemon(data) {
    // Hide error message if it was visible
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('pokemonCard').classList.remove('hidden');

    // Set Pokémon image
    document.getElementById('pokemonImage').src = data.sprites.front_default;
    document.getElementById('pokemonImage').alt = data.name;

    // Set Pokémon name
    document.getElementById('pokemonDisplayName').textContent = capitalizeFirstLetter(data.name);

    // Set Pokémon type(s)
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
    document.getElementById('pokemonType').textContent = `Type: ${types}`;

    // Set Pokémon stats
    const statsList = document.getElementById('pokemonStats');
    statsList.innerHTML = '';  // Clear previous stats
    data.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
    });
}

// Utility function to capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to change background color based on Pokémon type
function changeBackgroundColor(types) {
    const typeColors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
        normal: '#A8A878'
    };

    // If the Pokémon has multiple types, use the first type to determine background color
    const mainType = types[0].type.name;
    const backgroundColor = typeColors[mainType] || '#ffffff'; // Default to white if type is not found

    // Change the background color of the body
    document.body.style.backgroundColor = backgroundColor;

    // Optionally, change container background color for contrast
    document.querySelector('.container').style.backgroundColor = `rgba(255, 255, 255, 0.8)`;
}
