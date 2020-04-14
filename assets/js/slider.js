

// class Slider {
// 	constuctor() {
//		this.slide = document.getElementsByClassname('slider_item');
//		this.sliderLength = slide.length;

//		this.counter = 0;
//		

// 	}

// 	prev() {
// 		this.prevBtn = document.getElementsByClassname('arrowPrev');
// 	}
	
//  next {
//		this.nextBtn = document.getElementsByClassName('arrowNext');
//  }

// }


let prevBtn = document.querySelector('arrowPrev');
let nextBtn = document.querySelector('arrowNext');

let slide = document.querySelectorAll('slider_item');
let sliderLength = slide.length;

let counter = 0;

slide[counter].classList.add('active');

prevBtn.addEventListener('click', () => {
    slide[counter].classList.remove('active');
    counter--;

    if(counter < 0) {
        counter = sliderLength - 1;
    }

    slide[counter].classList.add('active');
});

nextBtn.addEventListener('click', () => {
    slide[counter].classList.remove('active');
    counter++;

    if(counter >= sliderLength) {
        counter = 0;
    }

    slide[counter].classList.add('active');
});