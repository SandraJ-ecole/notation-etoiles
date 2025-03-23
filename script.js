document.addEventListener('DOMContentLoaded', function() {// Attendez que le DOM soit chargé
    // Récupérer les éléments HTML
    const stars = document.querySelectorAll('.star');// Récupérer toutes les étoiles
    const submitButton = document.getElementById('submit-button');// Récupérer le bouton d'envoi
    const ratingCard = document.getElementById('rating-card');// Récupérer la carte d'évaluation
    const thankYouCard = document.getElementById('thank-you-card');// Récupérer le message de remerciement
    const ratingValue = document.getElementById('rating-value');// Récupérer la valeur de la note
    
    let selectedRating = 0;// Variable pour stocker la note choisie
    
    // Ajouter les chiffres dans les cercles
    stars.forEach((star, index) => {// Parcourir toutes les étoiles et ajouter les chiffres dans les cercles existants avec un conteneur positionné relativement et un span pour le chiffre dans le cercle existant 
        
        const circle = star.querySelector('i');// Récupérer l'icône de cercle existante
        
        const container = document.createElement('div');// Créer un conteneur pour le chiffre 
        container.style.position = 'relative';// Positionnement relatif pour le conteneur 
        container.style.display = 'inline-block';// Afficher le conteneur en ligne         
        
        const numberSpan = document.createElement('span');// Créer un span pour le chiffre 
        numberSpan.textContent = index + 1;// Afficher le chiffre dans le span 
        numberSpan.style.position = 'absolute';// Positionnement absolu pour le span 
        numberSpan.style.top = '50%';// Positionner le span au milieu verticalement 
        numberSpan.style.left = '50%';// Positionner le span au milieu horizontalement 
        numberSpan.style.transform = 'translate(-50%, -50%)';// Positionner le span au milieu verticalement et horizontalement 
        numberSpan.style.color = 'white';// Couleur du texte du span 
        numberSpan.style.fontWeight = 'bold';// Gras du texte du span
        numberSpan.style.fontSize = '1.1rem';// Taille du texte du span
        numberSpan.style.zIndex = '5';// Z-index du span
        
        // Remplacer le contenu de l'étoile par notre nouveau contenu
        star.innerHTML = '';// Effacer le contenu de l'étoile existante 
        container.appendChild(circle.cloneNode(true));// Ajouter l'icône de cercle existante dans le conteneur 
        container.appendChild(numberSpan);// Ajouter le span du chiffre dans le conteneur
        star.appendChild(container);// Ajouter le conteneur au conteneur principal
    });
    
    // Fonction pour mettre à jour l'apparence des étoiles
    function updateStars(hoverIndex = 0) {// Fonction pour mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
        stars.forEach((star, index) => {// Parcourir toutes les étoiles et mettre à jour leur apparence en fonction de la note choisie et du survol de l'utilisateur
            const starValue = parseInt(star.getAttribute('data-value'));// Récupérer la valeur de l'etoile (en tant que nombre entier) 
            
            // Réinitialiser les classes
            star.classList.remove('hovered', 'selected');// Supprimer les classes 'hovered' et 'selected' de toutes les étoiles 
            
          
            if (hoverIndex > 0 && starValue <= hoverIndex) {// Si l'utilisateur survole une étoile, ajouter la classe 'hovered'
                star.classList.add('hovered');// Ajouter la classe 'hovered' aux étoiles survolées 
            }            
            
            if (selectedRating > 0 && starValue <= selectedRating) {// Si une note est choisie, ajouter la classe 'selected' aux étoiles choisies 
                star.classList.add('selected');// Ajouter la classe 'selected' aux étoiles choisies 
            }
        });
                
        submitButton.disabled = selectedRating === 0;// Activer le bouton d'envoi si une note est choisie, sinon desactiver le bouton d'envoi 
    }
    
    // Événements pour les étoiles

    stars.forEach(star => {// Parcourir toutes les étoiles et ajouter les événements au survol, à la sortie du survol et au clic        
        //Événement au survol       
        star.addEventListener('mouseenter', function() {// Mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
            const value = parseInt(this.getAttribute('data-value'));// Récupérer la valeur de l'etoile (en tant que nombre entier) 
            updateStars(value);// Mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
        });
        
        // Événement à la sortie du survol
        star.addEventListener('mouseleave', function() {// Mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
            updateStars();// Mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
        });
        
        // Événement au clic
        star.addEventListener('click', function() {// Mettre à jour la note choisie et mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
            const value = parseInt(this.getAttribute('data-value'));// Récupérer la valeur de l'etoile (en tant que nombre entier) 
            selectedRating = value;// Mettre à jour la note choisie 
            updateStars();// Mettre à jour l'apparence des étoiles en fonction de la note choisie et du survol de l'utilisateur 
        });
        
        // Événements pour le support clavier (accessibilité)
        star.addEventListener('keydown', function(event) {// Mettre à jour la note choisie et mettre à jour l'apparence des étoiles en fonction de la note choisie et de la survol de l'utilisateur 
            if (event.key === 'Enter' || event.key === ' ') {// Si l'utilisateur appuie sur la touche "Entrer" ou la touche "Espace" 
                const value = parseInt(this.getAttribute('data-value'));// Récupérer la valeur de l'etoile (en tant que nombre entier) 
                selectedRating = value;// Mettre à jour la note choisie 
                updateStars();// Mettre à jour l'apparence des étoiles en fonction de la note choisie et de la survol de l'utilisateur 
                event.preventDefault();//Empecher le comportement par défaut de la touche "Entrer"
            }
        });        
        // Rendre les étoiles focusables
        star.setAttribute('tabindex', '0');
    });
    
    // Événement pour le bouton d'envoi
    submitButton.addEventListener('click', function() {// Mettre à jour l'apparence des étoiles en fonction de la note choisie et dusurvol de l'utilisateur 
     
        ratingValue.textContent = selectedRating;// Mettre à jour la valeur de la note dans le message de remerciement 
        ratingCard.classList.add('d-none');// Cacher la carte de notation et afficher le message de remerciement 
        thankYouCard.classList.remove('d-none');// Afficher le message de remerciement 
        thankYouCard.classList.add('fade-in');// Ajouter la classe 'fade-in' au message de remerciement pour l'animation 
    });
});
