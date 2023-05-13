'use strict';

// add arrows to nav items with children
const morelink = document.querySelectorAll('.more-link'),
      svgArrow = document.createElement('span');

svgArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/></svg>`;

morelink.forEach(elem => {
  elem.append(svgArrow.cloneNode(true));
});

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

// Napkins moving

const napkins = document.querySelectorAll('.js-napkin');

napkins.forEach(elem => {
  var isDown = false,
      offset = [0,0];
  
  

  elem.addEventListener('mousedown', startMoving, true);
  elem.addEventListener('touchstart', startMoving, true);

  elem.addEventListener('mouseup', endMoving, true);
  elem.addEventListener('touchend', endMoving, true);

  elem.addEventListener('mousemove', moving, true);
  elem.addEventListener('touchmove', moving, true);
  
  function startMoving(e) {
    isDown = true;
    offset = [
      elem.offsetLeft - e.clientX,
      elem.offsetTop - e.clientY
    ];
  }

  function endMoving() {
    isDown = false;
  }

  function moving(event) {
    event.preventDefault();
    if (isDown) {
        let mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        elem.style.left = (mousePosition.x + offset[0]) + 'px';
        elem.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
  }
});



// Horizontal scroll content
// const containerScroll = document.querySelectorAll('.js-horizontal-scroll'),
//        container = containerScroll.querySelector('.js-horizontal-items');

// window.addEventListener("scroll", function () {
//      horizontalScroll();
// });

// function horizontalScroll() {
//      let y = window.scrollY - containerScroll.offsetTop;

//      container.scrollTo({left: y})
// }


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
 // console.log(percentValue);

  // moveObj(percentValue);
});