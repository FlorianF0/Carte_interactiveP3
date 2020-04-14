class Reservation{
  constructor(domTarget){
    this.dom = document.createElement("reservationForm");
    carteInteractive.reservation = this;
    this.places = 10;
    domTarget.appendChild(this.dom);
  }

  mainTemplate(){
    this.dom.innerHTML = `
      <h2>Détails de la station</h2>

      <p>Adresse: </p>

      <ul>
        <li>${this.places} place${this.pluriel(this.places)}</li>
        <li>x vélos disponibles</li>
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

  update(){
    this.mainTemplate();
  }
}