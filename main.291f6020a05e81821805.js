(()=>{"use strict";var e,t,n,r=document.getElementById("currencies-list"),a=document.getElementById("base-currency-abbreviation"),c=document.getElementById("template"),i=c?c.content.getElementById("currency-list-item"):null,u=i?i.querySelector("[data-amount-label]"):null,o=i?i.querySelector("[data-amount-input]"):null,s=i?i.querySelector("[data-currency-rate-value]"):null,l=i?i.querySelector("[data-delete-currency-btn]"):null,d=function(e){var t=e.currenciesList,n=e.baseCurrencies,c=e.baseCurrencyAbbreviation,d=e.currencyAmount,b=e.currenciesData,v=e.isClearListBeforeRender,f=void 0===v||v;if(i&&r&&b){var m=b.filter((function(e){return t.has(e.Cur_Abbreviation)})).sort((function(e,t){return!n.has(e.Cur_Abbreviation)&&n.has(t.Cur_Abbreviation)?1:n.has(e.Cur_Abbreviation)&&!n.has(t.Cur_Abbreviation)?-1:0})),y=b.find((function(e){return e.Cur_Abbreviation===c}));y&&(a&&(a.textContent="".concat(c)),f&&(r.textContent=""),m.forEach((function(e){if(u&&o&&s&&l){u.textContent="".concat(e.Cur_Name_Eng," (").concat(e.Cur_Abbreviation,")"),u.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),o.value=(y.ratePerOneUnit/e.ratePerOneUnit*d).toFixed(2),o.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),s.textContent="1 ".concat(e.Cur_Abbreviation," = ").concat((e.ratePerOneUnit/y.ratePerOneUnit).toFixed(4)," ").concat(c),s.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation)),l.disabled=n.has(e.Cur_Abbreviation),l.setAttribute("data-currency-abbreviation","".concat(e.Cur_Abbreviation));var t=i.cloneNode(!0);r.appendChild(t)}})))}},b=document.getElementById("available-currencies-list"),v=function(e,t){if(b){var n=e.filter((function(e){return!t.has(e.Cur_Abbreviation)}));b.innerText="",n.forEach((function(e){b.insertAdjacentHTML("beforeend",'<div class="add-currencies__checkbox-wrapper">\n        <input class="add-currencies__input" type="checkbox" id='.concat(e.Cur_ID,"-").concat(e.Cur_Abbreviation," name=").concat(e.Cur_Abbreviation,' data-add-currencies-checkbox>\n        <label class="add-currencies__label" id="add-currencies-label" for=').concat(e.Cur_ID,"-").concat(e.Cur_Abbreviation," data-currency-abbreviation=").concat(e.Cur_Abbreviation,">").concat(e.Cur_Name_Eng," (").concat(e.Cur_Abbreviation,")</label>\n      </div>"))}))}},f=function(e){var t="".concat(e.getFullYear()),n=e.getMonth()+1<10?"0".concat(e.getMonth()+1):"".concat(e.getMonth()+1),r=e.getDate()<10?"0".concat(e.getDate()):"".concat(e.getDate());return"".concat(t,"-").concat(n,"-").concat(r)};function m(e,t){var n;return function(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];clearTimeout(n),n=setTimeout((function(){e.apply(void 0,r)}),t)}}!function(e){e.MAIN="CurrenciesCalculatorApp"}(e||(e={})),function(e){e.LIGHT="light",e.DARK="dark"}(t||(t={})),function(e){e.NAME="data-theme-type"}(n||(n={}));var y,A,g,C,_=function(){return _=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},_.apply(this,arguments)},h=function(e){var t=localStorage.getItem(e);return JSON.parse(t)},p=function(t,n,r){var a,c=h(e.MAIN),i=_(_({},c),((a={})[n]=r,a));localStorage.setItem(t,JSON.stringify(i))},E=function(){return h(e.MAIN).themeType},N=document.getElementById("snack-bar"),w=document.getElementById("snack-bar-text"),I=document.getElementById("spinner"),L=function(e){I&&(e?I.classList.add("spinner--active"):I.classList.remove("spinner--active"))},x=function(){return x=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},x.apply(this,arguments)},k=function(e,t,n,r){return new(n||(n=Promise))((function(a,c){function i(e){try{o(r.next(e))}catch(e){c(e)}}function u(e){try{o(r.throw(e))}catch(e){c(e)}}function o(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}o((r=r.apply(e,t||[])).next())}))},B=function(e,t){var n,r,a,c,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return c={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function u(c){return function(u){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}},M="https://www.nbrb.by/api/exrates/",O="".concat(M,"/rates?periodicity=0"),D="".concat(M,"/currencies/"),S=[],T=function(e){return k(void 0,void 0,Promise,(function(){var t;return B(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat(O,"&ondate=").concat(f(e)))];case 1:return(t=n.sent()).ok?[4,t.json()]:[3,3];case 2:return[2,n.sent()];case 3:throw new Error("Network error:"+t.status)}}))}))},P=function(e){return k(void 0,void 0,Promise,(function(){var t,n;return B(this,(function(r){switch(r.label){case 0:return r.trys.push([0,4,5,6]),L(!0),[4,T(e)];case 1:return t=r.sent(),n=[],S.length?[3,3]:[4,k(void 0,void 0,Promise,(function(){var e;return B(this,(function(t){switch(t.label){case 0:return[4,fetch(D)];case 1:return(e=t.sent()).ok?[4,e.json()]:[3,3];case 2:return[2,t.sent()];case 3:throw new Error("Network error:"+e.status)}}))}))];case 2:S=r.sent(),r.label=3;case 3:return n=t.map((function(e){var t=S.find((function(t){return t.Cur_ID===e.Cur_ID})),n=t.Cur_Name_Eng,r=t.Cur_QuotName_Eng,a=t.Cur_Name_EngMulti,c=e.Cur_OfficialRate/e.Cur_Scale;return x(x({},e),{Cur_Abbreviation:e.Cur_Abbreviation.toUpperCase(),Cur_Name_Eng:n,Cur_QuotName_Eng:r,Cur_Name_EngMulti:a,ratePerOneUnit:c})})),n.push({Cur_ID:933,Date:n[0].Date,Cur_Abbreviation:"BYN",Cur_Scale:1,Cur_Name:"Белорусский рубль",Cur_OfficialRate:1,Cur_Name_Eng:"Belarusian Ruble",Cur_QuotName_Eng:"1 Belarusian Ruble",Cur_Name_EngMulti:"Belarusian Rubles",ratePerOneUnit:1}),[2,n];case 4:return a=r.sent().message,7e3,N&&w&&(w.textContent=a,N.classList.add("snack-bar--active"),setTimeout((function(){N.classList.remove("snack-bar--active")}),7e3)),[3,6];case 5:return L(!1),[7];case 6:return[2]}var a}))}))},U=function(e,t,n){if(n||2===arguments.length)for(var r,a=0,c=t.length;a<c;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},R=document.body,j=document.getElementById("theme-switcher"),F=document.getElementById("date-picker"),q=document.getElementById("base-currency-abbreviation"),H=document.getElementById("currencies-list"),Y=document.getElementById("add-currencies-btn"),G=document.getElementById("add-currencies-form"),J=document.getElementById("available-currencies-list"),K=document.getElementById("add-currencies-reset-btn"),Q=document.getElementById("calculator-additional-info"),z=new Date,V=new Date(2020,0,1),W=window.matchMedia&&window.window.matchMedia("(prefers-color-scheme: dark)").matches?t.DARK:t.LIGHT,X="BYN",Z=new Set(["BYN","RUB","USD","EUR","CNY"]),$=[];g=e.MAIN,C={themeType:W,baseCurrencyAbbreviation:X,currencyAmount:10,currenciesList:Array.from(Z)},localStorage.getItem(g)||localStorage.setItem(g,JSON.stringify(C)),X=h(e.MAIN).baseCurrencyAbbreviation,y=h(e.MAIN).currencyAmount,A=new Set(h(e.MAIN).currenciesList),function(e){if(e){var t=E();e.getAttribute(n.NAME)!==t&&document.body.setAttribute(n.NAME,t)}}(R),F&&function(e,t,n,r){e&&(e.setAttribute("value",f(t)),n&&e.setAttribute("min",f(n)),r&&e.setAttribute("max",f(r)))}(F,z,V,z),P(z).then((function(e){var t,n,r,a,c,i;d({currenciesList:A,baseCurrencies:Z,baseCurrencyAbbreviation:X,currenciesData:e,currencyAmount:y}),(null==e?void 0:e.length)?($.push.apply($,e),v($,A),null==Q||Q.classList.add("calculator__additional-info--active")):(n=(t={message:"Ups, something went wrong &#128533",containerElement:document.getElementById("currencies-list"),tagName:"li",tagClassName:"calculator__currencies-list-warning",textTagClassName:"calculator__currencies-list-warning-text"}).message,a=t.tagName,c=t.tagClassName,i=t.textTagClassName,(r=t.containerElement)&&r.insertAdjacentHTML("afterbegin","<".concat(a.toLocaleLowerCase()," class=").concat(c,">\n      <span class=").concat(i,">").concat(n,"</span>\n    </").concat(a.toLocaleLowerCase(),">")))})),null==j||j.addEventListener("click",(function(){return r=E(),a=R,c=r===t.LIGHT?t.DARK:t.LIGHT,a.setAttribute(n.NAME,c),void p(e.MAIN,"themeType",c);var r,a,c}));var ee=m((function(e){if(e){var t=e.target,n=t.valueAsDate;if(n){var r=new Date(t.min),a=new Date(t.max);r&&n<r&&(t.value=f(r),n=r),a&&n>a&&(t.value=f(a),n=a),P(n).then((function(e){d({currenciesList:A,baseCurrencies:Z,baseCurrencyAbbreviation:X,currenciesData:e,currencyAmount:y}),(null==e?void 0:e.length)?($.length=0,$.push.apply($,e),v($,A)):t.value=f(z)}))}}}),600);null==F||F.addEventListener("input",(function(e){return ee(e)}));var te=m((function(t){if(t){var n,r=t.target,a=r.valueAsNumber,c=r.getAttribute("data-currency-abbreviation");if(c!==X){var i=document.querySelectorAll("[data-currency-rate-value]");n=$.find((function(e){return e.Cur_Abbreviation===c})),i.forEach((function(e){var t=e.getAttribute("data-currency-abbreviation"),r=$.find((function(e){return e.Cur_Abbreviation===t}));e.textContent="1 ".concat(r.Cur_Abbreviation," = ").concat((r.ratePerOneUnit/n.ratePerOneUnit).toFixed(4)," ").concat(c)})),X=c,q&&(q.textContent=X),p(e.MAIN,"baseCurrencyAbbreviation",X)}else n=$.find((function(e){return e.Cur_Abbreviation===X}));isNaN(a)||(document.querySelectorAll("[data-amount-input]").forEach((function(e){if(e.getAttribute("data-currency-abbreviation")!==X){var t=e.getAttribute("data-currency-abbreviation"),r=e,c=$.find((function(e){return e.Cur_Abbreviation===t}));r.value=a<0?"0.00":(n.ratePerOneUnit/c.ratePerOneUnit*a).toFixed(2)}})),y=a<0?0:a,p(e.MAIN,"currencyAmount",y),setTimeout((function(){r.value=y.toFixed(2)}),3e3))}}),400);null==H||H.addEventListener("input",(function(e){return te(e)})),null==Y||Y.addEventListener("click",(function(){Y.classList.toggle("add-currencies__btn--active"),null==J||J.scrollTo(0,0),null==G||G.classList.toggle("add-currencies__form--active"),null==K||K.click()}));var ne=function(){null==Y||Y.classList.remove("add-currencies__btn--active"),null==G||G.classList.remove("add-currencies__form--active")};document.body.addEventListener("keyup",(function(e){(null==G?void 0:G.classList.contains("add-currencies__form--active"))&&"Escape"===e.key&&(ne(),null==K||K.click())})),document.body.addEventListener("click",(function(e){var t;if(e){var n=e.target,r=null==G?void 0:G.classList.contains("add-currencies__form--active");if(n&&r){var a="add-currencies-btn"===(null===(t=n.closest("button"))||void 0===t?void 0:t.id),c="add-currencies-form"===n.id,i="add-currencies-submit-btn"===n.id,u="add-currencies-reset-btn"===n.id,o="add-currencies-label"===n.id,s="addCurrenciesCheckbox"in n.dataset;a||c||s||o||i||u||(ne(),null==K||K.click())}}})),null==G||G.addEventListener("submit",(function(t){if(t&&t.target){t.preventDefault(),ne();var n=t.target,r=Object.fromEntries(new FormData(n).entries()),a=new Set(Object.keys(r));if(a.size){var c=U(U([],Array.from(A),!0),Array.from(a),!0);A=new Set(c),d({currenciesList:a,baseCurrencies:Z,baseCurrencyAbbreviation:X,currenciesData:$,currencyAmount:y,isClearListBeforeRender:!1}),v($,A),p(e.MAIN,"currenciesList",c)}}})),null==H||H.addEventListener("click",(function(t){if(t){var n=t.target;if("BUTTON"===n.tagName){var r=n.closest("[data-currency-list-item]"),a=n.getAttribute("data-currency-abbreviation");if(r&&a&&(A.delete(a),v($,A),p(e.MAIN,"currenciesList",Array.from(A)),H.removeChild(r),a===X)){X="BYN";var c=document.querySelectorAll("[data-currency-rate-value]"),i=$.find((function(e){return e.Cur_Abbreviation===X}));c.forEach((function(e){var t=e.getAttribute("data-currency-abbreviation"),n=$.find((function(e){return e.Cur_Abbreviation===t}));e.textContent="1 ".concat(n.Cur_Abbreviation," = ").concat((n.ratePerOneUnit/i.ratePerOneUnit).toFixed(4)," ").concat(X)})),q&&(q.textContent=X),p(e.MAIN,"baseCurrencyAbbreviation",X),y=10,p(e.MAIN,"currencyAmount",y)}}}}))})();
//# sourceMappingURL=main.291f6020a05e81821805.js.map