// 1. Imports
// ----------

import $ from "jquery";
import Foundation from 'foundation-sites';
import AOS from 'aos';
import {
  TimelineMax,
  CSSPlugin,
  ScrollToPlugin,
  Draggable
} from "gsap/all";
import Swup from 'swup';
import "lightGallery";
import "lg-fullscreen";
import "lg-video";
import SwupBodyClassPlugin from "@swup/body-class-plugin";


$( document ).ready( function() {
  function init() {

// 1. Special Queries
// ------------------

Foundation.Interchange.SPECIAL_QUERIES[ "medium-retina" ] = 'only screen and (min-width: 40em), (min-width: 40em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 40em) and (min--moz-device-pixel-ratio: 2), (min-width: 40em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 40em) and (min-device-pixel-ratio: 2), (min-width: 40em) and (min-resolution: 192dpi), (min-width: 40em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "large-retina" ] = 'only screen and (min-width: 64em), (min-width: 64em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 64em) and (min--moz-device-pixel-ratio: 2), (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 64em) and (min-device-pixel-ratio: 2), (min-width: 64em) and (min-resolution: 192dpi), (min-width: 64em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xlarge-retina" ] = 'only screen and (min-width: 75em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xxlarge-retina" ] = 'only screen and (min-width: 90em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';

// 1. Foundation
// -------------

$( document ).foundation();

// 1. Lightgallery
// ---------------

if ($("body").hasClass("project")) {
  $(".video" ).lightGallery( {
    counter: false,
    videoMaxWidth: '1080px',
    youtubePlayerParams: {
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0
    },
    vimeoPlayerParams: {
      autoplay: 1,
      title: 0,
      byline: 0,
      portrait: 0,
      color: 'FFFFFF'
    }
  } );
}



// 1. Loader
// ---------------

if ($("body").hasClass("home")) {
  $( ".loader" ).removeClass( "hide" );
  $( ".loader" ).addClass( "loading" );
  setTimeout( function() {
    $( ".loader" ).addClass( "loaded" );
  }, 2500 
  );
}

// 2. Animate on Scroll
// --------------------
$(function() {
  AOS.init({ 
   offset: 64,
   easing: 'ease-in-out-quart', 
   duration: 600
   });   
});

$(function() {
window.addEventListener('load', AOS.refresh);
});
   
// 2. Hover Effect
// ---------------
if ($("body").hasClass("home")) {
{
  const mapNumber = ( X, A, B, C, D ) => ( X - A ) * ( D - C ) / ( B - A ) + C;
  const getMousePos = ( e ) => {
    let posx = 0;
    let posy = 0;
    if ( !e ) e = window.event;
    if ( e.pageX || e.pageY ) {
      posx = e.pageX;
      posy = e.pageY;
    } else if ( e.clientX || e.clientY ) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy
    }
  }
  // Generate a random float.
  const getRandomFloat = ( min, max ) => ( Math.random() * ( max - min ) + min ).toFixed( 2 );
  /**
   * One class per effect. 
   * Lots of code is repeated, so that single effects can be easily used. 
   */
  // Effect 1
  class HoverImgFx1 {
    constructor( el ) {
      this.DOM = {
        el: el
      };
      this.DOM.reveal = document.createElement( 'div' );
      this.DOM.reveal.className = 'hover-reveal';
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
      this.DOM.el.appendChild( this.DOM.reveal );
      this.DOM.revealInner = this.DOM.reveal.querySelector( '.hover-reveal__inner' );
      this.DOM.revealInner.style.overflow = 'hidden';
      this.DOM.revealImg = this.DOM.revealInner.querySelector( '.hover-reveal__img' );
      this.initEvents();
    }
    initEvents() {
      this.positionElement = ( ev ) => {
        const mousePos = getMousePos( ev );
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop
        };
        this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
      };
      this.mouseenterFn = ( ev ) => {
        this.positionElement( ev );
        this.showImage();
      };
      this.mousemoveFn = ev => requestAnimationFrame( () => {
        this.positionElement( ev );
      } );
      this.mouseleaveFn = () => {
        this.hideImage();
      };
      this.DOM.el.addEventListener( 'mouseenter', this.mouseenterFn );
      this.DOM.el.addEventListener( 'mousemove', this.mousemoveFn );
      this.DOM.el.addEventListener( 'mouseleave', this.mouseleaveFn );
    }
    showImage() {
      TweenMax.killTweensOf( this.DOM.revealInner );
      TweenMax.killTweensOf( this.DOM.revealImg );
      this.tl = new TimelineMax( {
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set( this.DOM.el, {
            zIndex: 1000
          } );
        }
      } ).add( 'begin' ).add( new TweenMax( this.DOM.revealInner, 0.2, {
        ease: Sine.easeOut,
        startAt: {
          x: '-100%'
        },
        x: '0%'
      } ), 'begin' ).add( new TweenMax( this.DOM.revealImg, 0.2, {
        ease: Sine.easeOut,
        startAt: {
          x: '100%'
        },
        x: '0%'
      } ), 'begin' );
    }
    hideImage() {
      TweenMax.killTweensOf( this.DOM.revealInner );
      TweenMax.killTweensOf( this.DOM.revealImg );
      this.tl = new TimelineMax( {
        onStart: () => {
          TweenMax.set( this.DOM.el, {
            zIndex: 999
          } );
        },
        onComplete: () => {
          TweenMax.set( this.DOM.el, {
            zIndex: ''
          } );
          TweenMax.set( this.DOM.reveal, {
            opacity: 0
          } );
        }
      } ).add( 'begin' ).add( new TweenMax( this.DOM.revealInner, 0.2, {
        ease: Sine.easeOut,
        x: '100%'
      } ), 'begin' ).add( new TweenMax( this.DOM.revealImg, 0.2, {
        ease: Sine.easeOut,
        x: '-100%'
      } ), 'begin' );
    }
  }
  [ ...document.querySelectorAll( '[data-fx="1"] > a, a[data-fx="1"]' ) ].forEach( link => new HoverImgFx1( link ) );
}
}

}


// 2. Page Transitions
// -------------------
const options = {
  animationSelector: '[class*="swup-transition-"]',
  containers: [ '#swup-body', '#swup-header' ],
  plugins: [ new SwupBodyClassPlugin() ]
};
const swup = new Swup( options );

// 2. Run Once
// -----------
init();

swup.on( 'contentReplaced', init );

} );