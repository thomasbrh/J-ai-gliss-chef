'use strict';
/* Importation de GSAP */
import gsap from "gsap";

/* L'IA a été utilisée pour la création de ces scripts */

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");
    console.log(typeof gsap !== "undefined" ? "GSAP est bien chargé" : "GSAP ne fonctionne pas");
});



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



/* Animation du ticket */
document.addEventListener("DOMContentLoaded", () => {
    let ticket = document.querySelector(".ticket");

    if (ticket) {
        // Animation de flottement plus fluide et plus haute
        let floatingAnimation = gsap.to(ticket, {
            y: -30,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        // Dès que l'utilisateur scrolle, on arrête l'effet flottant
        window.addEventListener("scroll", () => {
            floatingAnimation.kill(); // Stoppe l'animation
            gsap.set(ticket, { y: 0 }); // Remet le ticket à sa position d'origine
        }, { once: true }); // L'événement ne s'exécute qu'une seule fois
    } else {
        console.error("Élément .ticket non trouvé !");
    }
});



/* Animation du résultat et des images */
document.addEventListener("DOMContentLoaded", () => {
    // Animation du résultat (.ticket_result)
    let ticketResult = document.querySelector(".ticket_result");

    if (ticketResult) {
        gsap.to(ticketResult, {
            scale: 1.05,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1, // Répétition infinie
            yoyo: true
        });
    } else {
        console.error("Élément .ticket_result non trouvé !");
    }

    // Animation des images (.img--schema)
    let images = document.querySelectorAll(".img--schema");

    if (images.length > 0) {
        gsap.to(images, {
            scale: 1.05,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.1
        });
    } else {
        console.error("Aucun élément .img--schema trouvé !");
    }
});




/* Barre de progression */
window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
 
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
}



/* Changement de section/plan */
window.showPage = showPage;

function showPage(pageId) {
    let isBisPage = pageId.includes('-bis');

    if (isBisPage) {
        // Si on affiche une page "bis", cacher toutes les pages normales
        document.querySelectorAll('.content:not([id*="-bis"])').forEach(el => {
            el.style.display = "none";
        });
    } else {
        // Si on revient sur une page normale, réafficher toutes les pages normales
        document.querySelectorAll('.content:not([id*="-bis"])').forEach(el => {
            el.style.display = "block";
        });
    }

    // Masquer toutes les pages "bis"
    document.querySelectorAll('.content[id*="-bis"]').forEach(el => {
        el.style.display = "none";
    });

    // Afficher uniquement la page demandée
    let targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = "block";
    }

    // Ajout du recentrage automatique sur la section
    targetPage.scrollIntoView({ behavior: "smooth", block: "start" });
}



/* Changement d'image */
document.querySelectorAll('.legend-item').forEach(item => {
    item.addEventListener('click', function() {
        const newSrc = this.getAttribute('data-src');
        document.querySelectorAll('.schemaImage').forEach(img => img.src = newSrc);
    });
});



/* Génération d'un numéro de ticket aléatoire */
function getRandomTicketNumber() {
    return Math.floor(Math.random() * 2224) + 1;
}

const ticketNumber = getRandomTicketNumber();
document.getElementById('ticket-number').textContent = 'Ticket #' + ticketNumber;
console.log(ticketNumber);



/* Sélection de la classe */
document.querySelectorAll('.btn-classe').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.btn-classe').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        const selectedClass = this.value;
        console.log('Classe sélectionnée:', selectedClass);
    });
});



/* Formulaire et résultat */
const form = document.getElementById("userForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    let prenomNom = document.getElementById("prenom-nom").value.trim();
    let sexe = document.getElementById("sexe").value;
    let age = parseFloat(document.getElementById("age").value);
    let classeElement = document.querySelector('.btn-classe.selected');

    // Validation des champs
    if (!prenomNom || sexe === "" || isNaN(age) || age <= 0) {
        Swal.fire({
            title: "Erreur",
            text: "⚠️ Veuillez remplir tous les champs correctement.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    if (!classeElement) {
        Swal.fire({
            title: "Erreur",
            text: "⚠️ Veuillez sélectionner une classe de transport.",
            icon: "warning",
            confirmButtonText: "OK"
        });
        return;
    }

    let ageCategory = age > 12 ? "adulte" : "enfant";
    let classe = classeElement.value;

    // Confirmation du billet
    Swal.fire({
        title: "Confirmation de votre billet 🎟️",
        html: `
            <p class="paragraph-default"><strong>Nom :</strong> ${prenomNom}</p>
            <p class="paragraph-default"><strong>Classe :</strong> ${classe}</p>
            <p class="paragraph-default"><strong>Destination :</strong> New York 🇺🇸</p>
            <p class="paragraph-default">Votre billet a bien été enregistré. Bon voyage ! 🚢</p>
        `,
        icon: "success",
        confirmButtonText: "OK"
    });

    // Création de l'objet utilisateur
    let utilisateur = {
        prenomNom,
        sexe,
        age,
        ageCategory,
        classe
    };

    // Stockage des données
    localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

    // Affichage des données sauvegardées
    afficherUtilisateur();
    calculerSurvie(utilisateur);
});

function afficherUtilisateur() {
    const resultDiv = document.getElementById("result");

    if (!resultDiv) {
        console.error("Erreur : Impossible de trouver l'élément #result !");
        return;
    }

    let data = localStorage.getItem("utilisateur");
    if (data) {
        let utilisateur = JSON.parse(data);
        resultDiv.innerHTML = `
            <h3 class="title-small"><strong>Prénom et nom :</strong> ${utilisateur.prenomNom}</h3>
            <div class="box-result"><p class="paragraph-default"><strong>Sexe :</strong> ${utilisateur.sexe}</p></div>
            <div class="box-result"><p class="paragraph-default"><strong>Âge :</strong> ${utilisateur.age}</p></div>
            <div class="box-result"><p class="paragraph-default"><strong>Classe de transport :</strong> ${utilisateur.classe}</p></div>
        `;
    }
}

// Charger les données sauvegardées au chargement de la page
afficherUtilisateur();

function calculerSurvie(utilisateur) {
    const survivalChanceDiv = document.getElementById("survival-chance");

    if (!survivalChanceDiv) {
        console.error("Erreur : Impossible de trouver l'élément #survival-chance !");
        return;
    }

    if (titanicData.length === 0) {
        survivalChanceDiv.innerHTML = `<p class="paragraph-default"><strong>Erreur :</strong> Données non chargées</p>`;
        return;
    }

    let correspondances = titanicData.filter(passager =>
        passager.Sex === (utilisateur.sexe === "Homme" ? "male" : "female") &&
        passager.Pclass === parseInt(utilisateur.classe) &&
        passager.Age !== null &&
        ((utilisateur.ageCategory === "adulte" && passager.Age > 12) || 
         (utilisateur.ageCategory === "enfant" && passager.Age <= 12))
    );

    if (correspondances.length > 0) {
        let survivants = correspondances.filter(p => p.Survived === 1).length;
        let tauxSurvie = (survivants / correspondances.length) * 100;
        survivalChanceDiv.innerHTML = `
            <h3 class="title-small"><strong>Chances de survie :</strong></h3>
            <p class="paragraph-default">Il y a ${survivants} survivants sur ${correspondances.length} passagers correspondants.</p>
            <h3 class="title-big">${tauxSurvie.toFixed(2)}%</h3>
        `;
    } else {
        survivalChanceDiv.innerHTML = `<p class="paragraph-default"><strong>Chances de survie :</strong> Données insuffisantes</p>`;
    }
}
