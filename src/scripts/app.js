'use strict';

/* ChatGPT a été utilisé pour la création de ces scripts */











/* Utilitaires */
// Function getRandom
/*
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/

// fetch sans variable
/*
fetch('assets/data/file.txt')
    .then(function (response) {
        // code
        console.log(response);
        return response.text();
    })
    .then(function (data) {
        console.log(data);
    })
    .catch(function () {
        console.log('erroooorrr');
    });
*/

// Déclaration globale de l'index pour pouvoir le modifier partout
/* let index = 0;

// Fonction pour afficher le bon slide et ajuster la hauteur
function showSlide(i) {
    const slides = document.querySelectorAll(".slide");
    const sliderContainer = document.querySelector(".slider-container");

    if (slides.length > 0) {
        slides.forEach((slide, index) => {
            slide.classList.remove("active");
            slide.style.opacity = "0"; // Cache tous les slides
            slide.style.zIndex = "0"; // Assure que les slides cachés passent en arrière-plan
            slide.style.display = "none"; // Évite les erreurs d'affichage
        });

        slides[i].classList.add("active");
        slides[i].style.opacity = "1"; // Affiche le slide actif
        slides[i].style.zIndex = "10"; // Le met au premier plan
        slides[i].style.display = "block"; // Le rend visible

        // Mise à jour de la hauteur du conteneur
        if (sliderContainer) {
            sliderContainer.style.height = `${slides[i].offsetHeight}px`;
        }
    }
}
*/