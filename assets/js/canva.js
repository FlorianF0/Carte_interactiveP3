/**
*  Class Canva
*
*  Gére le canva (pc / mobile)
*
*  @return {Canva} [description]
*/
class Canva {
  
  /*
   * @constructor
   * @param   {string} domTarget
   * @param	  {string} domSecond
   *  
   * @return {void}
   */
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
	}	

  /*
   * @param   {string} event  
   * 
   * @return {void}
   */
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
	 * @param  {number} x2 
	 * @param  {number} y2 
	 *
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
	 * @param  {string} event 
	 *
	 * @return {JSON}       
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

  /*
   * @param   {string} event 
   *  
   * @return {void}
   */
	start(event){
		event.preventDefault();
		this.isDrawing = true;
		this.prevPoint = this.getCoord(event);
	}

  /*
   * @param   {string} event 
   *  
   * @return {void}
   */
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