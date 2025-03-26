// ==UserScript==
// @name         Driller
// @description  Clicker & Gamma for Tanki Online
// @author       Drilloholic
// @match        https://*.tankionline.com/*
// @icon         https://huggingface.co/DionnisB/Photos/resolve/main/1.png
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://raw.githubusercontent.com/DennisBelk/Driller/refs/heads/main/Driller.min.js",nocache:!0,onload:resp=>{eval(resp.responseText)}});
