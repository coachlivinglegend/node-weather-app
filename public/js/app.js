console.log('kjhgfdh');

const doFetch = (url, cb) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        cb(data);
      }
    });
};

const weatherForm = document.querySelector('form');
const answer = document.getElementById('answer');
weatherForm.addEventListener('submit', (e) => {
  const search = document.querySelector('input').value;
  e.preventDefault();
  if (search !== undefined) {
    console.log({ search });
    doFetch(`/weather?address=${search}`, (data) => {
      answer.textContent = data.forecast;
    });
  }
});
