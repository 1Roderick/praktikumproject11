"use strict";
class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }


  getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInformation() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      })
  }

  serverUpdateUserInfo(newName, newJob) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
      .then(res => {
        return this.getResponseData(res);
      })
  }
}

export { Api };


