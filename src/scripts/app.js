'use strict';
/* chatGPT a été utilisé pour la création de ces scripts */

/* form */
document.addEventListener("DOMContentLoaded", function() {
    // sélection du formulaire et des éléments
    const form = document.getElementById("userForm");
    const resultDiv = document.getElementById("result");

    // écoute de la soumission du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // récupération des valeurs
        let sexe = document.getElementById("sexe").value;
        let age = document.getElementById("age").value;
        let classe = document.getElementById("classe").value;

        // création d'un objet utilisateur
        let utilisateur = {
            sexe: sexe,
            age: age,
            classe: classe
        };

        // stocker les données dans le localStorage
        localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

        // afficher les données enregistrées
        afficherUtilisateur();
    });

    // fonction pour afficher les données sauvegardées
    function afficherUtilisateur() {
        let data = localStorage.getItem("utilisateur");
        if (data) {
            let utilisateur = JSON.parse(data);
            resultDiv.innerHTML = `
                <h3>Informations enregistrées :</h3>
                <p><strong>Sexe :</strong> ${utilisateur.sexe}</p>
                <p><strong>Age :</strong> ${utilisateur.age}</p>
                <p><strong>Classe de transport :</strong> ${utilisateur.classe}</p>
            `;
        }
    }

    // charger les données sauvegardées au chargement de la page
    afficherUtilisateur();
});









/* utilitaires */
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