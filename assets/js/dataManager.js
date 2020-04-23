class DataManager{
  constructor(target){
    window[target].dataManager = this;
  }

  async getMapPoints(src, key){
    var myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    myHeaders.append('Authorization', 'Basic '+key);

    const answer = fetch(src, {
        mode: 'no-cors',
        method:'GET',
        headers: myHeaders
      }
    )
      // .then(resp => resp.json())
      // .then(responseData => responseData.title);

    console.log('answer',answer);
    return answer;
  }
}