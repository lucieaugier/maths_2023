document.addEventListener("DOMContentLoaded", function() {

    
    document.getElementById("submit").addEventListener("click", function() {
        // Ici, tu peux appeler la fonction de traitement des données
        traiterDonnees();
    });

});

function traiterDonnees()
{
    // var age1 = generateUniformDiscrete(0,100);
    // var age2 = generateUniformDiscrete(0,100);

    // var famille1, famille2;
    // famille1 = generatePoisson(2);
    // famille2 = generatePoisson(2);

    var salaire1, salaire2;
    salaire1 = generateExponential(0.001);
    salaire2 = generateExponential(0.001);
    
    console.log(salaire1, salaire2);
}


// Fonction pour générer une variable aléatoire suivant une loi uniforme discrète entre a et b
function generateUniformDiscrete(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Fonction pour générer une variable aléatoire suivant une loi de Poisson avec une moyenne lambda
function generatePoisson(lambda) {
var L = Math.exp(-lambda);
var k = 0;
var p = 1;
while (p > L) {
k++;
p *= Math.random();
}
return k - 1;
}

// Fonction pour générer une variable aléatoire suivant une loi exponentielle avec un paramètre lambda
function generateExponential(lambda) {
return -Math.log(1 - Math.random()) / lambda;
}

// Fonction pour générer une variable aléatoire suivant une variable de Bernoulli avec une probabilité p de succès
function generateBernoulli(p) {
return Math.random() < p ? 1 : 0;
}

// Fonction pour générer une variable aléatoire suivant une loi normale avec une moyenne mu et un écart-type sigma
function generateNormal(mu, sigma) {
var u1 = Math.random();
var u2 = Math.random();
var z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
return mu + sigma * z;
}

// Fonction pour générer une variable aléatoire suivant une loi gamma avec une forme k et une échelle theta
function generateGamma(k, theta) {
if (k < 1) {
return generateGamma(1 + k, theta) * Math.pow(Math.random(), 1 / k);
} else {
var d = k - 1 / 3;
var c = 1 / Math.sqrt(9 * d);
while (true) {
var x = generateNormal(0, 1);
var v = Math.pow(1 + c * x, 3);
if (v > 0) {
    var u = Math.random();
    if (Math.log(u) < 0.5 * x ** 2 + d - d * v + d * Math.log(v)) {
    return d * v * theta;
    }
}
}
}
}