'use strict';
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

validate.init({
  messageValueMissing: 'Это поле обязательное для заполнения',
  messagePatternMismatch: 'Заполните поле в необходимом формате',
  messageValueMissingCheckbox: 'Поле должно быть активировано',
  messageRangeUnderflow: 'Недостаточная длина поля',
  messageRangeOverflow: 'Превышена длина поля',
  disableSubmit: true,
  onSubmit: function onSubmit(form, asd) {
    var blocks = form.querySelectorAll('.step-block');
    var activeIndex = 0;
    [].concat(_toConsumableArray(blocks)).forEach(function (i, index) {
      if (i.classList.contains('active')) {
        console.log(index);
        activeIndex = index;
      }
    });
    moveAction(activeIndex + 1);
  }
});

/* TAB */
var stepAction = function stepAction() {
  var triggerContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.step-container';
  var navigationContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.tab-block-navigation nav';
  var triggerStepBlock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.tab-block-stepform .step-block';
  var triggerSelector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.step-block-trigger';
  var actionFunction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : moveAction;

  var triggerContainerNode = document.querySelectorAll(triggerContainer);
  [].concat(_toConsumableArray(triggerContainerNode)).forEach(function (container) {
    var triggerSelectorNode = container.querySelectorAll(triggerSelector);
    var stepBlocksQuantity = container.querySelectorAll(triggerStepBlock).length;
    // BUILD NAVIGATION
    var navigation = createNav(stepBlocksQuantity);
    if (navigation) {
      var navigationSelector = container.querySelector(navigationContainer);
      navigationSelector.appendChild(navigation);
    }
    // ADD STEP VALIDATION
    validateStep(moveAction);
  });
};

var validateStep = function validateStep(moveFunction) {
  var inputContainer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.tab-block-stepform .step-block';
  var eventInitializerSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'button.step-event';

  var container = document.querySelectorAll(inputContainer);
  // FIND ALL VALIDATION BLOCKS
  [].concat(_toConsumableArray(container)).forEach(function (i, index) {
    var eventInitializer = i.querySelector(eventInitializerSelector);
    if (eventInitializer !== null) {
      var _container = i;
      eventInitializer.addEventListener('click', function (e) {
        // FIND ALL INPUTS
        var containerInputs = _container.querySelectorAll('input');
        var validation = [].concat(_toConsumableArray(containerInputs)).forEach(function (i) {
          if (validate.hasError(i)) {
            validate.showError(i, 'Поле обязательное для заполенения');
          }
        });
        if (![].concat(_toConsumableArray(containerInputs)).some(function (i) {
          return validate.hasError(i);
        })) {
          // IF BLOCK DOESNT HAVE VALIDATION ERROR => do move function
          moveFunction(index + 1);
        }
      });
    }
  });
};

var createNav = function createNav(blocksQuantity) {
  var addClassList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tab-block-navigation-list';
  var addClassListItem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tab-block-navigation-list__item';

  if (blocksQuantity > 0) {
    var navList = document.createElement('ul');
    navList.classList.add(addClassList);
    for (var i = 0; i < blocksQuantity; i++) {
      var navListItem = document.createElement('li');
      navListItem.classList.add(addClassListItem);
      // add adctive class for first
      if (i == 0) {
        navListItem.classList.add('active');
      }
      navListItem.textContent = i + 1;
      /*  navListItem.addEventListener('click',e => {
          moveAction(i);
        }) */
      navList.appendChild(navListItem);
    }
    return navList;
  } else {
    return false;
  }
};
var moveAction = function moveAction(targetAttr) {
  var triggerTargetSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.tab-block-imagestack .step-block,.tab-block-content-area__formarea .step-block, .tab-block-navigation-list li';
  var triggerTargetActiveClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'active';
  var triggerDecoreSelector = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.tab-block-step';
  var triggerDecoreClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'tab-block-step-';

  // OUTER ELEMENT
  var decoration = document.querySelector(triggerDecoreSelector);
  // ALL ELEMENTS WHICH MUST CHANGE
  var triggerTargetSelectorArray = triggerTargetSelector.split(',');

  triggerTargetSelectorArray.forEach(function (item) {
    var element = document.querySelectorAll(item);
    if (item.length > 0) {
      [].concat(_toConsumableArray(element)).forEach(function (i, index) {
        var stepAttr = index;
        if (stepAttr == targetAttr) {
          i.classList.add(triggerTargetActiveClass);
          decoration.classList.add('' + triggerDecoreClass + index);
        } else {
          i.classList.remove(triggerTargetActiveClass);
          decoration.classList.remove('' + triggerDecoreClass + index);
        }
      });
    }
  });
};
stepAction();

// Password repeater

var passwordRepeatChecker = function passwordRepeatChecker(groupingSelector) {

  var passwordFields = [].concat(_toConsumableArray(document.querySelectorAll(groupingSelector))).forEach(function (i) {
    console.log(i.querySelector('.password-parent'));
    var passwordFieldRelationParent = i.querySelector('.password-parent');
    var passwordFieldRelationChild = i.querySelector('.password-child');
    passwordCheckEvent(passwordFieldRelationParent, passwordFieldRelationChild);
  });
};
var passwordCheckEvent = function passwordCheckEvent(parent, child) {
  child.addEventListener('keyup', function (e) {
    if (this.value !== parent.value) {
      validate.showError(child, 'Пароли не совпадают');
    } else {
      validate.removeError(child);
    }
  });
};
passwordRepeatChecker('.password-group');

// phonenumber copy
var copyValue = function copyValue(original, insertWhere) {
  var originalSelector = document.querySelector(original);
  var inserterSelector = document.querySelector(insertWhere);
  if (originalSelector != null) {
    originalSelector.addEventListener('keyup', function (e) {
      inserterSelector.textContent = this.value;
    });
  }
};
copyValue('input[name="user-tel"]', '.tel-field-val');

// add phonenumber autocomplete

var phoneMask = function phoneMask(phoneinput, format) {
  var phoneInput = document.querySelectorAll(phoneinput);
  [].concat(_toConsumableArray(phoneInput)).forEach(function (i) {

    i.addEventListener('keyup', function (e) {
      if (this.value.length < format.length) {
        this.value = format;
      }
    });
  });
};
phoneMask('input[name="user-tel"]', '+375');
