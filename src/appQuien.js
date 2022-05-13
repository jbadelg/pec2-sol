let hijo = document.getElementById("hijo");
let adoptar = document.getElementById("adoptar");

hijo.addEventListener('mouseenter', (e) => {
  adoptar.classList = 'visible';
  setInterval(() => {
    adoptar.classList = 'invisible';
  }, 3000);
});
