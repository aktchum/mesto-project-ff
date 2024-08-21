(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-20",headers:{authorization:"93b36b91-e849-4a26-8317-b182f235ff0c","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},r=document.querySelector("#card-template").content;function o(e){e.classList.toggle("card__like-button_is-active")}function c(e,t){n(t).then((function(){e.remove()})).catch((function(e){return console.log("Ошибка при удалении карточки: ".concat(e))}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}}function l(e,t,n){var r=n.inputErrorClass,o=n.errorClass,c=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),c.classList.remove(o),c.textContent="",t.setCustomValidity("")}function s(e,t,n){var r=n.inactiveButtonClass;e.some((function(e){return!e.validity.valid}))?(t.classList.add(r),t.disabled=!0):(t.classList.remove(r),t.disabled=!1)}function d(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f,m=document.querySelector(".places__list"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_image"),h=document.querySelector(".popup_type_avatar-edit"),b=v.querySelector(".popup__image"),S=v.querySelector(".popup__caption"),k=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__image"),g=document.querySelector(".profile__add-button"),q=document.querySelectorAll(".popup__close"),E=document.querySelectorAll(".popup"),L=document.forms["edit-profile"],x=L.querySelector(".popup__input_type_name"),A=L.querySelector(".popup__input_type_description"),U=L.querySelector(".popup__button"),w=document.forms["new-place"],D=w.elements["place-name"],O=w.elements.link,T=w.querySelector(".popup__button"),j=document.forms["avatar-edit"],I=j.elements["avatar-link"],P=j.querySelector(".popup__button"),B=document.querySelector(".profile__title"),M=document.querySelector(".profile__description"),N=document.querySelector(".profile__image"),J="Сохранение...",V="Сохранить",H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function z(n,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",u=function(n){var o=n.cardData,c=n.deleteCardCallback,a=n.imageClickCallback,i=n.userId,u=r.querySelector(".places__item.card").cloneNode(!0),l=u.querySelector(".card__image"),s=u.querySelector(".card__title"),d=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-counter"),f=u.querySelector(".card__delete-button");return l.src=o.link,l.alt=o.name,s.textContent=o.name,p.textContent=o.likes.length,o.owner._id===i?f.addEventListener("click",(function(){c(u,o._id)})):f.remove(),o.likes.some((function(e){return e._id===i}))&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){var n;d.classList.contains("card__like-button_is-active")?(n=o._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){d.classList.remove("card__like-button_is-active"),p.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при снятии лайка: ".concat(e))})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(o._id).then((function(e){d.classList.add("card__like-button_is-active"),p.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка при постановке лайка: ".concat(e))}))})),l.addEventListener("click",(function(){a(l,s)})),u}({cardData:n,deleteCardCallback:c,likeCardCallback:o,imageClickCallback:F,userId:a});m[i](u)}function $(e,t){e.textContent=t}function F(e,t){b.src=e.src,b.alt=e.alt,S.textContent=t.textContent,a(v)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=r.inputErrorClass,c=r.errorClass,a=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),a.textContent=n,a.classList.add(c)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(H),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];f=o,B.textContent=o.name,M.textContent=o.about,N.style.backgroundImage="url(".concat(o.avatar,")"),c.forEach((function(e){z(e,o._id,"append")}))})).catch((function(e){console.log("Ошибка загрузки данных: ".concat(e))})),document.addEventListener("DOMContentLoaded",(function(){E.forEach((function(e){e.classList.add("popup_is-animated")}))})),k.addEventListener("click",(function(){x.value=B.textContent,A.value=M.textContent,a(_),d(_,H)})),g.addEventListener("click",(function(){a(y),d(y,H)})),q.forEach((function(e){e.addEventListener("click",(function(e){i(e.target.closest(".popup"))}))})),E.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&i(e)}))})),L.addEventListener("submit",(function(n){n.preventDefault();var r=x.value,o=A.value;$(U,J),function(n,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then(t)}(r,o).then((function(e){B.textContent=e.name,M.textContent=e.about,i(_)})).catch((function(e){console.log("Ошибка при обновлении профиля: ".concat(e))})).finally((function(){$(U,V)}))})),w.addEventListener("submit",(function(n){n.preventDefault();var r,o,c={name:D.value,link:O.value};$(T,J),(r=c.name,o=c.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})}).then(t)).then((function(e){z(e,f._id,"prepend"),i(y),w.reset()})).catch((function(e){console.log("Ошибка добавления новой карточки: ".concat(e))})).finally((function(){$(T,V)}))})),C.addEventListener("click",(function(){a(h),d(h,H)})),j.addEventListener("submit",(function(n){n.preventDefault();var r=I.value;$(P,J),function(n){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)}(r).then((function(e){N.style.backgroundImage="url(".concat(e.avatar,")"),i(h),j.reset()})).catch((function(e){console.log("Ошибка при обновлении аватара: ".concat(e))})).finally((function(){$(P,V)}))}))})();