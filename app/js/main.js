validate.init({
  messageValueMissing: 'Это поле обязательное для заполнения',
  messagePatternMismatch: 'Заполните поле в необходимом формате',
  messageValueMissingCheckbox: 'Поле должно быть активировано',
  messageRangeUnderflow: 'Недостаточная длина поля',
  messageRangeOverflow: 'Превышена длина поля',
  disableSubmit:true,
  onSubmit(form,asd){
    let blocks = form.querySelectorAll('.step-block');
    let activeIndex = 0;
    [...blocks].forEach((i,index) => {
      if(i.classList.contains('active')){
        console.log(index);
        activeIndex = index;
      }
    })
    moveAction(activeIndex + 1);
  }
});



/* TAB */
let stepAction = (triggerContainer = '.step-container',navigationContainer = '.tab-block-navigation nav',triggerStepBlock='.tab-block-stepform .step-block', triggerSelector = '.step-block-trigger', actionFunction = moveAction) => {
  let triggerContainerNode = document.querySelectorAll(triggerContainer);
  [...triggerContainerNode].forEach(container => {
    let triggerSelectorNode = container.querySelectorAll(triggerSelector);
    let stepBlocksQuantity = container.querySelectorAll(triggerStepBlock).length;
    // BUILD NAVIGATION
    let navigation = createNav(stepBlocksQuantity);
    if(navigation){
      let navigationSelector = container.querySelector(navigationContainer);
      navigationSelector.appendChild(navigation);
    }
    // ADD STEP VALIDATION
    validateStep(moveAction);
  })
}

let validateStep = (moveFunction,inputContainer = '.tab-block-stepform .step-block', eventInitializerSelector = 'button.step-event') => {
  let container = document.querySelectorAll(inputContainer);
  // FIND ALL VALIDATION BLOCKS
  [...container].forEach(function(i,index) {
    let eventInitializer = i.querySelector(eventInitializerSelector);
    if(eventInitializer !== null){
      let container = i;
      eventInitializer.addEventListener('click',function(e) {
        // FIND ALL INPUTS
        let containerInputs = container.querySelectorAll('input');
        let validation = [...containerInputs].forEach(i => {
          if(validate.hasError(i)){
            validate.showError(i,'Это поле обязательное для заполнения');
          }
        })
        if(![...containerInputs].some(i => validate.hasError(i))){
          // IF BLOCK DOESNT HAVE VALIDATION ERROR => do move function
          moveFunction(index + 1);
        }
      })
    }
  })
}

let createNav = (blocksQuantity, addClassList = 'tab-block-navigation-list',addClassListItem = 'tab-block-navigation-list__item') => {
  if(blocksQuantity > 0){
    let navList = document.createElement('ul');
    navList.classList.add(addClassList);
    for(let i = 0; i < blocksQuantity; i++){
      let navListItem = document.createElement('li');
      navListItem.classList.add(addClassListItem);
      // add adctive class for first
      if(i == 0){
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

}
let moveAction = (targetAttr,triggerTargetSelector = '.tab-block-imagestack .step-block,.tab-block-content-area__formarea .step-block, .tab-block-navigation-list li' ,triggerTargetActiveClass = 'active', triggerDecoreSelector = '.tab-block-step', triggerDecoreClass = 'tab-block-step-' ) => {
  // OUTER ELEMENT
  let decoration = document.querySelector(triggerDecoreSelector);
  // ALL ELEMENTS WHICH MUST CHANGE
  let triggerTargetSelectorArray = triggerTargetSelector.split(',');

  triggerTargetSelectorArray.forEach(item => {
    let element = document.querySelectorAll(item);
    if(item.length > 0 ){
      [...element].forEach((i,index) => {
        let stepAttr = index;
        if (stepAttr == targetAttr) {
          i.classList.add(triggerTargetActiveClass);
          decoration.classList.add(`${triggerDecoreClass}${index}`);
        } else {
          i.classList.remove(triggerTargetActiveClass);
          decoration.classList.remove(`${triggerDecoreClass}${index}`);
        }
      })
    }

  })

}
stepAction();


// Password repeater

let passwordRepeatChecker = (groupingSelector) => {

    let passwordFields = [...document.querySelectorAll(groupingSelector)].forEach(i => {
      console.log( i.querySelector('.password-parent'));
      let passwordFieldRelationParent = i.querySelector('.password-parent');
      let passwordFieldRelationChild = i.querySelector('.password-child');
      passwordCheckEvent(passwordFieldRelationParent,passwordFieldRelationChild);
    });
  }
  let passwordCheckEvent = (parent, child) => {
    child.addEventListener('keyup', function(e) {
      if(this.value !== parent.value){
        validate.showError(child,'Пароли не совпадают');
      } else {
        validate.removeError(child);
      }
    })


}
passwordRepeatChecker('.password-group');

// phonenumber copy
let copyValue = (original, insertWhere) => {
  let originalSelector = document.querySelector(original);
  let inserterSelector = document.querySelector(insertWhere);
  if(originalSelector != null){
    originalSelector.addEventListener('keyup', function(e) {
      inserterSelector.textContent = this.value;
    })
  }
}
copyValue('input[name="user-tel"]','.tel-field-val')


// add phonenumber autocomplete

let phoneMask = (phoneinput,format) => {
  let phoneInput = document.querySelectorAll(phoneinput);
  [...phoneInput].forEach(i => {

    i.addEventListener('keyup', function(e){
      if(this.value.length < format.length){
        this.value = format;
      }
    })
  })
}
phoneMask('input[name="user-tel"]','+375')
