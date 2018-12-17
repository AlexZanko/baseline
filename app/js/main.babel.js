"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Array.from||(Array.from=function(){var e=Object.prototype.toString,t=function(t){return"function"==typeof t||"[object Function]"===e.call(t)},o=Math.pow(2,53)-1,r=function(e){var t,r=(t=Number(e),isNaN(t)?0:0!==t&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t);return Math.min(Math.max(r,0),o)};return function(e){var o=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var n,a=arguments.length>1?arguments[1]:void 0;if(void 0!==a){if(!t(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(n=arguments[2])}for(var l,c=r(o.length),i=t(this)?Object(new this(c)):new Array(c),s=0;s<c;)l=o[s],i[s]=a?void 0===n?a(l,s):a.call(n,l,s):l,s+=1;return i.length=c,i}}()),validate.init({messageValueMissing:"Это поле обязательное для заполнения",messagePatternMismatch:"Заполните поле в необходимом формате",messageValueMissingCheckbox:"Поле должно быть активировано",messageRangeUnderflow:"Недостаточная длина поля",messageRangeOverflow:"Превышена длина поля",disableSubmit:!0,onSubmit:function(e,t){var o=e.querySelectorAll(".step-block"),r=0;[].concat(_toConsumableArray(o)).forEach(function(e,t){e.classList.contains("active")&&(console.log(t),r=t)}),moveAction(r+1)}});var stepAction=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".step-container",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".tab-block-navigation nav",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".tab-block-stepform .step-block",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".step-block-trigger",n=(arguments.length>4&&void 0!==arguments[4]&&arguments[4],document.querySelectorAll(e));[].concat(_toConsumableArray(n)).forEach(function(e){e.querySelectorAll(r);var n=e.querySelectorAll(o).length,a=createNav(n);a&&e.querySelector(t).appendChild(a);validateStep(moveAction)})},validateStep=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".tab-block-stepform .step-block",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"button.step-event",r=document.querySelectorAll(t);[].concat(_toConsumableArray(r)).forEach(function(t,r){var n=t.querySelector(o);if(null!==n){var a=t;n.addEventListener("click",function(t){var o=a.querySelectorAll("input");[].concat(_toConsumableArray(o)).forEach(function(e){validate.hasError(e)&&validate.showError(e,"Это поле обязательное для заполнения")});[].concat(_toConsumableArray(o)).some(function(e){return validate.hasError(e)})||e(r+1)})}})},createNav=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"tab-block-navigation-list",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"tab-block-navigation-list__item";if(e>0){var r=document.createElement("ul");r.classList.add(t);for(var n=0;n<e;n++){var a=document.createElement("li");a.classList.add(o),0==n&&a.classList.add("active"),a.textContent=n+1,r.appendChild(a)}return r}return!1},moveAction=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:".tab-block-imagestack .step-block,.tab-block-content-area__formarea .step-block, .tab-block-navigation-list li",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"active",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".tab-block-step",n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"tab-block-step-",a=document.querySelector(r);t.split(",").forEach(function(t){var r=document.querySelectorAll(t);t.length>0&&[].concat(_toConsumableArray(r)).forEach(function(t,r){r==e?(t.classList.add(o),a.classList.add(""+n+r)):(t.classList.remove(o),a.classList.remove(""+n+r))})})};stepAction();var passwordRepeatChecker=function(e){[].concat(_toConsumableArray(document.querySelectorAll(e))).forEach(function(e){console.log(e.querySelector(".password-parent"));var t=e.querySelector(".password-parent"),o=e.querySelector(".password-child");passwordCheckEvent(t,o)})},passwordCheckEvent=function(e,t){t.addEventListener("keyup",function(o){this.value!==e.value?validate.showError(t,"Пароли не совпадают"):validate.removeError(t)})};passwordRepeatChecker(".password-group");var copyValue=function(e,t){var o=document.querySelector(e),r=document.querySelector(t);null!=o&&o.addEventListener("keyup",function(e){r.textContent=this.value})};copyValue('input[name="user-tel"]',".tel-field-val");var phoneMask=function(e,t){var o=document.querySelectorAll(e);[].concat(_toConsumableArray(o)).forEach(function(e){e.addEventListener("keyup",function(e){this.value.length<t.length&&(this.value=t)})})};phoneMask('input[name="user-tel"]',"+375");
