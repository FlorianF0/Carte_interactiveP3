/**
 * Class Slider
 *
 * Gére le slider -> défilement des slides / bouton prev/next & play/pause
 *
 */

class Reservation{

  /**
   * @construcor
   * @param {string} domTarget - Dom principal
   *
   * @return {void}
   */  
  constructor(domTarget){
    webBike.reservation = this;
    this.dom            = document.createElement("reservationForm");
    this.domMsgErreur   = document.createElement("msgErreur");

    domTarget.appendChild(this.dom);
    this.waitTemplate();

    if( this.checkResa(true) ) {
      this.mainTemplate();
    }
  }

  /**
   * Déclenche le timer, si un timer est déjà actif, l'efface et en recrée un.
   *
   * @return {void}
   */
  btnTimer() {
    this.domTimer = document.getElementsByTagName('timer')[0];

    if (this.domTimer) {
      clearInterval(webBike.timer.startTimer);
      this.domTimer.remove();

      new Timer(
        document.getElementsByTagName('main')[0],
        this.title, 
        this.domInputName.value, 
        this.domInputFirstName.value,
      );
    }

    else {
      new Timer(
        document.getElementsByTagName('main')[0],
        this.title, 
        this.domInputName.value, 
        this.domInputFirstName.value,
      );
    }
  }

  /*
   * @return {void}
   */
  canvaTemplate() {
    this.domReservation.innerHTML = `
      <p>Signer pour finir la réservation</p>
      <input id="btnReservation" type="button" name="Réservation" value="Finir la réservation" onClick="webBike.reservation.order()">
    `;
  }

  /**
   * @param {string} address    - L'adresse de la station
   * 
   * @return {string} address  - Retourne l'adresse en caractère minuscule.
   */
  checkAddress(address){
    if(address === "") return `Indisponible`;
    return address.toLowerCase();
  }

  /**
   * Check si la réservation est valide
   * @param {boolean} skipTittle
   *
   * @return {boolean} 
   */
  checkResa(skipTitle = false){
    //1. verif 
    let stationData = window.webBike.dataManager.getSession("station");
    if (stationData === "") return false;
    
    //2. verif station
    if (!skipTitle){
      stationData = JSON.parse(stationData);
      if (this.title !== stationData.station) return false;
    }

    //3. verif resa valide
    const bookedDate = window.webBike.dataManager.getSession("orderTime");
    if (Date.now() >= config.timer + bookedDate) {
      this.clearResa();

      return false;
    }
    return true;
  }

  /**
   * Supprime les données de session.
   *
   * @return {void}   
   */
  clearResa(){
    window.webBike.dataManager.removeSession("station");
    window.webBike.dataManager.removeSession("orderTime");
  }

  /**
   * @param {string} data - Donnée récupéré via l'API JCDecaux
   * 
   * @return {void}
   */
  mainTemplate(data = null){
    let title;

    if (data !== null) {
      for (let [key, value] of Object.entries(data)) {
        this[key]=value;
      }
    }

    else {
      const stationData = JSON.parse(window.webBike.dataManager.getSession("station"));
      this.qtyAvailable = stationData.qtyAvailable;
      this.address      = stationData.address;
      this.title        = stationData.station;
      this.qtyStation   = stationData.qtyStation;
      this.status       = stationData.status;
    }

    const nom         = window.webBike.dataManager.getLocal("nom");
    const prenom      = window.webBike.dataManager.getLocal("prenom");

    if (this.checkResa()){
      this.qtyAvailable--;
    }

    this.dom.innerHTML = `
      <h2>Détails de la station</h2>

      <div class="infoStation">
        <p><strong>Nom de la station :</strong> ${this.title} </p>
        <p><strong>Position :</strong> ${this.checkAddress(this.address)}</p>
        <p><strong>Statut :</strong> ${this.status}</p>

        <ul>
          <li> ${this.qtyAvailable} vélo${this.pluriel(this.qtyAvailable)} disponible${this.pluriel(this.qtyAvailable)}</li>
          <li> ${this.qtyStation} place${this.pluriel(this.qtyStation)} restante${this.pluriel(this.qtyStation)}</li>
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

  /**
   * @param {string} data - Donnée récupéré via l'API JCDecaux
   *
   * @return {void}
   */
  noReservationTemplate(data) {
    this.dom.innerHTML = `
      <h2>Détails de la station</h2>

      <div class="infoStation">
        <p><strong>Nom de la station :</strong> ${data.title} </p>
        <p><strong>Position :</strong> ${this.checkAddress(this.address)}</p>
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

 /**
   * Définie les données en local & session
   *
   * @return {void}
   */
  order(){
    window.webBike.dataManager.setLocal("nom", this.domInputName.value);
    window.webBike.dataManager.setLocal("prenom", this.domInputFirstName.value);
    window.webBike.dataManager.setSession("orderTime", Date.now());
    window.webBike.dataManager.setSession(
      "station", 
      JSON.stringify({
        address      : this.address,
        qtyAvailable : this.qtyAvailable,
        qtyStation   : this.qtyStation,
        station      : this.title,
        status       : this.status
      })
    );
    
    this.btnTimer();
    this.mainTemplate();
  }

 /**
   * Rajoute un "s" si une qty est supérieur à 0.
   *
   * @param {number} qty - Quantité de vélo disponible à une station.
   *
   * @return {sting}
   */
  pluriel(qty){
    if (qty > 1) return "s";
    return "";
  }

 /**
   * Instancie la class Canva en vérifiant si tous les champs nécessaire on bien était remplis.
   *
   * @return {void}
   */  
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

  /*
   * @return {void}
   */
  waitTemplate() {
    this.dom.innerHTML = `<p class="waitText"> Cliquez sur un icône pour accéder aux informations de la station.</p>`
  }
}