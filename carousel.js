function initializeCarousel(carousel) {
  var seats = carousel.querySelectorAll('.carousel-seat');

  var next = function (el) {
    if (el.nextElementSibling) {
      return el.nextElementSibling;
    } else {
      return seats[0];
    }
  };

  var progress = function () {
    var refEl = carousel.querySelector('.is-ref');
    if (refEl) {
      refEl.classList.remove('is-ref');
    }
    else {
      refEl = seats[0];
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

    setTimeout(function () {
      carousel.classList.add('is-set');
    }, 50);
  };

  setInterval(function () {
    progress();
  }, 2000);
}

// Observe the DOM for carousel elements being added
var observer = new MutationObserver(function (mutationsList, observer) {
  mutationsList.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(function (node) {
        if (node.classList && node.classList.contains('carousel')) {
          initializeCarousel(node);  // Initialize the carousel once it's added to the DOM
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Start observing the document body for child elements being added
  observer.observe(document.body, { childList: true, subtree: true });

  // Optionally, check if the carousel is already in the DOM and initialize it
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    initializeCarousel(carousel);
  });
}); 
