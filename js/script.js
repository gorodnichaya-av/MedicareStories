'use strict';

// Header screen
const headerScrollStart = document.querySelector('.js-header').offsetTop,
      headerScrollStop = document.querySelector('.js-header').offsetHeight + headerScrollStart,
      headerLogo = document.querySelector('.js-logo'),
      headerMenu = document.querySelector('.js-menu');

window.addEventListener('scroll', () => {
  if (this.scrollY > (headerScrollStop / 3)) {
    headerLogo.classList.add('small');
    headerMenu.classList.add('colored');
  } else {
    headerLogo.classList.remove('small');
    headerMenu.classList.remove('colored');
  }
});


// Horizontal scroll content
const container = document.querySelector('.js-horizontal-items'),
    containerScroll = document.querySelector('.js-horizontal-scroll');

window.addEventListener("scroll", function () {
    horizontalScroll();
});

function horizontalScroll() {
    let y = window.scrollY - containerScroll.offsetTop;

    container.scrollTo({left: y})
}


// Ball slides on line

const scrollContent = document.querySelector('.scroll-container'),
      scrollContentHeight = scrollContent.scrollHeight,
      path = document.getElementById('uncert__timeline__passed'),
      obj = document.getElementById('obj'),
      pathLength = Math.floor(path.getTotalLength()),
      verticalScrollStart = scrollContent.offsetTop,
      verticalScrollStop = scrollContentHeight + verticalScrollStart;

// Move obj element along path based on percentage of total length
function moveObj(prcnt) {
    prcnt = (prcnt * pathLength) / 100;
    console.log(prcnt);
    // Get x and y values at a certain point in the line
    pt = path.getPointAtLength(prcnt);
    pt.x = Math.round(pt.x);
    pt.y = Math.round(pt.y);

    obj.style.transform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px, 0)';
    path.setAttribute('stroke-dashoffset', (pathLength - prcnt));
}

// Initialize
// moveObj(0);

// Scroll functionality

/*scrollContent.addEventListener('scroll', function() {
  console.log(this.scrollY);
  let percentValue = (this.scrollY / (scrollContentHeight - window.innerHeight)) * 100;
  console.log(percentValue);
  moveObj(percentValue);
});*/

window.addEventListener('scroll', function () {

  let percentValue = (this.scrollY / (scrollContentHeight - window.innerHeight)) * 10;
  console.log(percentValue);

  // moveObj(percentValue);
});