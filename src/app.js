const form = document.querySelector("#daret-form");
const nomCercle =document.querySelector("#nom-cercle");
const nomCercleErreur =document.querySelector("#nom-cercle-erreur");
const cotisation =document.querySelector("#cotisation");
const cotisationErreur =document.querySelector("#cotisation-erreur");
const periodicite =document.querySelector("#periodicite");
const periodiciteErreur =document.querySelector("#periodicite-erreur");
const dateDebut =document.querySelector("#date-debut");
const dateDebutErreur =document.querySelector("#date-debut-erreur");

function validerNom(valeur) {
const nom = valeur.trim();
    if (nom.length === 0){
        return "le nom de cercle est obligatoire"
    }if (nom.length<3 || nom.length>40){
        return "le nom doit etre entre 3 et 40 caractire"
    }
    return ''
}
function validerCotisation (valeur){
    const montant = Number(valeur)
    if(valeur === ""){
        return "la cotisation est obligatoire"
    }if (!Number.isInteger(montant)){
        return "la cotisation doit etre un nombre entier"
    }if(montant < 100 || montant > 50000){
return "la cotisation doit etre entre 100 et 50000 MAD"
    }
    return '';
}
