const RequestHelper = function (url) {
  this.url = url;
}

RequestHelper.prototype.get = function () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.url);
    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status !== 200) {
        reject(`Uh oh! The status code is ${ xhr.status }!`);
      }

      const jsonString = xhr.responseText;
      const data = JSON.parse(jsonString);
      resolve(data);
    });
  });
}

module.exports = RequestHelper;
