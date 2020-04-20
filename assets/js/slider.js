

class Slider {
	constructor(domTarget) {
		this.dom = document.createElement("slideReader");
		domTarget.appendChild(this.dom);
		this.mainTemplate();		
		
		// var figures = document.querySelectorAll('.slider figure');
		// this.prev();
		// this.next();

	}

	mainTemplate(){
    this.dom.innerHTML = `
      	<a class="arrowPrev" href=""> <i class="fa fa-arrow-left" aria-hidden="true">  </i></a>
		<a class="pauseBtn" href="">  <i class="fa fa-pause" aria-hidden="true">       </i></a>
		<a class="playBtn" href="">   <i class="fa fa-play" aria-hidden="true">        </i></a>
		<a class="arrowNext" href=""> <i class="fa fa-arrow-right" aria-hidden="true"> </i></a>
    `;
  	}

	prev() {
		var prevBtn = document.querySelector('.arrowPrev');

		prevBtn.addEventListener('click', function(){

		});
	}
    next() {
    	var nextBtn = document.querySelector('.arrowNext');

    	nextBtn.addEventListener('click', function(){
			
		});
 	}
}


// let prevBtn = document.querySelector('arrowPrev');
// let nextBtn = document.querySelector('arrowNext');

// let slide = document.querySelectorAll('slider_item');
// let sliderLength = slide.length;

// let counter = 0;

// slide[counter].classList.add('active');

// prevBtn.addEventListener('click', () => {
//     slide[counter].classList.remove('active');
//     counter--;

//     if(counter < 0) {
//         counter = sliderLength - 1;
//     }

//     slide[counter].classList.add('active');
// });

// nextBtn.addEventListener('click', () => {
//     slide[counter].classList.remove('active');
//     counter++;

//     if(counter >= sliderLength) {
//         counter = 0;
//     }

//     slide[counter].classList.add('active');
// });