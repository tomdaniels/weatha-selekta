// const defaultError =
// 'We are experiencing technical issues right now. Please try again soon.';

const checkStatus = response => {
  if (response.ok) {
    return response.json();
  }

  // return response.json().then(({ errors = [defaultError] }) => {
  //   const [message] = errors;
  //   return Promise.reject(new Error(message));
  // });
  return undefined;
};

function fetchJson(url) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
  }).then(checkStatus);
}

export default fetchJson;
