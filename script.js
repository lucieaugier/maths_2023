document.addEventListener("DOMContentLoaded", function() {

    
    document.getElementById("submit").addEventListener("click", function() {
        // Ici, tu peux appeler la fonction de traitement des données
        traiterDonnees();
    });

});

function traiterDonnees()
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

    var duree_relation;
    duree_relation=fiche_compatibilité(100, age1, age2);

    var premiere_dispute;
    premiere_dispute=fiche_compatibilité(2000, salaire1, salaire2);

    var reconciliation;
    reconciliation= fiche_compatibilité(200, famille1, famille2);

    var sex;
    sex=fiche_compatibilité(100, fumeur1+fidelite1, fumeur2+fidelite2);

    var physique;
    physique=fiche_compatibilité(50, beaute1, beaute2);

    var vie_commune;
    vie_commune=fiche_compatibilité(1000, animaux1, animaux2);
    
    var pourcentage_compatibilite;
    pourcentage_compatibilite=pourcentage_final(vie_commune,sex,premiere_dispute,reconciliation,physique,duree_relation);
    // function resizeImage(pourcentage_compatibilite);

    console.log(duree_relation,premiere_dispute,reconciliation,sex,physique,vie_commune, pourcentage_compatibilite);
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


function fiche_compatibilité(coeff, identite1, identite2){
    ecart_type = (identite1-identite2)*(identite1-identite2)/2;
    if (ecart_type==0){
        ecart_type=1;
    }
    return Math.round(Math.max(0, Math.min(100, coeff/ecart_type))); // Limiter le résultat entre 0 et 100
  }

//fonction image qui grossi en fonction du pourcentage ce compatibilité
function resizeImage(percentage) {
    var image = document.getElementById('imageId'); // Remplacez 'imageId' par l'ID de l'image coeur
    var newSize = 100 + percentage; // Nouvelle taille basée sur le pourcentage
  
    image.style.width = newSize + '%';
    image.style.height = newSize + '%';
}

function pourcentage_final(age, nbFreresSoeurs, salaire, fumeur, tauxFidelite, beaute) {
    var variables = [age, nbFreresSoeurs, salaire, fumeur, tauxFidelite, beaute];
    var sum = variables.reduce((a, b) => a + b, 0);
    var moyenne = sum / variables.length;
        var pourcentageFinal = Math.round(Math.max(0, Math.min(100, moyenne))); // Limiter le résultat entre 0 et 100
    
    return pourcentageFinal;
  }

