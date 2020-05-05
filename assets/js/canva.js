class Canva {
	constructor(domTarget) {
		webBike.canva = this;
		this.dom = document.createElement('canva');
		this.domP = document.querySelector('.reservation > p');

		domTarget.insertBefore(this.dom, this.domP);
		console.log(this.dom)

    this.isDrawing=false;

    this.dom.onmousedown = this.start;
    this.dom.onmousemove = this.draw;
    this.dom.onmouseup   = this.stop;

    //évènements mobiles : https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Events/Touch_events
    //dessiner dans le canvas : https://developer.mozilla.org/fr/docs/Web/API/Element/mousedown_event
	}

  start(event){
    console.log("start",event);
    this.isDrawing=true;
    this.prevPoint = {
      x : eve
    }
  }

  draw(event){
    if (!this.isDrawing) return;
    console.log("draw",event)
  }

  stop(event){
    console.log("stop",event)
    this.isDrawing=false;
  }




}