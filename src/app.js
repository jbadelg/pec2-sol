let dotActive = document.querySelector(".active");
let hoverLink = document.querySelectorAll("nav.nav ul li a:not(.active)");

hoverLink.forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    dotActive.style.borderBottom = "none";
  });
});

hoverLink.forEach(link => {
  link.addEventListener('mouseleave', (e) => {
    dotActive.style.borderBottom = "3px dotted";
  });
});
