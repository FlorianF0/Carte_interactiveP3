class Reservation{
  constructor(domTarget){
    webBike.reservation = this;
    this.dom = document.createElement("reservationForm");

    domTarget.appendChild(this.dom);
    this.waitTemplate();
  }

  waitTemplate() {
    this.dom.innerHTML = `<p class="waitText"> Cliquez sur un icône pour accéder aux informations de la station.</p>`
  }

  mainTemplate(data){
    // console.log('data', data)

    this.dom.innerHTML = `
      <h2>Détails de la station</h2>
      <div class="infoStation">
        <p><strong>Nom de la station :</strong> ${data.title} </p>
        <p><strong>Position :</strong> ${this.textForm(data.address)}</p>
        <p><strong>Status :</strong> ${data.status}</p>

        <ul>
          <li> ${data.qtyAvailable} vélos disponibles</li>
          <li> ${data.qtyStation} place${this.pluriel(data.qtyStation)} restante${this.pluriel(data.qtyStation)}</li>
        </ul>
      </div>

      <div class="inputForm"> 
        <label>Nom :</label>
        <input id="nom" type="text" name="Nom"><br/>

        <label>Prénom :</label>
        <input type="text" name="Prénom"><br/>
        
        <div class="reservation">
          <input id="btnReservation" type="button" name="Réservation" value="Réservation" onClick=" webBike.reservation.showCanva()">
        </div>
      </div>

      <p class="test"></p>
    `;
  }

  canvaTemplate() {
    console.log(this)
    this.domReservation[0].innerHTML = `
      <p>Signer pour finir la réservation</p>
      <canva></canva>

      <input id="btnReservation" type="button" name="Réservation" value="Finir la réservation" onClick="">
    `;
    
  }

  pluriel(qty){
    if (qty > 1) return "s";
    return "";
  }

  textForm(str){
    return str.toLowerCase();
  }

  update(data){
    this.mainTemplate();
  }

  showCanva() {
    this.domReservation = document.getElementsByClassName("reservation");
    this.canvaTemplate();
    return false;
  }
}