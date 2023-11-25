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

