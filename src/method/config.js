// let token = localStorage.getItem("user");
function getHeaders(token){
    let headers = !token || token.trim() === '' ? {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    } : {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      "Authorization": `${token}`
    }
    return headers
  }
  function getHeadersv2(token){
    let headers = !token || token.trim() === '' ? {
      'Access-Control-Allow-Origin':'*',
    } : {
      'Access-Control-Allow-Origin':'*',
      "Authorization": `${token}`
    }
    return headers
  }
  export const config= {
      endpoint: "http://localhost/visionet-api/api",
      getUrlParams: function(url,params){
        let query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
        return `${url}?${query}`;
      },
      getconfig: function(){
        return {
          method: 'GET',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token'))
        }
      },
      postdataconfig: function(data){
        let formBody = [];
        
        for(let key in data) {
          formBody.push(`${key}=${data[key]}`);
        }
        
        let result = {
          method: 'POST',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token')),
          body: formBody.join('&')
        }
        return result
      },
      postdatafile: function(data){
        let result = {
          method: 'POST',
          mode: 'cors',
          headers: getHeadersv2(localStorage.getItem('token')),
          body: data
        }
        return result
      },
      putdatafile: function(data){
        let result = {
          method: 'PUT',
          mode: 'cors',
          headers: getHeadersv2(localStorage.getItem('token')),
          body: data
        }
        return result;
      },
      putdataconfig: function(data){
        let result = {
          method: 'PUT',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token')),
          body: JSON.stringify(data)
        }
        return result;
      },
      deletedataconfig: function(data){
        let result = {
          method: 'DELETE',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token')),
          body: JSON.stringify(data)
        }
        return result;
      },
      postconfig: {
          method: 'POST',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token'))
      },
      deleteconfig: {
          method: 'DELETE',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token'))
      },
      putconfig: {
          method: 'PUT',
          mode: 'cors',
          headers: getHeaders(localStorage.getItem('token'))
      }
  }
  