
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre de manière classique

    // Ici, tu peux appeler la fonction de traitement des données
    traiterDonnees();
});