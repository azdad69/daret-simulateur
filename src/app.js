const form = document.querySelector("#daret-form");
const nomCercle = document.querySelector("#nom-cercle");
const nomCercleErreur = document.querySelector("#nom-cercle-erreur");
const cotisation = document.querySelector("#cotisation");
const cotisationErreur = document.querySelector("#cotisation-erreur");
const periodicite = document.querySelector("#periodicite");
const periodiciteErreur = document.querySelector("#periodicite-erreur");
const dateDebut = document.querySelector("#date-debut");
const dateDebutErreur = document.querySelector("#date-debut-erreur");
const participantsListe = document.querySelector("#participants-liste");
const ajouterParticipant = document.querySelector("#ajouter-participant");
const participantsCompteur = document.querySelector("#participants-compteur");
const participantsErreur = document.querySelector("#participants-erreur");
const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const resumeDates = document.querySelector("#resume-dates");
const contenuResultat = document.querySelector("#contenu-resultat");
const etatVide = document.querySelector("#etat-vide");

function afficherErreur(champ, elementErreur, message) {
  elementErreur.textContent = message;
  elementErreur.classList.toggle("hidden", message === "");
  champ.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}
function validerNom(value) {
  const nom = value.trim();
  if (nom.length === 0) {
    return "le nom de cercle est obligatoire";
  }
  if (nom.length < 3 || nom.length > 40) {
    return "le nom doit etre entre 3 et 40 caractire";
  }
  const regex = /^[\p{L}\p{M}0-9 -]+$/u;
  if (!regex.test(nom)) {
    return "Utilisez uniquement des lettres, chiffres, espaces, tirets";
  }
  return "";
}
function validerCotisation(value) {
  if (value === "") {
    return "la cotisation est obligatoire";
  }
  const montant = Number(value);
  if (!Number.isInteger(montant)) {
    return "la cotisation doit etre un nombre entier";
  }
  if (montant < 100 || montant > 50000) {
    return "la cotisation doit etre entre 100 et 50000 MAD";
  }
  return "";
}
function validerPeriodicite(value) {
  const periodesValides = ["hebdomadaire", "quinzaine", "mensuelle"];
  if (!periodesValides.includes(value)) {
    return "Choisissez une périodicité valide";
  }
  return "";
}
function validerDate(value) {
  if (value === "") {
    return "la date de debut est obligatoire";
  }
  const aujourdhui = new Date();
  const annee = aujourdhui.getFullYear();
  const mois = String(aujourdhui.getMonth() + 1).padStart(2, "0");
  const jour = String(aujourdhui.getDate()).padStart(2, "0");

  const dateAujourdhui = `${annee}-${mois}-${jour}`;

  if (value < dateAujourdhui) {
    return "la date de debut ne peut pas etre dans la passé";
  }
  return "";
}
function creerParticipant() {
  if (participantsListe.children.length >= 20) {
    return;
  }
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "prenom du participant";
  input.className = "border rounded p-2";
  li.appendChild(input);
  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.style.backgroundColor = "#dc2626";
  boutonSupprimer.style.color = "#ffffff";
  boutonSupprimer.style.padding = "8px 12px";
  boutonSupprimer.style.borderRadius = "6px";
  boutonSupprimer.style.border = "none";
  boutonSupprimer.style.cursor = "pointer";
  boutonSupprimer.style.marginLeft = "20px";
  li.appendChild(boutonSupprimer);
  boutonSupprimer.addEventListener("click", function () {
    if (participantsListe.children.length <= 3) {
      participantsErreur.textContent =
        "Il faut garder au moins 3 participants.";
      participantsErreur.classList.remove("hidden");
      return;
    }
    li.remove();
    actualiserCompteur();
    participantsErreur.classList.add("hidden");
  });
  participantsListe.appendChild(li);
  actualiserCompteur();
  if (participantsListe.children.length >= 3) {
    participantsErreur.classList.add("hidden");
  }
  input.addEventListener("input", function () {
    const prenom = input.value.trim();

    if (prenom.length === 0) {
      participantsErreur.textContent =
        "Le prénom du participant est obligatoire";
      participantsErreur.classList.remove("hidden");
    } else if (prenom.length < 3 || prenom.length > 30) {
      participantsErreur.textContent =
        "Le prénom doit contenir entre 3 et 30 caractères";
      participantsErreur.classList.remove("hidden");
    } else {
      participantsErreur.classList.add("hidden");
    }
  });

  const prenom = input.value.trim();
  if (prenom.length === 0) {
    participantsErreur.textContent = "le prenom du participant est obligatoire";
    participantsErreur.classList.remove("hidden");
  } else if (prenom.length <= 2 || prenom.length >= 30) {
    participantsErreur.textContent =
      "Le prénom doit contenir entre 3 et 30 caractères";
    participantsErreur.classList.remove("hidden");
  } else {
    participantsErreur.classList.add("hidden");
  }
}
function actualiserCompteur() {
  const nomber = participantsListe.children.length;
  participantsCompteur.textContent = `${nomber} participant`;
}
creerParticipant();
creerParticipant();
creerParticipant();

ajouterParticipant.addEventListener("click", function () {
  creerParticipant();
});
function calculerMontant(cotisation, nombreParticipants) {
  return cotisation * nombreParticipants;
}
function calculerTotalVerse(cotisation, nombreTours) {
  return cotisation * nombreTours;
}
function calculerNombreTours(nombreParticipants) {
  return nombreParticipants;
}
function afficherResume() {
    const montantCotisation = Number(cotisation.value);
    const nombreParticipants = participantsListe.children.length;

    const montantTotal = calculerMontant(
        montantCotisation,
        nombreParticipants
    );

    const nombreTours = calculerNombreTours(nombreParticipants);

    const totalVerse = calculerTotalVerse(
        montantCotisation,
        nombreTours
    );

    // Calculer les dates
    const dates = calculerDates(
        dateDebut.value,
        periodicite.value,
        nombreTours
    );

    // Formater les dates en français
    const formatDate = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Afficher la date de début et la date de fin
    resumeDates.textContent =
        `${formatDate.format(dates[0])} — ${formatDate.format(dates[dates.length - 1])}`;

    // Afficher le résumé
    resumeCagnotte.textContent = `${montantTotal} MAD`;
    resumeTotalCycle.textContent = `${totalVerse} MAD`;
    resumeNbTours.textContent = nombreTours;

    contenuResultat.classList.remove("hidden");
    etatVide.classList.add("hidden");
}
function calculerDates(dateDebut, periodicite, nombreTours) {
    const dates = [];
    const date = new Date(`${dateDebut}T12:00:00`);
    for (let i = 0; i < nombreTours; i++) {
        dates.push(new Date(date));
        if (periodicite === "hebdomadaire") {
            date.setDate(date.getDate() + 7);
        } else if (periodicite === "quinzaine") {
            date.setDate(date.getDate() + 15);
        } else if (periodicite === "mensuelle") {
            const jour = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + 1);
            const dernierJour = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate();
            date.setDate(Math.min(jour, dernierJour));
        }
    }
    return dates;
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const erreurNom = validerNom(nomCercle.value);
  const erreurCotisation = validerCotisation(cotisation.value);
  const erreurPeriodicite = validerPeriodicite(periodicite.value);
  const erreurDate = validerDate(dateDebut.value);
  afficherErreur(nomCercle, nomCercleErreur, erreurNom);
  afficherErreur(cotisation, cotisationErreur, erreurCotisation);
  afficherErreur(periodicite, periodiciteErreur, erreurPeriodicite);
  afficherErreur(dateDebut, dateDebutErreur, erreurDate);
  const inputsParticipants = participantsListe.querySelectorAll("input");
  let nomsVus = [];
  for (const input of inputsParticipants) {
    const prenom = input.value.trim().toLowerCase();
    if (nomsVus.includes(prenom)) {
      participantsErreur.textContent =
        "les prenoms ne doivent pas etre double.";
      participantsErreur.classList.remove("hidden");
      return;
    }
    nomsVus.push(prenom);
    participantsErreur.classList.add("hidden");
  }
  for (const input of inputsParticipants) {
    const prenom = input.value.trim();
    if (prenom.length === 0) {
      participantsErreur.textContent =
        "Le prénom du participant est obligatoire";
      participantsErreur.classList.remove("hidden");
      return;
    }
    if (prenom.length < 3 || prenom.length > 30) {
      participantsErreur.textContent =
        "Le prénom doit contenir entre 3 et 30 caractères";
      participantsErreur.classList.remove("hidden");
      return;
    }
  }
  participantsErreur.classList.add("hidden");
  if (
    erreurDate === "" &&
    erreurNom === "" &&
    erreurCotisation === "" &&
    erreurPeriodicite === ""
  ) {
    afficherResume();
  }
});
