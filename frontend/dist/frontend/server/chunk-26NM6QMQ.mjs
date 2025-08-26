import './polyfills.server.mjs';
function r(e){return e?e.replace(/đ/g,"d").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]/g,"").toLowerCase():""}export{r as a};
