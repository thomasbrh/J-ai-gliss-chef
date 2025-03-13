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
        console.error("❌ Erreur lors du chargement des données", error);
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
        console.error("❌ Élément .ticket non trouvé !");
    }
});



/* Animation du résultat et des images */
document.addEventListener("DOMContentLoaded", () => {
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
        console.error("❌ Aucun élément .img--schema trouvé !");
    }
});



/* Animation du texte */
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animation pour les textes venant de la gauche
    gsap.utils.toArray(".animated-text").forEach(element => {
        gsap.fromTo(element, 
            { x: -100, opacity: 0 },  // Départ à gauche
            { 
                x: 0, opacity: 1, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Animation pour les textes venant de la droite
    gsap.utils.toArray(".animated-text-right").forEach(element => {
        gsap.fromTo(element, 
            { x: 100, opacity: 0 },  // Départ à droite
            { 
                x: 0, opacity: 1, 
                duration: 1.5, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    console.log("Animations GSAP appliquées !");
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
    console.log(`Tentative d'affichage de la page: ${pageId}`);

    // 🔹 Détecter la bonne version de la page selon la largeur d'écran
    let isMobile = window.innerWidth < 768;
    let isTablet = window.innerWidth >= 768 && window.innerWidth < 1280;
    let pageVariant = isMobile || isTablet ? `${pageId}--mobile` : `${pageId}--desktop`;

    console.log(`Page détectée : ${pageVariant}`);

    let targetPage = document.getElementById(pageVariant);

    if (!targetPage) {
        console.error(`❌ ERREUR : L'élément avec l'ID '${pageVariant}' est introuvable.`);
        return;
    }

    let isBisPage = pageId.includes('-bis');

    if (isBisPage) {
        console.log("Page-bis détectée, masquage du reste du site.");

        // Masquer tous les enfants directs de `body` SAUF ceux qui contiennent la page-bis
        document.querySelectorAll("body > *").forEach(el => {
            if (!el.contains(targetPage)) el.classList.add("hidden");
        });

        // Cacher toutes les autres pages-bis sauf la cible
        document.querySelectorAll('.content').forEach(el => {
            el.style.display = (el === targetPage) ? "grid" : "none";
            el.classList.toggle("hidden", el !== targetPage);
        });

        console.log("Page-bis affichée avec succès.");
        targetPage.scrollIntoView({ behavior: "smooth", block: "start" });

        // Réactiver le curseur si caché
        let customCursor = document.querySelector('.custom-cursor');
        if (customCursor) {
            customCursor.style.display = "block";
            customCursor.classList.remove("hidden");
        }

    } else {
        console.log("Retour à une page normale, réaffichage du site.");

        // Réafficher tout le contenu normal et cacher les pages-bis
        document.querySelectorAll("body > *").forEach(el => el.classList.remove("hidden"));

        document.querySelectorAll('.content').forEach(el => {
            el.style.removeProperty("display");
            el.classList.remove("hidden");
            if (el.id.includes('-bis--mobile') || el.id.includes('-bis--desktop')) {
                el.style.display = "none";
            }
        });

        console.log("✅ Tout est réaffiché normalement.");
    }

    console.log(`✅ Page affichée : ${pageVariant}`);
    attachLegendEvents(); // Pas besoin de `setTimeout`
}

/* Gestion des événements de la légende */
function attachLegendEvents() {
    console.log("Réactivation de la légende interactive...");

    document.querySelectorAll(".legend-item").forEach(img => {
        img.removeEventListener("click", changeMainImage); // Évite les doublons
        img.addEventListener("click", changeMainImage);
    });

    console.log("✅ Légende interactive mise à jour !");
}

// Fonction qui change l'image principale
function changeMainImage(event) {
    let clickedItem = event.currentTarget;
    console.log("Image cliquée :", clickedItem);

    // Supprime la classe "active" de toutes les images
    document.querySelectorAll(".legend-item").forEach(el => el.classList.remove("active"));
    clickedItem.classList.add("active");

    console.log("Recherche de l'image principale dans la page active...");

    // Trouver uniquement l'image visible DANS la page active
    const activePage = document.querySelector('.content:not(.hidden)');
    let mainImage = activePage?.querySelector('.schemaImage');

    if (!mainImage) {
        console.error("❌ ERREUR : L'image principale `.schemaImage` est introuvable dans la page active !");
        return;
    }

    let newSrc = clickedItem.dataset.src;
    if (newSrc) {
        mainImage.src = newSrc;
        console.log("Image principale mise à jour :", mainImage.src);
    } else {
        console.error("❌ ERREUR : `data-src` est manquant sur l'élément cliqué !");
    }
}



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
            text: "Veuillez remplir tous les champs correctement.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    if (!classeElement) {
        Swal.fire({
            title: "Erreur",
            text: "Veuillez sélectionner une classe de transport.",
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
            <p class="paragraph-default billet"><strong>Nom :</strong> ${prenomNom}</p>
            <p class="paragraph-default billet"><strong>Classe :</strong> ${classe}</p>
            <p class="paragraph-default billet"><strong>Destination :</strong> New York 🇺🇸</p>
            <p class="paragraph-default billet">Votre billet a bien été enregistré. Bon voyage ! 🚢</p>
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
            <h3 class="title-small margin-reset"><strong>Prénom et nom :</strong> ${utilisateur.prenomNom}</h3>
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

//CHANGEMENT DE CURSEUR SUR HOVER//
const body = document.body;
const customCursor = document.querySelector('.custom-cursor');
const imgschema = document.querySelectorAll('.img--schema');

function moveCursor(e) {
    console.log('mousemove');
  customCursor.style.top = `${(e.clientY + window.scrollY) - 32}px`; // 32 c'est la moitié de la taille du curseur, pour le centrer, si tu veux que le "click" soit en haut à gauche, comme pour la souris, alors retire le 32
  customCursor.style.left = `${e.clientX - 32}px`;
}

if (window.innerWidth >= 1280) {
    imgschema.forEach((img) => {
        img.addEventListener('mouseenter', () => {
            console.log('mouseenter');
        customCursor.style.visibility = 'visible';
        body.style.cursor = 'none';
        img.addEventListener('mousemove', moveCursor);
        });
    });

    imgschema.forEach((img) => {
        img.addEventListener('mouseleave', (e) => {
            console.log('mouseleave');
        if (!img.contains(e.relatedTarget)) {
            customCursor.style.visibility = 'hidden';
            body.style.cursor = 'default';
            img.removeEventListener('mousemove', moveCursor);
        }
    });
});
}

//EMPÊCHE L'UTILISATEUR D'AVOIR ACCÈS AU SITE SANS AVOIR REMPLI LE FORMULAIRE//

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.userForm');
    const hiddenElements = document.querySelectorAll('.hidden-submit');

    if (!form) {
        console.error("Erreur : Impossible de trouver le formulaire avec la classe 'userForm' !");
        return;
    }

    if (hiddenElements.length === 0) {
        console.error("Erreur : Aucun élément avec la classe 'hidden-submit' trouvé !");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Ajoutez ici votre logique de validation du formulaire
        const isFormValid = form.checkValidity(); // Utilisation de la validation HTML5

        if (isFormValid) {
            hiddenElements.forEach(element => {
                element.classList.remove('hidden-submit');
            });
            form.style.display = 'none'; // Masquer le formulaire après soumission
        } else {
            form.reportValidity(); // Affiche les messages de validation HTML5
        }
    });
});