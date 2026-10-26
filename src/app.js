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
const calendrierCorps = document.querySelector("#calendrier-corps");
const calendrier = document.querySelector("#calendrier");
const tirerOrdre = document.querySelector("#tirage-au-sort");
const conteneurBoutons = document.createElement("div");
const ordreSaisie = document.querySelector("#ordre-saisie");
const compteurTours = document.querySelector("#compteur-tours");
let ordreOriginal = [];
let ordreActuel = [];

tirerOrdre.textContent = "Tirer l’ordre au sort";
tirerOrdre.type = "button";

ordreSaisie.textContent = "Ordre de saisie";
ordreSaisie.type = "button";

conteneurBoutons.appendChild(tirerOrdre);
conteneurBoutons.appendChild(ordreSaisie);

calendrier.parentElement.insertBefore(
    conteneurBoutons,
    calendrier
);
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
    const nomsParticipants = Array.from(
    participantsListe.querySelectorAll("input")
).map(input => input.value.trim());

ordreOriginal = [...nomsParticipants];
ordreActuel = [...nomsParticipants];
    // Vider l'ancien calendrier
    calendrierCorps.replaceChildren();

    // Créer une ligne pour chaque tour
    for (let i = 0; i < nombreTours; i++) {
        creerLigneCalendrier(
            i + 1,
            formatDate.format(dates[i]),
            nomsParticipants[i],
            montantTotal
        );
    }

    // Afficher les dates de début et de fin
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
    const dateInitiale = new Date(`${dateDebut}T12:00:00`);
    const jourInitial = dateInitiale.getDate();

    for (let i = 0; i < nombreTours; i++) {
        let date;

        if (periodicite === "mensuelle") {
            date = new Date(
                dateInitiale.getFullYear(),
                dateInitiale.getMonth() + i,
                1,
                12
            );

            const dernierJour = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
            ).getDate();

            date.setDate(Math.min(jourInitial, dernierJour));
        } else {
            date = new Date(dateInitiale);

            if (periodicite === "hebdomadaire") {
                date.setDate(date.getDate() + i * 7);
            } else if (periodicite === "quinzaine") {
                date.setDate(date.getDate() + i * 15);
            }
        }

        dates.push(date);
    }

    return dates;
}


function creerLigneCalendrier(numero, date, beneficiaire, montant) {
    const ligne = document.createElement("tr");

    const celluleNumero = document.createElement("td");
    celluleNumero.textContent = numero;

    const celluleDate = document.createElement("td");
    celluleDate.textContent = date;

    const celluleBeneficiaire = document.createElement("td");
    celluleBeneficiaire.textContent = beneficiaire;

    const celluleMontant = document.createElement("td");
    celluleMontant.textContent = `${montant} MAD`;

    const celluleStatut = document.createElement("td");
    celluleStatut.textContent = "À venir";
    celluleStatut.classList.add("statut-tour");

    const celluleAction = document.createElement("td");

    const boutonStatut = document.createElement("button");
    boutonStatut.type = "button";
    boutonStatut.textContent = "Marquer comme terminé";
    boutonStatut.classList.add(
        "bouton-statut",
        "rounded",
        "border",
        "px-3",
        "py-1"
    );

    celluleAction.appendChild(boutonStatut);

    ligne.appendChild(celluleNumero);
    ligne.appendChild(celluleDate);
    ligne.appendChild(celluleBeneficiaire);
    ligne.appendChild(celluleMontant);
    ligne.appendChild(celluleStatut);
    ligne.appendChild(celluleAction);

    calendrierCorps.appendChild(ligne);
}
function melangerOrdre(tableau) {
    const resultat = [...tableau];

    for (let i = resultat.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [resultat[i], resultat[j]] = [resultat[j], resultat[i]];
    }

    return resultat;
}
function afficherCalendrierAvecOrdre(noms) {
    const montantTotal = Number(cotisation.value) * noms.length;

    const dates = calculerDates(
        dateDebut.value,
        periodicite.value,
        noms.length
    );

    const formatDate = new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    calendrierCorps.replaceChildren();

    for (let i = 0; i < noms.length; i++) {
        creerLigneCalendrier(
            i + 1,
            formatDate.format(dates[i]),
            noms[i],
            montantTotal
        );
    }
}
tirerOrdre.addEventListener("click", function () {
  console.log("le bouton fonctionne");
  
    if (ordreOriginal.length === 0) {
        ordreOriginal = Array.from(
            participantsListe.querySelectorAll("input")
        ).map(input => input.value.trim());
    }

    ordreActuel = melangerOrdre(ordreOriginal);
    afficherCalendrierAvecOrdre(ordreActuel);
});

ordreSaisie.addEventListener("click", function () {
    afficherCalendrierAvecOrdre(ordreOriginal);
});

calendrier.addEventListener("click", function (event) {
    const bouton = event.target.closest(".bouton-statut");

    if (!bouton) {
        return;
    }

    const ligne = bouton.closest("tr");
    const celluleStatut = ligne.querySelector(".statut-tour");

    if (celluleStatut.textContent === "À venir") {
        celluleStatut.textContent = "Terminé";
        bouton.textContent = "Annuler";
    } else {
        celluleStatut.textContent = "À venir";
        bouton.textContent = "Marquer comme terminé";
    }
    actualiserCompteurTours();
    actualiserProchainTour();
});

function actualiserCompteurTours() {
    const statuts = calendrierCorps.querySelectorAll(".statut-tour");

    const nombreTermines = Array.from(statuts).filter(function (statut) {
        return statut.textContent === "Terminé";
    }).length;

    compteurTours.textContent =
        `${nombreTermines} tours terminés sur ${statuts.length}`;
}

function actualiserProchainTour() {
    const lignes = calendrierCorps.querySelectorAll("tr");

    lignes.forEach(function (ligne) {
        ligne.classList.remove("bg-yellow-200", "font-semibold");
    });

    const prochaineLigne = Array.from(lignes).find(function (ligne) {
        const statut = ligne.querySelector(".statut-tour");
        return statut.textContent === "À venir";
    });

    if (prochaineLigne) {
        prochaineLigne.classList.add("bg-yellow-200", "font-semibold");
    }
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
    actualiserCompteurTours();
    actualiserProchainTour();
  }
});

