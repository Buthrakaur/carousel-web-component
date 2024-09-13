function initializeCarousels(){
    document.querySelectorAll('.carousel').forEach(function(carousel) {
        var seats = carousel.querySelectorAll('.carousel-seat');
    
        var next = function(el) {
          if (el.nextElementSibling) {
            return el.nextElementSibling;
          } else {
            return seats[0];
          }
        };
    
        var progress = function() {
          var refEl = carousel.querySelector('.is-ref');
          if (refEl) {
            refEl.classList.remove('is-ref');
          }
    
          var new_seat = next(refEl);
    
          new_seat.classList.add('is-ref');
          new_seat.style.order = 1;
    
          for (var i = 2, ref = seats.length; i <= ref; i++) {
            new_seat = next(new_seat);
            new_seat.style.order = i;
            console.log(new_seat);
          }
    
          carousel.classList.remove('is-set');
    
          setTimeout(function() {
            carousel.classList.add('is-set');
          }, 50);
        };
    
        setInterval(function() {
          progress();
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', initializeCarousels);