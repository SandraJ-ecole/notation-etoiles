document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const stars = document.querySelectorAll('.star');
    const submitButton = document.getElementById('submit-button');
    const ratingCard = document.getElementById('rating-card');
    const thankYouCard = document.getElementById('thank-you-card');
    const ratingValue = document.getElementById('rating-value');
    
    let selectedRating = 0;
    
    // Ajouter les chiffres dans les cercles
    stars.forEach((star, index) => {
        // Récupérer l'icône de cercle existante
        const circle = star.querySelector('i');
        
        // Créer un conteneur positionné relativement
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        
        // Créer l'élément span pour le chiffre
        const numberSpan = document.createElement('span');
        numberSpan.textContent = index + 1;
        numberSpan.style.position = 'absolute';
        numberSpan.style.top = '50%';
        numberSpan.style.left = '50%';
        numberSpan.style.transform = 'translate(-50%, -50%)';
        numberSpan.style.color = 'white';
        numberSpan.style.fontWeight = 'bold';
        numberSpan.style.fontSize = '1.1rem';
        numberSpan.style.zIndex = '5';
        
        // Remplacer le contenu de l'étoile par notre nouveau contenu
        star.innerHTML = '';
        container.appendChild(circle.cloneNode(true));
        container.appendChild(numberSpan);
        star.appendChild(container);
    });
    
    // Fonction pour mettre à jour l'apparence des étoiles
    function updateStars(hoverIndex = 0) {
        stars.forEach((star, index) => {
            const starValue = parseInt(star.getAttribute('data-value'));
            
            // Réinitialiser les classes
            star.classList.remove('hovered', 'selected');
            
            // Ajouter la classe 'hovered' pour les étoiles survolées
            if (hoverIndex > 0 && starValue <= hoverIndex) {
                star.classList.add('hovered');
            }
            
            // Ajouter la classe 'selected' pour les étoiles sélectionnées
            if (selectedRating > 0 && starValue <= selectedRating) {
                star.classList.add('selected');
            }
        });
        
        // Activer/désactiver le bouton d'envoi
        submitButton.disabled = selectedRating === 0;
    }
    
    // Événements pour les étoiles
    stars.forEach(star => {
        // Événement au survol
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.getAttribute('data-value'));
            updateStars(value);
        });
        
        // Événement à la sortie du survol
        star.addEventListener('mouseleave', function() {
            updateStars();
        });
        
        // Événement au clic
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            selectedRating = value;
            updateStars();
        });
        
        // Événements pour le support clavier (accessibilité)
        star.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                const value = parseInt(this.getAttribute('data-value'));
                selectedRating = value;
                updateStars();
                event.preventDefault();
            }
        });
        
        // Rendre les étoiles focusables
        star.setAttribute('tabindex', '0');
    });
    
    // Événement pour le bouton d'envoi
    submitButton.addEventListener('click', function() {
        // Mettre à jour la valeur de la note dans le message de remerciement
        ratingValue.textContent = selectedRating;
        
        // Cacher la carte de notation et afficher le message de remerciement
        ratingCard.classList.add('d-none');
        thankYouCard.classList.remove('d-none');
        thankYouCard.classList.add('fade-in');
    });
});