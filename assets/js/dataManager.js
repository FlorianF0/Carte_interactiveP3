class DataManager{
  constructor(target, key){
    this.idKey = key+"_";
    window[target].dataManager = this;
  }

  async getMapPoints(src){
    const response = await fetch(src)
    const data     = await response.json();
    return data;
  }

  getLocal(value){
    const result = localStorage.getItem(this.idKey+value);
    if (result === null) return "";
    return result;
  }

  setLocal(key, value){
    localStorage.setItem(this.idKey+key,value);
  }

  getSession(value){
    const result = sessionStorage.getItem(this.idKey+value);
    if (result === null) return "";
    return result;
  }

  setSession(key, value){
    sessionStorage.setItem(this.idKey+key,value);
  }
}
