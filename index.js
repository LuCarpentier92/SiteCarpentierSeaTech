function startQuiz(region) {
    const quizPages = {
        America: 'quizz/amerique.html',
        Africa: 'quizz/afrique.html',
        Asia: 'quizz/asie.html',
        Europe: 'quizz/europe.html'
    };

    if (quizPages[region]) {
        window.location.href = quizPages[region];
    } else {
        alert('Quiz not found for this region!');
    }
}


// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered on the world

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add markers for each quiz region
const quizzes = [
    { region: 'America', coords: [10, -80], description: 'Spotlight on America' },
    { region: 'Africa', coords: [0, 20], description: 'Spotlight on Africa' },
    { region: 'Asia', coords: [30, 100], description: 'Spotlight on Asia' },
    { region: 'Europe', coords: [50, 15], description: 'Spotlight on Europe' }
];

quizzes.forEach(quiz => {
    L.marker(quiz.coords).addTo(map)
        .bindPopup(`<b>${quiz.region}</b><br>${quiz.description}<br><button onclick="startQuiz('${quiz.region}')">Start Quiz</button>`);
});

document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});





