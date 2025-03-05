'use strict';
/* L'IA a été utilisé pour la création de ces scripts */

/* chargement des données JSON dès le début */
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

 // fonction pour mettre à jour la barre de progression
function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
 
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%";
}



/* ticket number */
// Fonction pour générer un numéro de ticket aléatoire
function getRandomTicketNumber() {
    return Math.floor(Math.random() * 2224) + 1;
}

// Générer et stocker un seul numéro de ticket
const ticketNumber = getRandomTicketNumber();

// Afficher le même numéro dans l'élément HTML et dans la console
document.getElementById('ticket-number').textContent = 'Ticket #' + ticketNumber;
console.log(ticketNumber);
    


/* selection de la classe */
document.querySelectorAll('.btn-classe').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.btn-classe').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        const selectedClass = this.value;
        console.log('Classe sélectionnée:', selectedClass);
    });
});



/* form and result */
document.addEventListener("DOMContentLoaded", function() {
    // sélection du formulaire et des éléments
    const form = document.getElementById("userForm");
    const resultDiv = document.getElementById("result");
    const survivalChanceDiv = document.getElementById("survival-chance");

    // écoute de la soumission du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // récupération des valeurs
        let prenomNom = document.getElementById("prenom-nom").value;
        let sexe = document.getElementById("sexe").value;
        let age = parseFloat(document.getElementById("age").value);
        let ageCategory = age > 12 ? "adulte" : "enfant";
        let classe = document.querySelector('.btn-classe.selected').value;

        // création d'un objet utilisateur
        let utilisateur = {
            prenomNom: prenomNom,
            sexe: sexe,
            age: age,
            ageCategory: ageCategory,
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
            resultDiv.innerHTML = 
                `<p class="paragraph-default"><strong>Prénom et nom :</strong> ${utilisateur.prenomNom}</p>

                <div class="box-result">
                <p class="paragraph-default"><strong>Sexe :</strong> ${utilisateur.sexe}</p>
                </div>

                <div class="box-result">
                <p class="paragraph-default"><strong>Age :</strong> ${utilisateur.age}</p>
                </div>

                <div class="box-result">
                <p class="paragraph-default"><strong>Classe de transport :</strong> ${utilisateur.classe}</p>
                </div>`;
        }
    }

    // charger les données sauvegardées au chargement de la page
    afficherUtilisateur();

    // Fonction pour calculer les chances de survie
    function calculerSurvie(utilisateur) {
        // Vérifier si les données sont chargées
        if (titanicData.length === 0) {
            survivalChanceDiv.innerHTML = `<p class"paragraph-default"><strong>Erreur :</strong> Données non chargées</p>`;
            return;
        }

        // Filtrer les données en fonction des critères utilisateur
        let correspondances = titanicData.filter(passager =>
            passager.Sex === (utilisateur.sexe === "Homme" ? "male" : "female") &&
            passager.Pclass === parseInt(utilisateur.classe) &&
            passager.Age !== null &&
            ((utilisateur.ageCategory === "adulte" && passager.Age > 12) || 
             (utilisateur.ageCategory === "enfant" && passager.Age <= 12))
        );

        // Calcul du taux de survie
        if (correspondances.length > 0) {
            let survivants = correspondances.filter(p => p.Survived === 1).length;
            let tauxSurvie = (survivants / correspondances.length) * 100;
            survivalChanceDiv.innerHTML = 
            `<h2 class"paragraph-default"><strong>Chances de survie :</strong></h2>
            
            <p class="paragraph-default">Il y a ${survivants} survivants sur ${correspondances.length} passagers correspondants.</p>
            
            <p class="title-big">${tauxSurvie.toFixed(2)}%</p>`;

                                           
        } else {
            survivalChanceDiv.innerHTML = `<p class"paragraph-default"><strong>Chances de survie :</strong> Données insuffisantes</p>`;
        }
    }
});