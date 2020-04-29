class Reservation{
  constructor(domTarget){
    this.dom = document.createElement("reservationForm");
    webBike.reservation = this;
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
      <p><strong>Nom de la station :</strong> ${data.title} </p>
      <p><strong>Position :</strong> ${this.textForm(data.address)}</p>

      <ul>
        <li> ${data.qtyAvailable} vélos disponibles</li>
        <li> ${data.qtyStation} place${this.pluriel(data.qtyStation)} restante${this.pluriel(data.qtyStation)}</li>
      </ul>

      <label>Nom :</label>
      <input id="nom" type="text" name="Nom"><br/>

      <label>Prénom :</label>
      <input type="text" name="Prénom"><br/>

      <input id="btnReservation" type="button" name="Réservation" value="Réservation">
    `;
  }

  pluriel(qty){
    if (qty > 1) return "s";
    return "";
  }

  textForm(str){
    return str.toLowerCase();
  }

  makeName(data){
    this.dom.innerHTML = data.title;

  }

  // positon(data){
  //   if( this.textForm(data) == "") { this.textForm(data) = "Inconnue" }
  // }

  update(data){
    this.mainTemplate();
  }
}