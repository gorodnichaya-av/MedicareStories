'use strict';

// scroll to top page on reload
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// add arrows to nav items with children
const morelink = document.querySelectorAll('.more-link'),
    svgArrow = document.createElement('span');

svgArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/></svg>`;

morelink.forEach(elem => {
    elem.append(svgArrow.cloneNode(true));
});

// Header screen
const 
    header = document.querySelector('.js-header'),
    headerScrollStart = document.querySelector('.js-header').offsetTop,
    headerScrollStop = document.querySelector('.js-header').offsetHeight + headerScrollStart,
    headerLogo = document.querySelector('.js-logo'),
    headerMenuContainer = document.querySelector('.js-menu-container');

window.addEventListener('scroll', () => {
    if (this.scrollY > 100) {
        headerLogo
            .classList
            .add('small');
        headerMenuContainer
            .classList
            .add('colored');
        header.classList.add('colored');
    } else {
        headerLogo
            .classList
            .remove('small');
        headerMenuContainer
            .classList
            .remove('colored');
            header.classList.remove('colored');
    }
});

jQuery(document).ready(function() {
    const menuBtn = $('.js-menu-btn'),
          subMenuBtn = $('.js-submenu-btn'),
          mainMenu = $('.js-menu')

    // Show/hide main-menu
    menuBtn.on('click', function(e) {
        e.preventDefault();
        const parent = $(this).closest('header');

        if (parent.hasClass('opened')) {
            parent.removeClass('opened');
            mainMenu.fadeOut();
            $('body').removeClass('overflow');
        } else {
            parent.addClass('opened'); 
            mainMenu.fadeIn();
            $('body').addClass('overflow');
        }
    });

     // Show/hide sub-menu
    subMenuBtn.on('click', function(e) {
        e.preventDefault();
        const parent = $(this).closest('li'),
              subMenu = parent.find('.js-submenu');

        mainMenu.find('.active').removeClass('active');
        parent.addClass('active');

        if (parent.hasClass('opened')) {
            parent.removeClass('opened');
            subMenu.slideUp();
        } else {
            parent.addClass('opened'); 
            subMenu.slideDown();
        }
    });

    // slider for percents on mobile

    const windowWidth = window.innerWidth;

    if (windowWidth < 1280) {

        $('.percents__items').slick({
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            fade: true,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }
});



// Napkins moving

const napkins = document.querySelectorAll('.js-napkin');

napkins.forEach(elem => {
    var isDown = false,
        offset = [0, 0];

    elem.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [
            elem.offsetLeft - e.clientX,
            elem.offsetTop - e.clientY
        ];
    }, true);

    elem.addEventListener('touchstart', function (e) {
        isDown = true;
        offset = [
            elem.offsetLeft - e.touches[0].clientX,
            elem.offsetTop - e.touches[0].clientY
        ];
    }, true);

    elem.addEventListener('mouseup', endMoving, true);
    elem.addEventListener('touchend', endMoving, true);

    document.addEventListener('mousemove', function (event) {
        event.preventDefault();
        if (isDown) {
            let mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            elem.style.left = (mousePosition.x + offset[0]) + 'px';
            elem.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
        if (isDown) {
            let touchPosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
            elem.style.left = (touchPosition.x + offset[0]) + 'px';
            elem.style.top = (touchPosition.y + offset[1]) + 'px';
        }
    }, true);

    function endMoving() {
        isDown = false;
    }
});

// Horizontal scroll content
const horizontalScrollContainer = document.querySelectorAll('.js-horizontal-scroll');

horizontalScrollContainer.forEach(item => {
    const horizontalItems = item.querySelector('.js-horizontal-items');

    window.addEventListener("scroll", function () {
        horizontalScroll(item, horizontalItems);
    });
});

function horizontalScroll(parent, items) {
    let y = window.scrollY - parent.offsetTop;
    items.scrollTo({left: y});

    if (parent.classList.contains('approaches') && y > 0) {
        document
            .querySelector('.neon-arrow-scroll')
            .hidden = true;
        document
            .querySelector('.js-neon-arrow')
            .classList
            .add('visible');
        journeyWord.classList.remove('fixed');
    } else {
        document
            .querySelector('.neon-arrow-scroll')
            .hidden = false;
        document
            .querySelector('.js-neon-arrow')
            .classList
            .remove('visible');
    }
};

// Parallax elements

const parallaxElements = document.querySelectorAll('.js-photos-item'),
      parallaxElementsStart = document.querySelector('.js-photos').offsetTop,
      parallaxPatentHeight = document.querySelector('.js-photos').offsetHeight,
      parallaxElementsStop = parallaxElementsStart + parallaxPatentHeight;

function parallaxPhotos(elem, scrollYVal) {
    const dataScrollY = elem.getAttribute('data-initial-scroll'),
          parallaxMoving = dataScrollY - (scrollYVal * dataScrollY / 100) * (1 + dataScrollY * 3 / 100);

    elem.style.transform = 'translate3d(0px ,' + parallaxMoving + '%, 0px)'
}

function parallaxInitElem(elem) {
    const dataScrollY = elem.getAttribute('data-initial-scroll');
    elem.style.transform = 'translate3d(0px ,' + dataScrollY + '%, 0px)'
}

parallaxElements.forEach(item => {
    parallaxInitElem(item);

    window.addEventListener('scroll', function () {
        let indexScroll = 1;
        if (this.scrollY > (parallaxElementsStart - parallaxPatentHeight / 5) && this.scrollY < parallaxElementsStop) {
            indexScroll = (this.scrollY - parallaxElementsStart) / parallaxPatentHeight * 100; 
            if (indexScroll > 20) {
                item.classList.add('colored');
            } else {
                item.classList.remove('colored');
            }
            parallaxPhotos(item, indexScroll);
        } else if (this.scrollY >= parallaxElementsStop) {
            indexScroll = 100;
        }
        
    });
});

// Money bug animation

const moneyBugContainer = document.querySelector('.js-money-bug-container'),
      moneyBug = moneyBugContainer.querySelector('.js-money-bug'),
      moneyLines = moneyBugContainer.querySelectorAll('.js-money-line'),
      moneyBugStart = moneyBugContainer.offsetTop,
      moneyBugContainerHeight = moneyBugContainer.offsetHeight;

var initialHeightArray = [],
    initialTopArray = [];
moneyLines.forEach((item) => {
  const initialHeight = item.offsetHeight,
        itemTop = item.offsetTop;
  initialHeightArray.push(initialHeight);
  initialTopArray.push(itemTop);
});     

window.addEventListener('scroll', function () {
    let percentVal,
        centerWindow = this.scrollY + (this.innerHeight / 2);
    if (centerWindow < moneyBugStart) {
        percentVal = 1;
    } else if (centerWindow < (moneyBugStart + moneyBugContainerHeight / 4)) {
        percentVal = (centerWindow - moneyBugStart) / moneyBugContainerHeight * 100;
    } else {
        percentVal = 100;
    }

    moneyLines.forEach((item, i) => {
      const itemHide = initialTopArray[i] + initialHeightArray[i] + 200;

      if ((centerWindow - moneyBugStart) > initialTopArray[i] && (centerWindow - moneyBugStart) < itemHide) {
        item.style.height = `${initialHeightArray[i]}px`;
        item.style.top = `${initialTopArray[i]*1.8}px`;
        item.classList.remove('bg-hidden')
      } else if ((centerWindow - moneyBugStart) >= itemHide){
        item.style.height = `${initialHeightArray[i]}px`;
        item.classList.add('bg-hidden');
        
      } else {
        item.style.height = '0px';
        item.style.top = `${initialTopArray[i]}px`; 
      }
    });

    movingBug(percentVal);
});

function movingBug(percent) {
    let scaleVal = 0.5 + (percent * 0.5 / 100),
        rotateVal = -45 + (percent * 45 / 100);
    moneyBug.style.transform = `translate(-50%, -50%) scale(${scaleVal}) rotate(${rotateVal}deg) `;
}

// Coins functionallity
const coinsWrap = document.querySelector('.js-coins'),
      coinsArray = coinsWrap.querySelectorAll('.js-coin'),
      coinsTop = coinsWrap.offsetTop,
      coinsContainerHeight = document.querySelector('.js-percents').offsetHeight,
      coinsContainerStart = document.querySelector('.js-percents').offsetTop,
      percentsArray = document.querySelectorAll('.percents__item'),
      percentsCount = percentsArray.length,
      percentItemHeight = coinsContainerHeight / percentsCount;

var initialCoinPosition = []; // initial values of X,Y positions of coints
coinsArray.forEach((item, i) => {
  initialCoinPosition.push({
    pageX: getOffset(item).left,
    pageY: getOffset(item).top,
    parentX: item.offsetLeft,
    parentY: item.offsetTop
  });
});
// moving conins on scroll
window.addEventListener('scroll', function() {
    let percentVal,
        centerWindow = this.scrollY + (this.innerHeight / 2);
    
    var counterItems = 0;
    for (let i = 0; i < percentsCount; i++) {
        if (this.scrollY >= (coinsContainerStart + percentItemHeight * i)) {
            counterItems = i;
        }
    }

    if (this.scrollY < coinsContainerStart + coinsTop) { // window Scroll < (offset Top of main coin's parent (percents) + real negative top of coin's parent (coint-wrap))
        percentVal = 1;
        coinsWrap.classList.remove('fixed');
        coinsWrap.classList.remove('bottom-absolute');
    } else if (this.scrollY >= (coinsContainerStart + coinsTop) && this.scrollY <= (coinsContainerStart + coinsContainerHeight - percentItemHeight + this.innerHeight / 2)) {
        coinsWrap.classList.add('fixed');
        if (this.scrollY < coinsContainerStart) {
            percentVal = (this.scrollY - coinsContainerStart - coinsTop) / (-coinsTop) * 100;
        } else {
            percentVal = 100;
        }
        coinsWrap.classList.remove('bottom-absolute');
    } else {
        coinsWrap.classList.remove('fixed');
        coinsWrap.classList.add('bottom-absolute');
        percentVal = 100;
    }

    movingCoins(percentVal, counterItems);
});
// get Offset of coins
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function movingCoins(percent, counter) {
    let scaleVal = 1 + (percent * 0.5 / 100),
        rotateVal,
        skewVal;

    coinsArray.forEach((item, i) => {
        const indexVal = i;

        let positionXVal = initialCoinPosition[i].pageX,
            leftVal = initialCoinPosition[i].parentX,
            topVal = initialCoinPosition[i].parentY,
            finishTop,
            sumTop;

        switch (indexVal) {
            case 0:
                rotateVal = (counter % 2 === 0) ?  10 + (percent * 27 / 100) : -(10 + (percent * 27 / 100)); // 10 - initial value of rotate, 27 - changing of value = finish value = 37deg
                skewVal = 0 - (percent * 15 / 100); // 0 - initial value of skew, 15 - changing of value = finish value = -15deg
                leftVal = leftVal - (percent * positionXVal / 100);
                item.style.left = `${leftVal}px`;
                item.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg) skew(${skewVal}deg)`;
              break;
            case 1:
                finishTop = 101,  // 101 - space from top
                sumTop = finishTop - topVal;
                topVal = topVal + (percent * sumTop / 100);
                leftVal = leftVal + (percent * (window.innerWidth*0.122) / 100); // window.innerWidth*0.122 - moving space to left in percent of window width (12,2%)
                rotateVal = (counter % 2 === 0) ? -25 + (percent * 50 / 100) : -25 + (percent * 70 / 100);
                item.style.top = `${topVal}px`;
                item.style.left = `${leftVal}px`;
                item.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg)`;
              break;
            case 2:
                positionXVal = 0 - (percent * positionXVal / 80);
                item.style.transform = `scale(${scaleVal}) rotate(-40deg) translate(${positionXVal}px)`; 
              break;    
            case 3:
                finishTop = window.innerHeight - 50 - item.offsetHeight,  // 50 - space from bottom
                sumTop = finishTop - topVal;
                rotateVal = rotateVal = (counter % 2 === 0) ? 35 - (percent * 10 / 100) : -(35 - (percent * 10 / 100));
                topVal = topVal + (percent * sumTop / 100);
                leftVal = leftVal + (percent * (window.innerWidth*0.235) / 100); // window.innerWidth*0.122 - moving space to left in percent of window width (18,4%)
                item.style.top = `${topVal}px`;
                item.style.left = `${leftVal}px`;
                item.style.transform = `scale(${scaleVal}) rotate(${rotateVal}deg)`; 
            break;  
            case 4:
                positionXVal = 0 - (percent * positionXVal / 100);
                item.style.transform = `scale(${scaleVal}) translate(${positionXVal}px, ${positionXVal}px)`; 
            break;            
            default:
                rotateVal = 0;
          }

          item.style.opacity = `0.8`;
          
    });
   
}


// Words position 
const goalsWord = document.querySelector('.js-word-goals'),
      goalsWordTop = goalsWord.offsetTop,
      journeyWord = document.querySelector('.js-word-journey'),
      journeyWordTop = journeyWord.offsetTop;

window.addEventListener('scroll', function() {
    const journeyStop = document.querySelector('.approaches').offsetTop + document.querySelector('.approaches').offsetHeight - (this.innerHeight),
          goalsStop = coinsContainerStart + coinsContainerHeight;

    if (this.scrollY > (goalsWordTop + 80) && this.scrollY < goalsStop) {
        goalsWord.classList.add('fixed');
    } else {
        goalsWord.classList.remove('fixed');
    }
    if (this.scrollY > (journeyWordTop + 80) && this.scrollY < journeyStop) {
        journeyWord.classList.add('fixed');
    } else {
        journeyWord.classList.remove('fixed');
    } 
});

// Ball slides on line

const verticalScrollContent = document.querySelectorAll('.js-vertical-scroll');

window
    .addEventListener('scroll', function () {
        verticalScrollContent.forEach(item => {
            const verticalId = item.getAttribute('data-vertical'), 
                  verticalScrollContentStart = document.querySelector(`[${verticalId}]`),
                  verticalScrollContentHeight = item.offsetHeight,
                  verticalPath = item.querySelector('.vertical-scroll-path-passed'),
                  verticalBall = item.querySelector('.vertical-scroll-ball'),
                  verticalPathLength = Math.floor(verticalPath.getTotalLength()),
                  verticalScrollStart = verticalScrollContentStart.offsetTop,
                  verticalScrollStop = verticalScrollContentHeight + verticalScrollStart,
                  centerWindow = this.scrollY + (this.innerHeight / 2); 
            
            let percentValue;

              if (this.scrollY < (verticalScrollStart - (this.innerHeight / 2))) {
                  percentValue = 0;
              } else if (centerWindow >= (verticalScrollStart) && centerWindow <= verticalScrollStop) {
                  percentValue = (centerWindow - verticalScrollStart) / verticalScrollContentHeight * 100;
              } else {
                  percentValue = 100;
              }
              
              moveObj(percentValue, verticalBall, verticalPath, verticalPathLength);
        });
    });

// Move obj element along path based on percentage of total length
function moveObj(prcnt, ball, path, pathLenth) {
    prcnt = (prcnt * pathLenth) / 100;
    // Get x and y values at a certain point in the line
    let pt = path.getPointAtLength(prcnt);
    pt.x = Math.round(pt.x);
    pt.y = Math.round(pt.y);

    ball.style.transform = 'translate3d(' + pt.x + 'px,' + pt.y + 'px, 0)';
    path.setAttribute('stroke-dashoffset', (pathLenth - prcnt));
}