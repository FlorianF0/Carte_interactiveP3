/**
* Class Canva
*
* Gére le canva (pc / mobile)
*
*/
class Canva {
	constructor(domTarget, domSecond) {
		webBike.canva = this;
		this.dom = document.createElement('canvas');
		this.dom.id = "canvas";
		this.dom.height = "80";
		this.dom.width = "225";


		domTarget.insertBefore(this.dom, domSecond);

    this.isDrawing = false;
	    this.prevPoint = {
		  x : 0,
		  y : 0	
		};

		this.prevPointMobil = {
			x : 0,
			y : 0
		}

    this.context = this.dom.getContext('2d');

    this.dom.onmousedown = this.start.bind(this);
    this.dom.onmousemove = this.draw.bind(this);
    this.dom.onmouseup   = this.stop.bind(this);

    this.dom.ontouchstart =  this.startM.bind(this);
    this.dom.ontouchmove  = this.drawM.bind(this);
    this.dom.ontouchend   = this.stopM.bind(this);

    // console.log(touchstart())
    //évènements mobiles : https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Events/Touch_events
    //dessiner dans le canvas : https://developer.mozilla.org/fr/docs/Web/API/Element/mousedown_event
	}

	start(event){
		// console.log("start",event, this);
	    this.rect 	 = this.dom.getBoundingClientRect();

		this.isDrawing = true;

		this.prevPoint = {
		  x : event.clientX - this.rect.left,
		  y : event.clientY - this.rect.top	
		};
	}

	draw(event){
		// console.log("draw",event)

		if (this.isDrawing === true) {
			this.rect 	 = this.dom.getBoundingClientRect();

			console.log(this.prevPoint.x, "xDrawP")

			window.webBike.canva.drawLine(this.context, this.prevPoint.x, this.prevPoint.y, event.clientX - this.rect.left, event.clientY - this.rect.top);
			this.prevPoint = {
				x : event.clientX - this.rect.left,
		  		y : event.clientY - this.rect.top
		  	};

			console.log(this.prevPoint.x, "x2DrawP")

		};
	}

	stop(event){
		// console.log("stop",event)

		if (this.isDrawing === true) {
		    this.rect 	 = this.dom.getBoundingClientRect();


			window.webBike.canva.drawLine(this.context, this.prevPoint.x, this.prevPoint.y, event.clientX - this.rect.left, event.clientY - this.rect.top);
			this.prevPoint = {
				x : 0,
				y : 0	
			};
		    this.isDrawing = false;
		}
	}		



	startM(event){
		// console.log("start",event, this);

		event.preventDefault();
	    this.rect 	 = this.dom.getBoundingClientRect();
		this.isDrawing = true;

		this.touch = event.changedTouches[0];	

			console.log(this.prevPointMobil.x, "xStart")

		this.prevPointMobil = {
		  x : this.touch.clientX - this.rect.left,
		  y : this.touch.clientY - this.rect.top	
		};

			console.log(this.prevPointMobil.x, "x2Start")
	}



	drawM(event){
		console.log("draw",event)

		if (this.isDrawing === true) {
			this.rect 	 = this.dom.getBoundingClientRect();
			event.preventDefault();

			console.log(this.touch.clientX, "xDraw")
			console.log(this.prevPointMobil.x, "prevX")
			console.log(this.rect.left, "rect left")


			window.webBike.canva.drawLine(this.context, this.prevPointMobil.x, this.prevPointMobil.y, this.touch.clientX - this.rect.left, this.touch.clientY - this.rect.top);
			this.prevPointMobil = {
			  x : this.touch.clientX - this.rect.left,
			  y : this.touch.clientY - this.rect.top	
			};


			console.log(this.touch.clientX, "x2Draw")
			console.log(this.prevPointMobil.x, "prevX2")
			console.log(this.rect.left, "rect left2")

		};
	}



	stopM(event){
		// console.log("stop",event)

		if (this.isDrawing === true) {
			event.preventDefault();
		    this.rect 	 = this.dom.getBoundingClientRect();
   			console.log(this.prevPointMobil.x, "xStop")


			window.webBike.canva.drawLine(this.context, this.prevPointMobil.x, this.prevPointMobil.y, this.touch.clientX - this.rect.left, this.touch.clientY - this.rect.top);

			this.prevPointMobil = {
				x : 0,
				y : 0	
			};
   			console.log(this.prevPointMobil.x, "x2Stop")

		    this.isDrawing = false;
		}
	}

	drawLine(context, x1, y1, x2, y2) {
		this.context.beginPath();
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 1;
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.closePath();
	}
}