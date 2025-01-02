// for locomotive to work we take it from locomotive js github 
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'), // el woh main container hota hai jiske ander puri website hoti hai like wrapper
    smooth: true
});


// function of circle to follow cursor
function circleMouseFollow(xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector('.minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
};

// Animate nav bar and hero section headings with GSAP 
function firstPageAnim() {
    var tl = gsap.timeline();
  
    tl.from(".nav", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    })
      .to(".boundingElement", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2,
      })
      .from(".heroFooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
      });
}

// jab bhi cursor tej move hoga toh apna circle skew hoga ek minimum or max value tk 

var timeout;

function skewCircle() {
 // default scale of circle 
    var xscale = 1;
    var yscale = 1;

    // starting m pointer ke coordinates 
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        // jab bhi hum pointer slow move karenge toh 100ms delay banta rahega yeh ush delay ko clear karega jab tk hum pointer move karte rahenge 
        clearTimeout(timeout);

   // pointer ke do position (clientX and xprev same for y also) ke beech ki duri ko apni mini value (0.8) and max value (1.2) ke according circle ko scale karenge 
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollow(xscale, yscale);

// jab bhi apna pointer rukega toh uska scale 100ms ke baad normal ho jayega 
        timeout = setTimeout(function() {
            document.querySelector('.minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

circleMouseFollow();
skewCircle();
firstPageAnim();

// For image to show on our element
document.querySelectorAll(".element").forEach(function (element) {
  var rotate = 0;
  var diffrot = 0;

  element.addEventListener("mousemove", function(dets){

    var diff = dets.clientY - element.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(element.querySelector("img"),{
      opacity: 1,
      ease: Power1,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  element.addEventListener("mouseleave", function (dets) {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

});

