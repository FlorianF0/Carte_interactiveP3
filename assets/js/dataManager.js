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




// var myHeaders = new Headers();
// myHeaders.append('Accept', '*/*');
// myHeaders.append('Authorization', 'Basic'+key);

// const answer = fetch(src, {
// 	mode : 'no-cors',
// 	method : 'GET',
// 	headers : myHeaders
// })

// console.log('answer', answer);
// return answer;