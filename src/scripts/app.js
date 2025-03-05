'use strict';
/* L'IA a été utilisé pour la création de ces scripts */

/* Chargement des données JSON dès le début */
let titanicData = [];
fetch("assets/data/data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier JSON");
        }
        return response.json();
    })
    .then(data => {
        titanicData = data;
    })
    .catch(error => {
        console.error("Erreur lors du chargement des données", error);
    });

/* progress bar */
window.onscroll = function() {
    updateProgressBar();
};
 
function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
 
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%";
}

/* getRandom */
function getRandomTicketNumber() {
    return Math.floor(Math.random() * 2224) + 1;
}
// Example usage:
const ticketNumber = getRandomTicketNumber();


/* form + result*/
document.addEventListener("DOMContentLoaded", function() {
    // sélection du formulaire et des éléments
    const form = document.getElementById("userForm");
    const resultDiv = document.getElementById("result");

    // écoute de la soumission du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // récupération des valeurs
        let sexe = document.getElementById("sexe").value;
        let age = parseFloat(document.getElementById("age").value);
        let classe = parseInt(document.getElementById("classe").value);

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
        calculerSurvie(utilisateur);
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

    // Fonction pour calculer les chances de survie
    function calculerSurvie(utilisateur) {
        // Vérifier si les données sont chargées
        if (titanicData.length === 0) {
            resultDiv.innerHTML += `<p><strong>Erreur :</strong> Données non chargées</p>`;
            return;
        }

        // Filtrer les données en fonction des critères utilisateur
        let correspondances = titanicData.filter(passager =>
            passager.Sex === (utilisateur.sexe === "Homme" ? "male" : "female") &&
            passager.Pclass === utilisateur.classe &&
            passager.Age !== null &&
            Math.abs(passager.Age - utilisateur.age) <= 5
        );

        // Calcul du taux de survie
        if (correspondances.length > 0) {
            let survivants = correspondances.filter(p => p.Survived === 1).length;
            let tauxSurvie = (survivants / correspondances.length) * 100;
            resultDiv.innerHTML += `<p><strong>Chances de survie :</strong> ${tauxSurvie.toFixed(2)}%</p>`;
        } else {
            resultDiv.innerHTML += `<p><strong>Chances de survie :</strong> Données insuffisantes</p>`;
        }
    }
});