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


document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "N") {
        document.body.classList.toggle("dark-mode");
        alert("You've activated Dark Mode! 🌓");
    }
});

let clickCount = 0;
document.querySelector(".btn-explore").addEventListener("click", () => {
    clickCount++;
    if (clickCount === 10) {
        alert("You've unlocked a secret quiz! 🎉");
        window.location.href = "secret-quiz.html"; // Redirige vers un quiz caché.
    }
});

let footerTimeout;
document.querySelector("footer").addEventListener("mouseover", () => {
    footerTimeout = setTimeout(() => {
        alert("You found the hidden footer surprise! 🥳");
    }, 5000); // 5 secondes
});
document.querySelector("footer").addEventListener("mouseout", () => {
    clearTimeout(footerTimeout);
});


let questionTimeout;
document.querySelector(".quiz-container").addEventListener("mousemove", () => {
    clearTimeout(questionTimeout);
    questionTimeout = setTimeout(() => {
        alert("What’s taking so long? Googling the answer? Cheater! 🕵️‍♂️");
    }, 10000); // 10 secondes d'inactivité
});

let fastClickCount = 0;
document.querySelectorAll(".quiz-card").forEach((card) => {
    card.addEventListener("click", () => {
        fastClickCount++;
        if (fastClickCount === 3) {
            alert("Oh vise bien le bouton si tu veux pas que je t'arrache ta grand mère!!");
        }
    });
});

document.querySelector("#text-input").addEventListener("input", (e) => {
    const bannedWords = {
        "toeic": "Oh, come on Snap, I sell TOEIC scores of 800 for 15 euros – add me at lucarpentier92! 🤑",
        "english": "Typing 'English'? You sure you didn’t use Google Translate? 🤔",
        "seatecn": "Typing 'SEATECH'? Ah, aiming for big dreams but still clueless, huh? 🌍",
        "dissard": "Hmm, are you talking about GTD (Great Teacher Dissard)? She pulled off a feat by helping Enzo get his TOEIC – it works better than those TOEICs bought on Snap! 😏",
		"carpentier": "Hmmm, yeah, this guy is a real player. 🍆",
		"enzo": "Hmmm, I think this guy deserves to go back to Thailand. 🇹🇭",
		"cherif": "Hmmm, I think this guy deserves to go back to Thailand. 🇹🇭",
		"courtois": "Hmmm, luckily he got his internship in Bordeaux, or else he’d be out of a dishwasher. 🍽️",
		"thibault": "Hmmm, luckily he got his internship in Bordeaux, or else he’d be out of a dishwasher. 🍽️",
		"ewen": "He's just a chill guy, never gets angry – the voice of wisdom. 🧘‍♂️",
		"eliot": "Beep beep, motorbike – all I know is riding and annoying people. 🛵😏",
		"grolu": "He's a son of a b***h. 😅",
		"pb": "Here he goes wanting to fight, but he's trash. 🥊😂",
		"roggia": "To me, he’s homosexual. 🌈",
		"brocard": "He still has a lot of hair; you just don’t see it. 🕶️😅",
		"even": "Keeping a secret is too much for him... snitch. 🤐🐀",
		"georges": "Bloody Englishman, go back to your country. 😬",
		"hugo": "Here's a special clip for Hugo. Enjoy!",
        "girafa": "girafa, this one's for you. Check it out!",
        "guivarch": "guivarch, this one's for you. Check it out!",
        "cherif": "cherif, this one's for you. Check it out!",
        "lucas": "lucas, this one's for you. Check it out!",
        "louis": "louis, this one's for you. Check it out!",
		"julia": "julia, this one's for you. Check it out!"
    };

    const videos = {
        "hugo": "sounds/Hugo.mp4", // Example video
        "girafa": "sounds/Girafa.mp4", // Example video
        "guivarch": "sounds/guivarch.mp4", // Example video
        "cherif": "sounds/cherif.mp4", // Example video
        "lucas": "sounds/Lucas.mp4", // Example video
        "louis": "sounds/Louis.mp4", // Example video
        "julia": "sounds/LucasJulia.mp4" // Example video
    };

    const inputText = e.target.value.toLowerCase();

    // Parcours les mots clés pour vérifier les occurrences
    Object.keys(bannedWords).forEach((word) => {
        if (inputText.includes(word)) {
            // Si le mot déclenche une vidéo
            if (videos[word]) {
                showVideoModal(videos[word]);
            } else {
                // Sinon, affiche une alerte
                e.target.value = inputText.replace(word, "💩 (Detected)");
                alert(bannedWords[word]);
            }
        }
    });
});

// Fonction pour afficher une vidéo dans une modale
function showVideoModal(videoUrl) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.style.width = "80%";
    iframe.style.height = "60%";
    iframe.style.border = "none";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "1.2rem";
    closeButton.style.backgroundColor = "#ff5722";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";

    closeButton.onclick = () => {
        modal.remove();
    };

    modal.appendChild(iframe);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}

// Vérifie le compteur d'actualisations dans localStorage
let refreshCounter = localStorage.getItem("refreshCounter") || 0;
refreshCounter++;
localStorage.setItem("refreshCounter", refreshCounter);

if (refreshCounter >= 5) {
    // Affiche une fausse page de chargement troll
    document.body.innerHTML = `
        <h1 style="text-align: center; margin-top: 20%; font-size: 2rem; color: #333;">Loading your IQ... Please wait 🤔</h1>
        <div style="width: 100%; display: flex; justify-content: center; margin-top: 20px;">
            <div class="loader"></div>
        </div>
    `;
    
    // Ajoute une animation pour un effet de chargement
    const style = document.createElement("style");
    style.innerHTML = `
        .loader {
            border: 10px solid #f3f3f3; /* Light grey */
            border-top: 10px solid #0044cc; /* Blue */
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Recharge la page après 5 secondes
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}

// Réinitialise le compteur après une longue période d'inactivité
setTimeout(() => {
    localStorage.removeItem("refreshCounter");
}, 600); // 10 minutes

let chaosClicks = 0;

// Écoute les clics
document.body.addEventListener("click", () => {
    chaosClicks++;
    if (chaosClicks === 10) {
        activateChaosMode();
    }
});

// Écoute la saisie du mot "chaos"
let inputSequence = "";
document.body.addEventListener("keydown", (e) => {
    inputSequence += e.key.toLowerCase();
    if (inputSequence.includes("chaos")) {
        activateChaosMode();
        inputSequence = ""; // Réinitialise après l'activation
    }
});

// Fonction pour activer le mode chaotique
function activateChaosMode() {
    document.body.classList.add("chaos-mode");
    alert("Welcome to CHAOS MODE! 🌈🎉"); // Message humoristique

    // Désactive le mode après 5 secondes
    setTimeout(() => {
        document.body.classList.remove("chaos-mode");
    }, 5000);
}

function displayMessage() {
    alert("Oui oui mon reuf t'es bien à Seatech est ça pue du cul heuresement qu'il y a Dissard 😬");
}

function redirectToImage() {
    window.open("images/LucasEnzo.png", "_blank");
}

















