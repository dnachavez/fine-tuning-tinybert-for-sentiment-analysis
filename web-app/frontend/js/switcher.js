(()=>{let e=localStorage.getItem("theme"),t=()=>e||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),a=function(e){"auto"===e&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.setAttribute("data-bs-theme","light"):document.documentElement.setAttribute("data-bs-theme",e)},r=function(e){let t=document.getElementById("navbar");t&&("light"===e||"auto"===e?(// If navbar is currently dark, switch to light
t.classList.remove("navbar-dark","bg-transparent"),t.classList.add("navbar-light","bg-transparent")):(// If navbar is currently light, switch to dark
t.classList.remove("navbar-light","bg-transparent"),t.classList.add("navbar-dark","bg-transparent")))},s=function(e){let t=document.getElementById("sidebar");"light"===e||"auto"===e?(// If navbar is currently dark, switch to light
t.classList.remove("navbar-dark","bg-transparent"),t.classList.add("navbar-light","bg-transparent")):(// If navbar is currently light, switch to dark
t.classList.remove("navbar-light","bg-transparent"),t.classList.add("navbar-dark","bg-transparent"))};a(t());let n=e=>{// const activeThemeIcon = document.querySelector('.theme-icon-active use')
let t=document.querySelector(`[data-bs-theme-value="${e}"]`);// const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')
document.querySelectorAll("[data-bs-theme-value]").forEach(e=>{e.classList.remove("active")}),t.classList.add("active"),// activeThemeIcon.setAttribute('href', svgOfActiveBtn)
r(e),s(e)};window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{("light"!==e||"dark"!==e)&&a(t())}),window.addEventListener("DOMContentLoaded",()=>{n(t()),document.querySelectorAll("[data-bs-theme-value]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-bs-theme-value");localStorage.setItem("theme",t),a(t),n(t)})})})})();//# sourceMappingURL=switcher.js.map

//# sourceMappingURL=switcher.js.map
