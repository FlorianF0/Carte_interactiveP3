class DataManager{
  constructor(target){
    window[target].dataManager = this;
  }

  async getMapPoints(src){
    const response = await fetch(src)
    let data = await response.json();
    return data;
  }
}
