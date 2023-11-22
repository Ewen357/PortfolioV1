$(document).ready(() => {
    $('[data-anchor]').click(function () {
        $('html, body').animate({
            scrollTop: $('[data-target=' + $(this).attr('data-anchor') + ']').offset().top - 60
        }, 'slow');
    });

    $('[data-project]').click(function() {
        $('[data-project]').removeClass('active');
        $(this).addClass('active');
        $('.projects').removeClass('active');
        $('.projects--' + $(this).attr('data-project')).addClass('active');
    });

    Fancybox.bind(".gallery__item");
});

var icon = document.querySelector('.linkedin-icon');
var isBouncing = false;

window.addEventListener('scroll', function() {
  if (!isBouncing) {
    icon.classList.add('bounce');
    isBouncing = true;

    setTimeout(function() {
      icon.classList.remove('bounce');
      isBouncing = false;
    }, 1100); // Durée de l'animation (1.1s) pour supprimer la classe 'bounce' après l'animation complète
  }
});


var icon2 = document.querySelector('.fab2');
var isShaking = false;

window.addEventListener('click', function() {
  if (!isShaking) {
    icon2.classList.add('shake');
    isShaking = true;

    setTimeout(function() {
      icon2.classList.remove('shake');
      isShaking = false;
    }, 1100);
  }
});

function loadConfig(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "config/config.json", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var config = JSON.parse(xhr.responseText);
      callback(config);
    }
  };
  xhr.send(null);
}

// Exécuter le code après avoir chargé le fichier de configuration
$(document).ready(function() {
  // Charger le fichier de configuration
  loadConfig(function(config) {

    var mailjetApiKey = config.mailjet.api_key;
    var mailjetApiSecret = config.mailjet.api_secret;

    // Gérer la soumission du formulaire
    $('#contact-form').submit(function(event) {
      event.preventDefault(); // Empêche l'envoi du formulaire par défaut

      var formData = {
        'nom': $('input[name=nom]').val(),
        'prenom': $('input[name=prenom]').val(),
        'email': $('input[name=email]').val(),
        'message': $('textarea[name=message]').val()
      };

      // Appel à l'API Mailjet pour envoyer l'e-mail
      $.ajax({
        type: 'POST',
        url: 'https://api.mailjet.com/v3.1/send',
        dataType: 'json',
        data: {
          'Messages': [
            {
              'From': {
                'Email': 'ewen@ewenmalaquin.com',
                'Name': 'EwenPortfolio'
              },
              'To': [
                {
                  'Email': 'ewen.malaquin@gmail.com',
                  'Name': 'Ewen'
                }
              ],
              'Subject': 'Nouveau message de votre portfolio',
              'TextPart': formData.message,
              'HTMLPart': '<p>' + formData.message + '</p>'
            }
          ]
        },
        headers: {
          'Authorization': 'Basic ' + btoa(mailjetApiKey + ':' + mailjetApiSecret),
          'Content-Type': 'application/json'
        },
        success: function(data) {
          // Gérer la réponse réussie
          console.log('E-mail envoyé avec succès !');
        },
        error: function(error) {
          // Gérer les erreurs d'envoi de l'e-mail
          console.log('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
        }
      });
    });
  });
});