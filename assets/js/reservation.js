class Reservation{
  constructor(domTarget){
    webBike.reservation = this;
    this.dom            = document.createElement("reservationForm");
    this.domMsgErreur   = document.createElement("msgErreur");

    domTarget.appendChild(this.dom);
    this.waitTemplate();
  }

  waitTemplate() {
    this.dom.innerHTML = `<p class="waitText"> Cliquez sur un icône pour accéder aux informations de la station.</p>`
  }

  mainTemplate(data){
    // console.log('data', data)
    const nom    = window.webBike.dataManager.getLocal("nom");
    const prenom = window.webBike.dataManager.getLocal("prenom");
    this.station = data.title;
    this.qtyAvailable = data.qtyAvailable;

    if (data.title === window.webBike.dataManager.getSession("station")){
      data.qtyAvailable--;
    }

    this.dom.innerHTML = `
      <h2>Détails de la station</h2>

      <div class="infoStation">
        <p><strong>Nom de la station :</strong> ${data.title} </p>
        <p><strong>Position :</strong> ${this.checkAddress(data.address)}</p>
        <p><strong>Statut :</strong> ${data.status}</p>

        <ul>
          <li> ${data.qtyAvailable} vélos disponibles</li>
          <li> ${data.qtyStation} place${this.pluriel(data.qtyStation)} restante${this.pluriel(data.qtyStation)}</li>
        </ul>
      </div>

      <div class="inputForm"> 
        <label>Nom :</label>
        <input id="nom" type="text" name="Nom" maxlength="20" placeholder="Saisissez votre nom" value="${nom}"><br/>

        <label>Prénom :</label>
        <input id="prenom" type="text" name="Prénom" maxlength="20" placeholder="Saisissez votre prénom" value="${prenom}"><br/>
        
        <div class="reservation">
          <input id="btnReservation" type="button" name="Réservation" value="Réservation" onClick="webBike.reservation.showCanva()">
        </div>
      </div>
    `;
  }

  noReservationTemplate(data) {
    this.dom.innerHTML = `
      <h2>Détails de la station</h2>

      <div class="infoStation">
        <p><strong>Nom de la station :</strong> ${data.title} </p>
        <p><strong>Position :</strong> ${this.checkAddress(data.address)}</p>
        <p><strong>Statut :</strong> ${data.status}</p>

        <ul>
          <li> ${data.qtyAvailable} vélos disponibles</li>
          <li> ${data.qtyStation} place${this.pluriel(data.qtyStation)} restante${this.pluriel(data.qtyStation)}</li>
        </ul>
      </div>

      <div class="noAvaibleStation">
        <p>SORRY</p>
        <p>Station fermé ou aucun vélo disponible</p>
      </div>
    `;
  }

  canvaTemplate() {
    this.domReservation.innerHTML = `
      <p>Signer pour finir la réservation</p>
      <input id="btnReservation" type="button" name="Réservation" value="Finir la réservation" onClick="webBike.reservation.order()">
    `;
  }

  pluriel(qty){
    if (qty > 1) return "s";
    return "";
  }

  textForm(str){
    return str.toLowerCase();
  }

  checkAddress(address){
    if(address === "") { 
      address = `Indisponible`;
    }
    else {
      address = this.textForm(address);
    }

    return address;
  }

  update(data){
    this.mainTemplate();
  }

  showCanva() {
    this.domInputName       = document.getElementById('nom');
    this.domInputFirstName  = document.getElementById('prenom');
    this.domInputForm       = document.querySelector('.inputForm');
    this.domReservation     = document.getElementsByClassName("reservation")[0];

    if (this.domInputName.value === "" || this.domInputFirstName.value === "") {
      this.domInputForm.appendChild(this.domMsgErreur);
      this.domMsgErreur.innerHTML = `Entrez votre nom et prénom.`;

      return false;
    }

    else {
      this.domMsgErreur.remove();

      this.canvaTemplate();

      new Canva(document.querySelector('.reservation'), document.querySelector('.reservation > p'));
      this.domBtnReserv = document.getElementById('btnReservation');
      this.domBtnReserv.style.margin = "1rem";
    }
  }

  order(){
    window.webBike.dataManager.setLocal("nom", this.domInputName.value);
    window.webBike.dataManager.setLocal("prenom", this.domInputFirstName.value);
    window.webBike.dataManager.setSession("orderTime", Date.now());
    window.webBike.dataManager.setSession("station", this.station);

    this.btnTimer();
    
  }

  btnTimer() {
    this.domTimer = document.getElementsByTagName('timer')[0];

    if (this.domTimer) {
      clearInterval(webBike.timer.startTimer);
      this.domTimer.remove();

      new Timer(document.getElementsByTagName('main')[0],
                                              this.station, 
                                              this.domInputName.value, 
                                              this.domInputFirstName.value, 
                                              this.qtyAvailable
                                             );
    }

    else {
      new Timer(document.getElementsByTagName('main')[0],
                                              this.station, 
                                              this.domInputName.value, 
                                              this.domInputFirstName.value, 
                                              this.qtyAvailable
                                             );
    }
  }
}