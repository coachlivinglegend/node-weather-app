console.log('kjhgfdh');

const doFetch = (url) => {
  fetch(url)
    .then((res) => res)
    .then((data) => {
      if (data.error) {
        console.cog(error);
      } else {
        return data;
      }
    });
};
const weatherForm = document.querySelector('form');
const search = document.querySelector('input').value;
const answer = document.getElementById('answer');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (value !== undefined) {
    const ans = doFetch(`http://localhost:8080/weather?address=${search}`);
    answer.textContent = ans.forecast;
  }
});
