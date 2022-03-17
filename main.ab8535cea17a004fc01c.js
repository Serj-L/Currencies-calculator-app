(()=>{"use strict";var e,t,n,r=document.getElementById("base-currency-abbreviation"),a=document.getElementById("template"),c=a?a.content.querySelector("[data-currency-list-item]"):null,i=c?c.querySelector("[data-amount-label]"):null,o=c?c.querySelector("[data-amount-input]"):null,u=c?c.querySelector("[data-currency-rate-value]"):null,s=c?c.querySelector("[data-delete-currency-btn]"):null,l=function(e){var t=e.currenciesListElement,n=e.currenciesList,a=e.baseCurrencies,l=e.baseCurrencyAbbreviation,d=e.currencyAmount,b=e.currenciesData,v=e.isClearListBeforeRender,f=void 0===v||v,m=e.startingOrderPosition,y=void 0===m?0:m;if(c&&t&&b){var g=[];n.forEach((function(e){var t=b.find((function(t){return t.Cur_Abbreviation===e}));t&&g.push(t)}));var h=b.find((function(e){return e.Cur_Abbreviation===l}));h&&(r&&(r.textContent="".concat(l)),f&&(t.textContent=""),g.forEach((function(e,n){if(i&&o&&u&&s){i.textContent="".concat(e.Cur_Name_Eng," (").concat(e.Cur_Abbreviation,")"),i.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),o.value=(h.ratePerOneUnit/e.ratePerOneUnit*d).toFixed(2),o.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),u.textContent="1 ".concat(e.Cur_Abbreviation," = ").concat((e.ratePerOneUnit/h.ratePerOneUnit).toFixed(4)," ").concat(l),u.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),s.disabled=a.has(e.Cur_Abbreviation),s.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation));var r=c.cloneNode(!0);r.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),r.setAttribute("data-order-number","".concat(y+n)),e.Cur_Abbreviation===l&&r.setAttribute("data-is-base-currency","true"),t.appendChild(r)}})))}},d=function(e){document.querySelectorAll("[data-currency-list-item]").forEach((function(t){t.getAttribute("data-currency-abbreviation")===e?t.setAttribute("data-is-base-currency","true"):t.setAttribute("data-is-base-currency","false")}))},b=function(e){var t=e.addCurrenciesListElement,n=e.currenciesData,r=e.userCurrenciesList;if(t){var a=n.filter((function(e){return!r.includes(e.Cur_Abbreviation)}));t.innerText="",a.forEach((function(e){t.insertAdjacentHTML("beforeend",'<div class="add-currencies__checkbox-wrapper">\n        <input class="add-currencies__input" type="checkbox" id='.concat(e.Cur_ID,"-").concat(e.Cur_Abbreviation," name=").concat(e.Cur_Abbreviation,' data-add-currencies-checkbox>\n        <label class="add-currencies__label" id="add-currencies-label" for=').concat(e.Cur_ID,"-").concat(e.Cur_Abbreviation," data-currency-abbreviation=").concat(e.Cur_Abbreviation,">").concat(e.Cur_Name_Eng," (").concat(e.Cur_Abbreviation,")</label>\n      </div>"))}))}},v=document.getElementById("currency-select"),f=function(e,t){v&&(v.innerText="",t.forEach((function(t){v.insertAdjacentHTML("beforeend","<option value=".concat(t," ").concat(t===e?"selected disabled":""," data-currency-select-option>").concat(t,"</option>"))})))},m=function(e){v&&(document.querySelectorAll("[data-currency-select-option]").forEach((function(t){t.value===e?(t.setAttribute("selected",""),t.setAttribute("disabled","")):(t.removeAttribute("selected"),t.removeAttribute("disabled"))})),v.value=e)};!function(e){e.MAIN="CurrenciesCalculatorApp"}(e||(e={})),function(e){e.LIGHT="light",e.DARK="dark"}(t||(t={})),function(e){e.NAME="data-theme-type"}(n||(n={}));var y=function(){return y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},y.apply(this,arguments)},g=function(e){var t=localStorage.getItem(e);return JSON.parse(t)},h=function(t,n,r){var a,c=g(e.MAIN),i=y(y({},c),((a={})[n]=r,a));localStorage.setItem(t,JSON.stringify(i))},p=function(e){var t="".concat(e.getFullYear()),n=e.getMonth()+1<10?"0".concat(e.getMonth()+1):"".concat(e.getMonth()+1),r=e.getDate()<10?"0".concat(e.getDate()):"".concat(e.getDate());return"".concat(t,"-").concat(n,"-").concat(r)};function A(e,t){var n;return function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];clearTimeout(n),n=setTimeout((function(){e.apply(void 0,r)}),t)}}function C(e,t){if(t){if("lock"===e)return void(document.body.style.overflow="hidden");document.body.style.overflow="auto"}else{if(!(document.body.scrollHeight>window.innerHeight))return;if("lock"===e){var n=function(){var e=document.createElement("div");e.style.position="adsolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",e.style.visibility="hidden",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}();return document.body.style.overflow="hidden",void document.body.style.setProperty("--scrollBarWidth","".concat(n,"px"))}document.body.style.overflow="auto",document.body.style.setProperty("--scrollBarWidth","0px")}}var E,_,L,w,N=function(t){var n,r,a,c,i,o,u=t.evt,s=t.currenciesListElement,l=t.userCurrenciesList,d=t.baseCurrencyAbbreviation;if(/touch/.test(u.type)){if(!(r=(n=u).targetTouches[0].target).hasAttribute("data-drag-n-drop-anchor"))return;a=n.changedTouches[0].clientX,c=n.changedTouches[0].clientY,i=n.changedTouches[0].pageX,o=n.changedTouches[0].pageY,C("lock",!0)}else{if(!(r=(n=u).target).hasAttribute("data-drag-n-drop-anchor"))return;a=n.clientX,c=n.clientY,i=n.pageX,o=n.pageY,C("lock",!1)}var b,v,m,y,g=r.closest("li"),p=g.getBoundingClientRect(),A=p.width,E=p.x,_=p.y,L=a-E,w=c-_,N=g.cloneNode(!0),x=N.querySelector("[data-drag-n-drop-anchor]"),I=Array.from(document.querySelectorAll("[data-currency-list-item]")),k=(b=function(e){var t,n;/touch/.test(e.type)?(i=(n=e).changedTouches[0].pageX,o=n.changedTouches[0].pageY):(i=(n=e).pageX,o=n.pageY),N.style.setProperty("--top","".concat(o-w,"px")),N.style.setProperty("--left","".concat(i-L,"px"));var r=N.getBoundingClientRect(),a=r.x,c=r.y,u=r.width,d=r.height;N.hidden=!0;var b=null===(t=document.elementFromPoint(a+u/2,c+d/2))||void 0===t?void 0:t.closest("li");if(N.hidden=!1,b){var v=Number(N.getAttribute("data-order-number")),f=Number(b.getAttribute("data-order-number"));I.splice(f,0,I.splice(v,1)[0]),l.splice(f,0,l.splice(v,1)[0]),N.setAttribute("data-order-number","".concat(f)),s&&(s.textContent="",I.forEach((function(e,t){e.setAttribute("data-order-number","".concat(t)),s.appendChild(e)})))}},85,function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=this,r=e;v?(clearTimeout(m),m=setTimeout((function(){Date.now()-y>=85&&(b.apply(n,r),y=Date.now())}),Math.max(85-(Date.now()-y),0))):(b.apply(n,r),y=Date.now(),v=!0)}),D=function(t){g.removeAttribute("data-dragging"),document.body.removeChild(N),f(d,l),h(e.MAIN,"currenciesList",l),/touch/.test(t.type)?(document.body.removeEventListener("touchmove",k),C("unlock",!0)):(document.body.removeEventListener("mousemove",k),C("unlock",!1))};g.setAttribute("data-dragging",""),document.body.appendChild(N),N.style.setProperty("--max-width","".concat(A,"px")),N.style.setProperty("--top","".concat(o-w,"px")),N.style.setProperty("--left","".concat(i-L,"px")),N.setAttribute("data-dragging-clone",""),x.style.cursor="grabbing",/touch/.test(u.type)?(document.body.addEventListener("touchmove",k),N.addEventListener("touchend",D)):(document.body.addEventListener("mousemove",k),N.addEventListener("mouseup",D))},x=function(){return g(e.MAIN).themeType},I=document.getElementById("snack-bar"),k=document.getElementById("snack-bar-text"),D=function(e,t){if(I&&k){k.textContent=e,I.classList.add("snack-bar--active");var n=setTimeout((function(){I.classList.remove("snack-bar--active")}),t);null==I||I.addEventListener("click",(function(){I.classList.remove("snack-bar--active"),window.clearTimeout(n)}))}},T=document.getElementById("spinner"),B=function(e){T&&(e?T.classList.add("spinner--active"):T.classList.remove("spinner--active"))},M=document.getElementById("scroll-top"),O=document.getElementById("scroll-top-button"),P=function(){return P=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},P.apply(this,arguments)},S=function(e,t,n,r){return new(n||(n=Promise))((function(a,c){function i(e){try{u(r.next(e))}catch(e){c(e)}}function o(e){try{u(r.throw(e))}catch(e){c(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}u((r=r.apply(e,t||[])).next())}))},U=function(e,t){var n,r,a,c,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return c={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function o(c){return function(o){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,o])}}},q="https://www.nbrb.by/api/exrates/",R="".concat(q,"/rates?periodicity=0"),Y="".concat(q,"/currencies/"),j=[],F=function(e){return S(void 0,void 0,Promise,(function(){var t;return U(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat(R,"&ondate=").concat(p(e)))];case 1:return(t=n.sent()).ok?[4,t.json()]:[3,3];case 2:return[2,n.sent()];case 3:throw new Error("Network error:"+t.status)}}))}))},H=function(e){return S(void 0,void 0,Promise,(function(){var t,n,r;return U(this,(function(a){switch(a.label){case 0:return a.trys.push([0,4,5,6]),B(!0),[4,F(e)];case 1:return t=a.sent(),n=[],j.length?[3,3]:[4,S(void 0,void 0,Promise,(function(){var e;return U(this,(function(t){switch(t.label){case 0:return[4,fetch(Y)];case 1:return(e=t.sent()).ok?[4,e.json()]:[3,3];case 2:return[2,t.sent()];case 3:throw new Error("Network error:"+e.status)}}))}))];case 2:j=a.sent(),a.label=3;case 3:return n=t.map((function(e){var t=j.find((function(t){return t.Cur_ID===e.Cur_ID})),n=t.Cur_Name_Eng,r=t.Cur_QuotName_Eng,a=t.Cur_Name_EngMulti,c=e.Cur_OfficialRate/e.Cur_Scale;return P(P({},e),{Cur_Abbreviation:e.Cur_Abbreviation.toUpperCase(),Cur_Name_Eng:n,Cur_QuotName_Eng:r,Cur_Name_EngMulti:a,ratePerOneUnit:c})})),n.push({Cur_ID:933,Date:n[0].Date,Cur_Abbreviation:"BYN",Cur_Scale:1,Cur_Name:"Белорусский рубль",Cur_OfficialRate:1,Cur_Name_Eng:"Belarusian Ruble",Cur_QuotName_Eng:"1 Belarusian Ruble",Cur_Name_EngMulti:"Belarusian Rubles",ratePerOneUnit:1}),[2,n];case 4:return r=a.sent(),D(r.message,1e4),[3,6];case 5:return B(!1),[7];case 6:return[2]}}))}))},X=function(e,t,n){if(n||2===arguments.length)for(var r,a=0,c=t.length;a<c;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},G=document.body,W=document.getElementById("theme-switcher"),J=document.getElementById("date-picker"),K=document.getElementById("currency-select"),Q=document.getElementById("currencies-list"),z=document.getElementById("add-currencies-btn"),V=document.getElementById("add-currencies-form"),Z=document.getElementById("available-currencies-list"),$=document.getElementById("add-currencies-reset-btn"),ee=document.getElementById("calculator-additional-info"),te=new Date,ne=new Date(2020,0,1),re=window.matchMedia&&window.window.matchMedia("(prefers-color-scheme: dark)").matches?t.DARK:t.LIGHT,ae="BYN",ce=new Set(["BYN","USD","EUR","RUB","CNY"]),ie=[];L=e.MAIN,w={themeType:re,baseCurrencyAbbreviation:ae,currencyAmount:10,currenciesList:Array.from(ce)},localStorage.getItem(L)||localStorage.setItem(L,JSON.stringify(w)),ae=g(e.MAIN).baseCurrencyAbbreviation,E=g(e.MAIN).currencyAmount,_=g(e.MAIN).currenciesList,function(e){if(e){var t=x();e.getAttribute(n.NAME)!==t&&document.body.setAttribute(n.NAME,t)}}(G),J&&function(e,t,n,r){e&&(e.setAttribute("value",p(t)),n&&e.setAttribute("min",p(n)),r&&e.setAttribute("max",p(r)))}(J,te,ne,te),M&&O&&(window.addEventListener("scroll",(function(){document.documentElement.scrollTop>300?M.classList.contains("scroll-top--active")||M.classList.add("scroll-top--active"):M.classList.contains("scroll-top--active")&&M.classList.remove("scroll-top--active")})),O.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}))),H(te).then((function(e){var t,n,r,a,c,i;l({currenciesListElement:Q,currenciesList:_,baseCurrencies:ce,baseCurrencyAbbreviation:ae,currenciesData:e,currencyAmount:E}),(null==e?void 0:e.length)?(ie.push.apply(ie,e),b({addCurrenciesListElement:Z,currenciesData:ie,userCurrenciesList:_}),f(ae,_),null==ee||ee.classList.add("calculator__additional-info--active")):(n=(t={message:"Ups, something went wrong &#128533",containerElement:document.getElementById("currencies-list"),tagName:"li",tagClassName:"calculator__currencies-list-warning",textTagClassName:"calculator__currencies-list-warning-text"}).message,a=t.tagName,c=t.tagClassName,i=t.textTagClassName,(r=t.containerElement)&&r.insertAdjacentHTML("afterbegin","<".concat(a.toLocaleLowerCase()," class=").concat(c,">\n      <span class=").concat(i,">").concat(n,"</span>\n    </").concat(a.toLocaleLowerCase(),">")))})),null==W||W.addEventListener("click",(function(){return r=x(),a=G,c=r===t.LIGHT?t.DARK:t.LIGHT,a.setAttribute(n.NAME,c),void h(e.MAIN,"themeType",c);var r,a,c}));var oe=A((function(e){if(e){var t=e.target,n=t.valueAsDate;if(n){var r=new Date(t.min),a=new Date(t.max);r&&n<r&&(t.value=p(r),n=r,D("Entered date can't be earlier than ".concat(t.min),1e4)),a&&n>a&&(t.value=p(a),n=a,D("Entered date can't be later than ".concat(t.max),1e4)),H(n).then((function(e){l({currenciesListElement:Q,currenciesList:_,baseCurrencies:ce,baseCurrencyAbbreviation:ae,currenciesData:e,currencyAmount:E}),(null==e?void 0:e.length)?(ie.length=0,ie.push.apply(ie,e),b({addCurrenciesListElement:Z,currenciesData:ie,userCurrenciesList:_})):t.value=p(te)}))}}}),600);null==J||J.addEventListener("input",(function(e){return oe(e)})),null==K||K.addEventListener("change",(function(t){var n=t.target;if(n){var r=n.value,a=ie.find((function(e){return e.Cur_Abbreviation===r})),c=document.querySelectorAll("[data-currency-rate-value]"),i=document.querySelectorAll("[data-amount-input]");c.forEach((function(e){var t=e.getAttribute("data-currency-abbreviation"),n=ie.find((function(e){return e.Cur_Abbreviation===t}));e.textContent="1 ".concat(n.Cur_Abbreviation," = ").concat((n.ratePerOneUnit/a.ratePerOneUnit).toFixed(4)," ").concat(r)})),d(ae=r),m(ae),h(e.MAIN,"baseCurrencyAbbreviation",ae),i.forEach((function(t){var n=t;n.getAttribute("data-currency-abbreviation")===ae&&(E=n.valueAsNumber,h(e.MAIN,"currencyAmount",E))})),n.blur()}}));var ue=A((function(t){if(t){var n,r=t.target,a=r.valueAsNumber,c=r.getAttribute("data-currency-abbreviation");if(c!==ae){var i=document.querySelectorAll("[data-currency-rate-value]");n=ie.find((function(e){return e.Cur_Abbreviation===c})),i.forEach((function(e){var t=e.getAttribute("data-currency-abbreviation"),r=ie.find((function(e){return e.Cur_Abbreviation===t}));e.textContent="1 ".concat(r.Cur_Abbreviation," = ").concat((r.ratePerOneUnit/n.ratePerOneUnit).toFixed(4)," ").concat(c)})),d(ae=c),m(ae),h(e.MAIN,"baseCurrencyAbbreviation",ae)}else n=ie.find((function(e){return e.Cur_Abbreviation===ae}));isNaN(a)||(document.querySelectorAll("[data-amount-input]").forEach((function(e){if(e.getAttribute("data-currency-abbreviation")!==ae){var t=e.getAttribute("data-currency-abbreviation"),r=e,c=ie.find((function(e){return e.Cur_Abbreviation===t}));r.value=a<0?"0.00":(n.ratePerOneUnit/c.ratePerOneUnit*a).toFixed(2)}})),E=a<0?0:a,h(e.MAIN,"currencyAmount",E),setTimeout((function(){r.value=E.toFixed(2)}),3e3))}}),400);null==Q||Q.addEventListener("input",(function(e){return ue(e)})),null==z||z.addEventListener("click",(function(){z.classList.toggle("add-currencies__btn--active"),null==Z||Z.scrollTo(0,0),null==V||V.classList.toggle("add-currencies__form--active"),null==$||$.click()}));var se=function(){null==z||z.classList.remove("add-currencies__btn--active"),null==V||V.classList.remove("add-currencies__form--active")};document.body.addEventListener("keyup",(function(e){(null==V?void 0:V.classList.contains("add-currencies__form--active"))&&"Escape"===e.key&&(se(),null==$||$.click())})),document.body.addEventListener("click",(function(e){var t;if(e){var n=e.target,r=null==V?void 0:V.classList.contains("add-currencies__form--active");if(n&&r){var a="add-currencies-btn"===(null===(t=n.closest("button"))||void 0===t?void 0:t.id),c="add-currencies-form"===n.id,i="add-currencies-submit-btn"===n.id,o="add-currencies-reset-btn"===n.id,u="add-currencies-label"===n.id,s="addCurrenciesCheckbox"in n.dataset;a||c||s||u||i||o||(se(),null==$||$.click())}}})),null==V||V.addEventListener("submit",(function(t){if(t&&t.target){t.preventDefault(),se();var n=t.target,r=Object.fromEntries(new FormData(n).entries()),a=Object.keys(r);a.length&&(_=X(X([],_,!0),a,!0),l({currenciesListElement:Q,currenciesList:a,baseCurrencies:ce,baseCurrencyAbbreviation:ae,currenciesData:ie,currencyAmount:E,isClearListBeforeRender:!1,startingOrderPosition:_.length-a.length}),b({addCurrenciesListElement:Z,currenciesData:ie,userCurrenciesList:_}),f(ae,_),h(e.MAIN,"currenciesList",_))}})),null==Q||Q.addEventListener("click",(function(t){if(t){var n=t.target;if("BUTTON"===n.tagName){var r=n.closest("[data-currency-list-item]"),a=n.getAttribute("data-currency-abbreviation");if(r&&a){if(_=_.filter((function(e){return e!==a})),b({addCurrenciesListElement:Z,currenciesData:ie,userCurrenciesList:_}),h(e.MAIN,"currenciesList",_),Q.removeChild(r),a===ae){d(ae="BYN");var c=document.querySelectorAll("[data-currency-rate-value]"),i=ie.find((function(e){return e.Cur_Abbreviation===ae}));c.forEach((function(e){var t=e.getAttribute("data-currency-abbreviation"),n=ie.find((function(e){return e.Cur_Abbreviation===t}));e.textContent="1 ".concat(n.Cur_Abbreviation," = ").concat((n.ratePerOneUnit/i.ratePerOneUnit).toFixed(4)," ").concat(ae)})),h(e.MAIN,"baseCurrencyAbbreviation",ae),E=10,h(e.MAIN,"currencyAmount",E)}f(ae,_),document.querySelectorAll("[data-currency-list-item]").forEach((function(e,t){e.setAttribute("data-order-number","".concat(t))}))}}}})),null==Q||Q.addEventListener("mousedown",(function(e){return N({evt:e,currenciesListElement:Q,userCurrenciesList:_,baseCurrencyAbbreviation:ae})})),null==Q||Q.addEventListener("touchstart",(function(e){return N({evt:e,currenciesListElement:Q,userCurrenciesList:_,baseCurrencyAbbreviation:ae})}))})();
//# sourceMappingURL=main.ab8535cea17a004fc01c.js.map