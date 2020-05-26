/**
*  Class Canva
*
*  Gére le canva (pc / mobile)
*
*  @constructor
*  @return {Canva} [description]
*/
class Canva {
	constructor(domTarget, domSecond) {
		webBike.canva = this;
		this.dom				= document.createElement('canvas');
		this.dom.id			= "canvas";
		this.dom.height	= "80";
		this.dom.width	= "225";

		domTarget.insertBefore(this.dom, domSecond);

    this.isDrawing = false;

		this.context	= this.dom.getContext('2d');
		this.mobile   = false;
    
    this.resetPoint();

    this.dom.onmousedown = (event)=>this.start(event);
    this.dom.onmousemove = (event)=>this.draw(event);
    this.dom.onmouseup   = (event)=>this.stop(event);

    this.dom.ontouchstart = (event)=>{
    	this.mobile = true;
    	this.start(event);
    }

    this.dom.ontouchmove  = (event)=>this.draw(event);
    this.dom.ontouchend   = (event)=>this.stop(event);

    // console.log(touchstart())
    //évènements mobiles : https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Events/Touch_events
    //dessiner dans le canvas : https://developer.mozilla.org/fr/docs/Web/API/Element/mousedown_event
	}	

	draw(event){
		event.preventDefault();
		if (this.isDrawing === true) {
			const point = this.getCoord(event);
			this.drawLine(point.x, point.y);
			this.prevPoint = point;
		};
	}

	/**
	 * [drawLine description]
	 * @param  {[type]} x2 [description]
	 * @param  {[type]} y2 [description]
	 * @return {void}
	 */
	drawLine(x2, y2) {
		this.context.beginPath();
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 1;
		this.context.moveTo(this.prevPoint.x, this.prevPoint.y);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.closePath();
	}

	/**
	 * [getCoord description]
	 * @param  {[type]} event [description]
	 * @return {JSON}       [description]
	 */
	getCoord(event){
		let rect 	 = this.dom.getBoundingClientRect();
		if (! this.mobile ) return {
			"x" : event.clientX - rect.left,
		  "y" : event.clientY - rect.top
		};
		let touch  = event.changedTouches[0];	
		return {
			"x" : touch.clientX - rect.left,
		  "y" : touch.clientY - rect.top	
		}
	}

	/**
	 * [resetPoint description]
	 * @return {void} [description]
	 */
	resetPoint(){
		this.prevPoint = {
			x : 0,
			y : 0	
		};
	}

	start(event){
		event.preventDefault();
		this.isDrawing = true;
		this.prevPoint = this.getCoord(event);
	}

	stop(event){
		event.preventDefault();
		if (this.isDrawing === true) {
			const point = this.getCoord(event);
			this.drawLine(point.x, point.y);
			this.resetPoint();
			this.isDrawing = false;
		}
	}
}