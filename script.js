document.addEventListener("DOMContentLoaded", function() {

    
    document.getElementById("submit").addEventListener("click", function() {

      if (checkNames() == true)
      {
        var datas = determineCompatibility();
        checkSex();
        displayDatas(datas);
        displayPercentage(datas);
        resizeImage(datas[6]);

      }
    });
});


function checkNames()
{
  var prenom1Input = document.getElementById('prenom1').value;
  var prenom2Input = document.getElementById('prenom2').value;

  if (prenom1Input !== '' && prenom2Input !== '')
  {
    return true;
  }
  return false; 
}


function checkSex()
{
  var sexes = [];
  const formPrenom1 = document.getElementById('formPrenom1');
  const formPrenom2 = document.getElementById('formPrenom2');

  const radioButtons1 = formPrenom1.querySelectorAll('input[type="radio"]');
  const radioButtons2 = formPrenom2.querySelectorAll('input[type="radio"]');

  let selectedSex1 = '';
  let selectedSex2 = '';

  radioButtons1.forEach(button => {
    if (button.checked) {
      selectedSex1 = button.value;
    }
  });

  radioButtons2.forEach(button => {
    if (button.checked) {
      selectedSex2 = button.value;
    }
  });

  sexes.push(selectedSex1, selectedSex2);
  return sexes;
}

function bonusPercentage()
{
  const sexDatas = checkSex();
  var bonus = 0; 

  for (let i = 0; i<2; i++)
  {
    if (sexDatas[i] == "femme")
    {
      bonus += generate_uniformDiscrete(0,10);
    }
    else if (sexDatas[i]== "homme")
    {
      bonus += generate_poisson(5);
    } 
    else 
    {
      bonus += generate_bernoulli(0.7);
    }
  }
  console.log(bonus);
  return bonus; 
}


function determineCompatibility()
{
  var age1, age2;
  age1 = generate_uniformDiscrete(0,90);
  age2 = generate_uniformDiscrete(0,90);

  var famille1, famille2;
  famille1 = generate_poisson(3);
  famille2 = generate_poisson(3);

  var salaire1, salaire2;
  salaire1 = generate_exponential(0.0001);
  salaire2 = generate_exponential(0.0001);

  var animaux1, animaux2;
  animaux1 = generate_poisson(2);
  animaux2 = generate_poisson(2);

  var fumeur1,fumeur2;
  fumeur1=generate_bernoulli(0.3);
  fumeur2=generate_bernoulli(0.3); 

  var fidelite1,fidelite2;
  fidelite1=generate_normal(60,20);
  fidelite2=generate_normal(60,20); 

  var beaute1,beaute2;
  beaute1=generate_gamma(10,5);
  beaute2=generate_gamma(10,5);

  var datas = [];

  var duree_relation;
  duree_relation=calculerDureeRelation(age1, age2);
  datas.push(duree_relation);

  var premiere_dispute;
  premiere_dispute=calculerPremiereDispute(salaire1, salaire2);
  datas.push(premiere_dispute);

  var reconciliation;
  reconciliation= calculerTempsReconciliation(famille1, famille2);
  datas.push(reconciliation);

  var sex;
  sex=calculerCompatibiliteSexuelle(fumeur1,fumeur2, fidelite1,fidelite2);
  datas.push(sex);

  var physique;
  physique=calculerCompatibilitePhysique(beaute1,beaute2);
  datas.push(physique);

  var vie_commune;
  vie_commune=calculerDureeVieCommune(animaux1,animaux2);
  datas.push(vie_commune);
  
  var pourcentage_compatibilite;
  pourcentage_compatibilite=calculerPourcentage_final(duree_relation,premiere_dispute,reconciliation,sex,physique,vie_commune) + bonusPercentage();
  datas.push(pourcentage_compatibilite);
  return datas; 
}


function displayDatas(datas)
{ 
  document.getElementById("submit").style.display = "none";
  document.getElementsByClassName("ficheCompatibilite")[0].style.display = "block";

  document.getElementsByClassName("relation")[0].textContent = datas[0] + " ans";
  document.getElementsByClassName("vieCommune")[0].textContent = datas[5] + " ans";
  document.getElementsByClassName("dispute")[0].textContent = datas[1] + " semaines";
  document.getElementsByClassName("reconciliation")[0].textContent = datas[2] + " heures";
  document.getElementsByClassName("physique")[0].textContent = datas[3] + " %";
  document.getElementsByClassName("sexuel")[0].textContent = datas[4] + " %";
}

function displayPercentage(datas){
  document.getElementById("texte-overlay").style.display = "block";
  document.getElementById("texte-overlay").innerHTML = datas[6] + " %";
}


// Fonction pour générer une variable aléatoire suivant une loi uniforme discrète entre a et b
function generate_uniformDiscrete(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Fonction pour générer une variable aléatoire suivant une loi de Poisson avec une moyenne lambda
function generate_poisson(lambda) {
var L = Math.exp(-lambda);
var k = 0;
var p = 1;
while (p > L) {
k++;
p *= Math.random();
}
return k - 1;
}

// Fonction pour générer une variable aléatoire suivant une loi exponentielle avec un paramètre lambda qui va de 100e à 20 000e
function generate_exponential(lambda) {
    var exponentialValue;
    do {
      exponentialValue = -Math.log(1 - Math.random()) / lambda;
      exponentialValue = Math.round(exponentialValue);
    } while (exponentialValue < 1000 || exponentialValue > 20000);
    return exponentialValue;
}

// Fonction pour générer une variable aléatoire suivant une variable de Bernoulli avec une probabilité p de succès
// return Math.random() < p ? 1 : 0;
function generate_bernoulli(p) {
    if (Math.random() < p) {
      // Si le résultat est 1, retourne un pourcentage aléatoire entre 50 et 100
      return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    } else {
      // Si le résultat est 0, retourne un pourcentage aléatoire entre 0 et 50
      return Math.floor(Math.random() * (50 - 0 + 1));
    }
  }

// Fonction pour générer une variable aléatoire suivant une loi normale avec une moyenne mu et un écart-type sigma
function generate_normal(mu, sigma) {
    var u1 = Math.random();
    var u2 = Math.random();
    var z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.round(mu + sigma * z);
}

// Fonction pour générer une variable aléatoire suivant une loi gamma avec une forme k et une échelle theta
function generate_gamma(k, theta) {
    if (k < 1) {
      return generate_gamma(1 + k, theta) * Math.pow(Math.random(), 1 / k);
    } else {
      var d = k - 1 / 3;
      var c = 1 / Math.sqrt(9 * d);
      while (true) {
        var x = generate_normal(0, 1);
        var v = Math.pow(1 + c * x, 3);
        if (v > 0) {
          var u = Math.random();
          if (Math.log(u) < 0.5 * x ** 2 + d - d * v + d * Math.log(v)) {
            var gammaValue = d * v * theta;
            // Transformation pour obtenir une valeur entre 0 et 100
            return Math.round(Math.min(Math.max(gammaValue, 0), 100));
          }
        }
      }
    }
  }


//fonction image qui grossi en fonction du pourcentage ce compatibilité
function resizeImage(percentage) {
    var image = document.getElementsByClassName("coeur")[0];
    var newSize = (percentage / 100) * 200 + 100;; // Nouvelle taille basée sur le pourcentage
  
    image.style.height = newSize + "px";
}

function calculerPourcentage_final(dureeRelation, premiereDispute,tempsReconciliation,compatibiliteSexuelle,compatibilitePhysique,dureeVieCommune) {
    const poidsDureeRelation = 0.2;
    const poidsPremiereDispute = 0.1;
    const poidsTempsReconciliation = 0.1;
    const poidsCompatibiliteSexuelle = 0.2;
    const poidsCompatibilitePhysique = 0.2;
    const poidsDureeVieCommune = 0.2;
  
    const pourcentageFinal = (
      dureeRelation * poidsDureeRelation +
      premiereDispute * poidsPremiereDispute +
      tempsReconciliation * poidsTempsReconciliation +
      compatibiliteSexuelle * poidsCompatibiliteSexuelle +
      compatibilitePhysique * poidsCompatibilitePhysique +
      dureeVieCommune * poidsDureeVieCommune
    );
  
    return Math.round(Math.min(Math.max(pourcentageFinal, 0), 100)*Math.floor(Math.random() * 3)); // Limiter entre 0 et 100
  }


// Fonction pour calculer la durée de relation en années (entre 0 et 60)
function calculerDureeRelation(age1, age2) {
    const differenceAge = Math.abs(age1 - age2);
    const dureeRelation = Math.min(differenceAge, 60); // Limiter la durée à 60 ans
    return Math.round(dureeRelation)/5;
  }
  
  // Fonction pour calculer le temps d'apparition de la première dispute en jours (entre 0 et 90)
  function calculerPremiereDispute(salaire1, salaire2) {
    const moyenneSalaires = (salaire1 + salaire2) / 2;
    const ecartTypeSalaires = Math.abs(salaire1 - salaire2) * 0.1; //estimation de l'écart type
    const minJours = Math.max(moyenneSalaires - ecartTypeSalaires, 0);
    const maxJours = Math.min(moyenneSalaires + ecartTypeSalaires, 90); // Limiter à 90 jours
    const tempsPremiereDispute = Math.random() * (maxJours - minJours + 1) + minJours;
    return Math.floor(tempsPremiereDispute/100); 
  }
  
  // Fonction pour calculer le temps de réconciliation entre deux disputes en jours (entre 0 et 30)
  function calculerTempsReconciliation(famille1, famille2) {
    const moyennefamille = (famille1 + famille2) / 2;
    const ecartTypefamille = Math.abs(famille1 - famille2) * 0.2; //estimation de l'écart type
    const minJours = Math.max(moyennefamille - ecartTypefamille, 0);
    const maxJours = Math.min(moyennefamille + ecartTypefamille, 10); // Limiter à 10h
    const tempsReconciliation = Math.random() * (maxJours - minJours) + minJours;
    return Math.round(tempsReconciliation);
  }
  
  //calcule de la compatibilité sexuelle en pourcentage (entre 0 et 100)
function calculerCompatibiliteSexuelle(fumeur1, fumeur2, fidelite1, fidelite2) {
    const moyenneFumeur = (fumeur1 + fumeur2) / 2;
    const moyenneFidelite = (fidelite1 + fidelite2) / 2;
    const compatibiliteSexuelle = (moyenneFumeur * 0.5 + moyenneFidelite * 0.9) ;
    return Math.round(Math.min(Math.max(compatibiliteSexuelle, 0), 100));
  }
  
  // calcule de la compatibilité physique en pourcentage (entre 0 et 100)
  function calculerCompatibilitePhysique(beaute1, beaute2) {
    const moyenneBeaute = (beaute1 + beaute2) / 2;
    const compatibilitePhysique = moyenneBeaute*0.9 ; // Relation non linéaire entre beauté et compatibilité physique
    return Math.round(Math.min(Math.max(compatibilitePhysique, 0), 100));
  }
  
  // Fonction pour calculer la durée de vie commune en années (entre 0 et 60)
  function calculerDureeVieCommune(animaux1,animaux2) {
    const dureeVieMoyenneAnimal = 5; //  durée de vie moyenne de 5 ans pour chaque animal
    const dureeVieCommune = Math.min(((animaux1+animaux2)/2) * dureeVieMoyenneAnimal, 60); // Limiter à 60 ans
    return Math.round(dureeVieCommune)/5;
  }

function recommencerTest() {
  location.reload(); // Recharge la page
}