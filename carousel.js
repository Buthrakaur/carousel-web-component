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
      //console.log(new_seat);
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


function injectCSS(styles) {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

document.addEventListener("DOMContentLoaded", function () {
  // Start observing the document body for child elements being added
  observer.observe(document.body, { childList: true, subtree: true });

  // Optionally, check if the carousel is already in the DOM and initialize it
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    initializeCarousel(carousel);
  });

  // inject CSS directly to eliminate the need to include CSS file besides JS

  injectCSS(`
.wrap {
  overflow: hidden;
}

.carousel {
  display: flex;
  left: -100%;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  transform: translateX(100%);
}
@media (min-width: 30em) {
  .carousel {
    left: -33.33333%;
    transform: translateX(33.33333%);
  }
}
@media (min-width: 40em) {
  .carousel {
    left: -20%;
    transform: translateX(20%);
  }
}

.carousel.is-reversing {
  transform: translateX(-100%);
}
@media (min-width: 30em) {
  .carousel.is-reversing {
    transform: translateX(-33.33333%);
  }
}
@media (min-width: 40em) {
  .carousel.is-reversing {
    transform: translateX(-20%);
  }
}

.carousel.is-set {
  transform: none;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.carousel-seat {
  flex: 1 0 33.33333%;
  order: 2;
  line-height: 100px;
  text-align: center;
}
@media (min-width: 30em) {
  .carousel-seat {
    flex-basis: 33.33333%;
  }
}
@media (min-width: 40em) {
  .carousel-seat {
    flex-basis: 20%;
  }
}

.carousel-seat > img {
  vertical-align: middle;
}

.carousel-seat.is-ref {
  order: 1;
}

.carousel-seat img {
  max-width: 150px;
  max-height: 100px;
  object-fit: cover;
}
    `);
}); 

