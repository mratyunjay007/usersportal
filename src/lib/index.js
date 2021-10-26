export function objToQueryString(obj) {
    const keyValuePairs = [];
    Object.keys(obj).map((key) =>
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
    );
    return keyValuePairs.join("&");
  }
  
  const authFetch = (url, method, data) => {
    // console.log(`Auth Fetching url ${url} with data ${data}`);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (data) {
      return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers,
      });
    }
    return fetch(url, {
      method,
      headers,
    });
  };
  
  
  export const postData = (url, data) => authFetch(url, "POST", data);
  
  export const getData = (url, data) => {
    if (data) {
      url = `${url}?${objToQueryString(data)}`;
    }
    return authFetch(url, "GET", null);
  };
  
  export const putData = (url, data) => authFetch(url, "PUT", data);
  

  export const deleteData = (url, data) => {
    if (data) {
      url = `${url}?${objToQueryString(data)}`;
    }
    return authFetch(url, "DELETE", null);
  };
  
  export const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    } else {
      return str.slice(0, num - 3) + "...";
    }
  };
  