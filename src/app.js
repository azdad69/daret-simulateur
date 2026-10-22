const form = document.querySelector("#daret-form");
const nomCercle =document.querySelector("#nom-cercle");
const nomCercleErreur =document.querySelector("#nom-cercle-erreur");
const cotisation =document.querySelector("#cotisation");
const cotisationErreur =document.querySelector("#cotisation-erreur");
const periodicite =document.querySelector("#periodicite");
const periodiciteErreur =document.querySelector("#periodicite-erreur");
const dateDebut =document.querySelector("#date-debut");
const dateDebutErreur =document.querySelector("#date-debut-erreur");

function afficherErreur(champ, elementErreur, message){
elementErreur.textContent = message ;
elementErreur.classList.toggle("hidden", message === "");
champ.setAttribute("aria-invalid", message !== "" ? "true" :"false");
}
function validerNom(value) {
const nom = value.trim();
    if (nom.length === 0){
        return "le nom de cercle est obligatoire"
    }if (nom.length<3 || nom.length>40){
        return "le nom doit etre entre 3 et 40 caractire"
    }
    const regex = /^[\p{L}\p{M}0-9 -]+$/u
    if (!regex.test(nom)){
        return "Utilisez uniquement des lettres, chiffres, espaces, tirets";
    }
    return '';
}
function validerCotisation (value){
    
    if(value === ""){
        return "la cotisation est obligatoire"
    }
    const montant = Number(value);
    if (!Number.isInteger(montant)){
        return "la cotisation doit etre un nombre entier"
    }if(montant < 100 || montant > 50000){
return "la cotisation doit etre entre 100 et 50000 MAD"
    }
    return '';
}
function validerPeriodicite(value){
    const periodesValides = ["hebdomadaire", "quinzaine", "mensuelle"];
    if (!periodesValides.includes(value)){
        return "Choisissez une périodicité valide";
    }
    return ''
}
function validerDate(value){
    if (value === ""){
        return "la date de debut est obligatoire"
    }
    const aujourdhui = new Date()
    const annee = aujourdhui.getFullYear();
    const mois = String(aujourdhui.getMonth() + 1).padStart(2, "0");
    const jour = String(aujourdhui.getDate()).padStart(2, "0");

    const dateAujourdhui = `${annee}-${mois}-${jour}`;

    if (value < dateAujourdhui){
        return "la date de debut ne peut pas etre dans la passé"
    }
    return '';
}
form.addEventListener("submit", function(event){
    event.preventDefault();
    const erreurNom = validerNom(nomCercle.value)
    const erreurCotisation = validerCotisation(cotisation.value)
    const erreurPeriodicite = validerPeriodicite(periodicite.value)
    const erreurDate = validerDate(dateDebut.value)
    afficherErreur(nomCercle, nomCercleErreur, erreurNom);
    afficherErreur(cotisation, cotisationErreur, erreurCotisation);
    afficherErreur(periodicite, periodiciteErreur, erreurPeriodicite);
    afficherErreur(dateDebut, dateDebutErreur, erreurDate);
    if(erreurDate === '' && erreurNom === '' && erreurCotisation === '' && erreurPeriodicite === ''){

    }
})
