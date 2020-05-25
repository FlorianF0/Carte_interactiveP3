/**
* Class DataManager
*
* Récupère les données de l'API JCDecaux.
* Récupère les données de session & local.
* Garde les données en session ou local.
*
*/

class DataManager{

  /**
   * @param {string} target - Window
   * @param {string} key    - Key nécessaire pr récupérer les données session & local
   *
   */
  constructor(target, key){
    this.idKey = key+"_";
    window[target].dataManager = this;
  }

  /**
   * @param {string} src - API & acces
   * 
   * @returns {array} data
   */
  async getMapPoints(src){
    const response = await fetch(src)
    const data     = await response.json();
    return data;
  }

  /**
   * @param {string} value
   * 
   * @returns {string} result 
   */
  getLocal(value){
    const result = localStorage.getItem(this.idKey+value);
    if (result === null) return "";
    return result;
  }

  /**
   * @param {string} value
   * @param {string} key
   * 
   */
  setLocal(key, value){
    localStorage.setItem(this.idKey+key,value);
  }

  /**
   * @param {string} value
   * 
   * @returns {string, number} result 
   */
  getSession(value){
    const result = sessionStorage.getItem(this.idKey+value);
    if (result === null) return "";
    return result;
  }

  /**
   * @param {string} value
   * @param {string} key
   * 
   */
  setSession(key, value){
    sessionStorage.setItem(this.idKey+key,value);
  }

  /**
   * @param {string} key
   * 
   */
  removeSession(key){
    sessionStorage.removeItem(this.idKey+key);
  }
}
