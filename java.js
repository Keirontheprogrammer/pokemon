document.getElementById('searchBtn').addEventListener('click', fetchPokemon);
document.getElementById('pokemonDropdown').addEventListener('change', handleDropdownSelection);

// Fetch Pokémon names for the dropdown on page load
window.onload = fetchPokemonNames;

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
            console.log(data); // Log the response for debugging
            displayPokemon(data);
            changeBackgroundColor(data.types); // Call to change background color
            triggerEffect(data.types); // Call function to trigger special effects based on type
        })
        .catch(err => {
            console.error(err); // Log the error for debugging
            document.getElementById('errorMessage').classList.remove('hidden');
            document.getElementById('pokemonCard').classList.add('hidden');
        });
}

function displayPokemon(data) {
    // Hide error message if it was visible
    document.getElementById('errorMessage').classList.add('hidden');
    document.getElementById('pokemonCard').classList.remove('hidden');

    // Check if the Pokémon has an image (sometimes front_default can be null)
    if (data.sprites.front_default) {
        document.getElementById('pokemonImage').src = data.sprites.front_default;
        document.getElementById('pokemonImage').alt = data.name;
    } else {
        document.getElementById('pokemonImage').src = 'default-image.jpg';  // Fallback image in case none is found
        document.getElementById('pokemonImage').alt = 'No image available';
    }

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

// Fetch the list of all Pokémon names for the dropdown
function fetchPokemonNames() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')  // Get first 1000 Pokémon
        .then(response => response.json())
        .then(data => {
            populateDropdown(data.results);
        })
        .catch(err => console.error('Error fetching Pokémon names:', err));
}

// Populate the dropdown with Pokémon names
function populateDropdown(pokemonList) {
    const dropdown = document.getElementById('pokemonDropdown');
    pokemonList.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.textContent = capitalizeFirstLetter(pokemon.name);
        dropdown.appendChild(option);
    });
}

// Handle selection from the dropdown and populate the search bar
function handleDropdownSelection() {
    const selectedPokemon = document.getElementById('pokemonDropdown').value;
    document.getElementById('pokemonName').value = selectedPokemon;
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

// Function to trigger special effect based on Pokémon type
function triggerEffect(types) {
    const effectContainer = document.getElementById('effectContainer');
    effectContainer.innerHTML = ''; // Clear previous effects
    const mainType = types[0].type.name;

    if (mainType === 'electric') {
        const lightning = document.createElement('div');
        lightning.classList.add('lightning');
        effectContainer.appendChild(lightning);
    } else if (mainType === 'fire') {
        const fireSpark = document.createElement('div');
        fireSpark.classList.add('fire-spark');
        effectContainer.appendChild(fireSpark);
    } else if (mainType === 'water') {
        const waterSplash = document.createElement('div');
        waterSplash.classList.add('water-splash');
        effectContainer.appendChild(waterSplash);
    }
    // Add more effects for other types as desired...
}


document.getElementById('themeSwitch').addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Fetching Pokémon Data and Evolution Chain
document.getElementById('searchBtn').addEventListener('click', function () {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    fetchPokemonData(pokemonName);
});

function fetchPokemonData(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonData(data);
            fetchEvolutionChain(data.species.url); // Fetch Evolution Chain
        })
        .catch(error => {
            document.getElementById('errorMessage').classList.remove('hidden');
            console.error('Error fetching Pokémon:', error);
        });
}

function displayPokemonData(data) {
    document.getElementById('pokemonDisplayName').textContent = data.name;
    document.getElementById('pokemonImage').src = data.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemonType').textContent = `Type: ${data.types.map(type => type.type.name).join(', ')}`;
    
    const statsList = document.getElementById('pokemonStats');
    statsList.innerHTML = ''; // Clear previous stats
    data.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
    });
    
    document.getElementById('pokemonCard').classList.remove('hidden');
}

// Fetching Evolution Chain
function fetchEvolutionChain(speciesUrl) {
    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            fetch(speciesData.evolution_chain.url)
                .then(response => response.json())
                .then(evolutionData => {
                    displayEvolutionChain(evolutionData.chain);
                });
        });
}

function displayEvolutionChain(chain) {
    const evolutionChain = [];

    let currentStage = chain;
    do {
        const name = currentStage.species.name;
        const id = currentStage.species.url.split('/')[6]; // Extract Pokémon ID from URL
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        evolutionChain.push({ name, imageUrl });
        currentStage = currentStage.evolves_to[0];
    } while (currentStage);

    // Display Evolution Chain
    if (evolutionChain.length > 0) {
        document.getElementById('evolutionChain').classList.remove('hidden');
        document.getElementById('evolution1Name').textContent = evolutionChain[0].name;
        document.getElementById('evolution1Image').src = evolutionChain[0].imageUrl;

        if (evolutionChain[1]) {
            document.getElementById('evolution2Name').textContent = evolutionChain[1].name;
            document.getElementById('evolution2Image').src = evolutionChain[1].imageUrl;
        }

        if (evolutionChain[2]) {
            document.getElementById('evolution3Name').textContent = evolutionChain[2].name;
            document.getElementById('evolution3Image').src = evolutionChain[2].imageUrl;
        }
    } else {
        document.getElementById('evolutionChain').classList.add('hidden');
    }
}

// Fetch Pokémon Data and Display Animated Sprite
function fetchPokemonData(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonData(data);
            fetchEvolutionChain(data.species.url); // Fetch Evolution Chain
        })
        .catch(error => {
            document.getElementById('errorMessage').classList.remove('hidden');
            console.error('Error fetching Pokémon:', error);
        });
}

function displayPokemonData(data) {
    document.getElementById('pokemonDisplayName').textContent = data.name;
    
    // Display Animated Sprite if available, else fallback to official artwork
    const animatedSpriteUrl = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    const staticArtworkUrl = data.sprites.other['official-artwork'].front_default;

    if (animatedSpriteUrl) {
        document.getElementById('pokemonAnimatedSprite').src = animatedSpriteUrl; // Use animated sprite
    } else {
        document.getElementById('pokemonAnimatedSprite').src = staticArtworkUrl; // Fallback to official artwork
    }
    
    document.getElementById('pokemonType').textContent = `Type: ${data.types.map(type => type.type.name).join(', ')}`;
    
    const statsList = document.getElementById('pokemonStats');
    statsList.innerHTML = ''; // Clear previous stats
    data.stats.forEach(stat => {
        const statItem = document.createElement('li');
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statItem);
    });
    
    document.getElementById('pokemonCard').classList.remove('hidden');
}
