//start ajax card



// $(function(){
//     let productData =null;
//     let page_capacity = 6;
//     let productItem = null;
//     $.ajax({
//         url:"XML/products.xml" ,
//         success:function(response){
//             productData = response;
//             productItem = $(productData).find("product");
//             createPage();
//             createProduct(1);
//         },
//         timeout:5000 ,
//         error:function(){
//             alert("Error Found!")
//         }

//     });

//     function createPage(){

//         let PageNo = Math.ceil(productItem.length / page_capacity);
//         for (pageItemNo = 1 ; pageItemNo <= PageNo ; pageItemNo++){
//             $(".pageCenter nav .pagination li").last().before("<li class='page-item'><a href='#' class='page-link'>"+pageItemNo+"</a></li>")
//         }

//         $(".pageCenter .pagination li.page-item a.page-link").not("[aria-label]").click(function(){
//             setPage($(this).text());
//         });

//         $(".pageCenter .pagination li.page-item a.page-link ").not("[aria-label]").parent().first().addClass("active");

//         $(".pageCenter .pagination li.page-item a.page-link[aria-label='Previous']").click(function(){
//             var prevPage =  Number($(".pageCenter .pagination li.page-item.active").text())  - 1;
//             setPage(prevPage);
//         });

//         $(".pageCenter .pagination li.page-item a.page-link[aria-label='Next']").click(function(){
//             var nextPage =  Number($(".pageCenter .pagination li.page-item.active").text()) + 1;
//             setPage(nextPage);
//         });
//         function setPage(pageNo){
//             //   event.preventDefault();
//             //   event.stopPropagation();
//             createProduct(pageNo);
//             $(".pageCenter .pagination li.page-item.active").removeClass("active");
//             $(".pageCenter .pagination li.page-item").eq(pageNo).addClass("active");
//             $("body , html").animate({scrollTop :920 } , 500)};
//     }



//     function createProduct(page_current_no){

//         var product = $(productData).find("product");
//         $(".card-section").html("");

//         var MaxNoItem = ((page_current_no) * page_capacity) > $(productItem).length  ? $(productItem).length : (page_current_no * page_capacity);


//         for(let item =  (page_current_no -1) * page_capacity  ; item < MaxNoItem ; item++){

//             $(".card-section ").last().append(`

//             <div class="col-sm-12 col-md-6 col-lg-4">
//             <div class="card card-product mt-3">
//                 <div class="align-items-center p-2 text-center">
//                     <img src="images/img-4.jpg" alt="" class="rounded img-fluid" width="160">
//                     <h5 class="mt-2 product-name text-uppercase"></h5>
//                     <div class="mt-3 info">
//                         <span class="text1 d-block product-explain nowrap text-center"></span>
//                         <span class="text1 text-capitalize text-danger">more</span>
//                     </div>
//                     <div class="cost text-dark mt-3">
//                         <div class="price align-self-center py-2 px-3 text-white">
//                             <span class="product-price"></span>
//                         </div>
//                         <div class="stars mt-3 align-items-center">
//                             <ion-icon name="star" class="star"></ion-icon>
//                             <ion-icon name="star" class="star"></ion-icon>
//                             <ion-icon name="star" class="star"></ion-icon>
//                             <ion-icon name="star" class="star"></ion-icon>
//                             <ion-icon name="star" class="star"></ion-icon>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="p-3 text-center text-white mt-3 add-to-cart cursor">
//         <span class="text-uppercase">add to cart
//          <ion-icon name="bag-add"></ion-icon>
//         </span>
//                 </div>
//             </div>
//         </div>

// `)
//             $(".card-section .card img").last().attr("src","images/"+$(product).eq(item).attr("id") +".jpg");
//             $(".card-section .card .product-name").last().text($(product).eq(item).find("Name").text());
//             $(".card-section .card .product-price").last().text($(product).eq(item).find("price").text());
//             $(".card-section .card .product-explain").last().text($(product).eq(item).find("description").text());

//         };

//     };

// });

//end ajax card
$(function () {
  let productData = null;
  let productItem = null;
  $.ajax({
    url: "XML/products.xml",
    success: function (response) {
      productData = response;
      productItem = $(productData).find("product");
      createProductSlider(1);
    },
    timeout: 5000,
    error: function () {
      alert("Error Found!");
    }

  })

  function createProductSlider(No) {
    var MaxNoItem = ((No) * 6) > $(productItem).length ? $(productItem).length : (No * 6);

    for (let item = 0; item < MaxNoItem; item++) {
      $("#responsive").last().append(`
      <li'>
      <div class=" col-12">
      <div class="card card-product mb-5 mt-2">
          <div class="align-items-center p-2 text-center">
             <div class="card-img">
             <img src="" alt="" class="rounded img-fluid" width="160">
             </div>
                <h5 class="mt-1 product-name text-uppercase"></h5>
              <div class="mt-1 info">
                  <span class="text1 d-block product-explain nowrap text-center"></span>
                  <span class="text1 text-capitalize text-danger">more</span>
              </div>
              <div class="cost text-dark mt-1">
                  <div class="price align-self-center py-2 px-3 text-white">
                      <span class="product-price"></span>
                  </div>
                  <div class="stars mt-3 align-items-center">
                      <ion-icon name="star" class="star"></ion-icon>
                      <ion-icon name="star" class="star"></ion-icon>
                      <ion-icon name="star" class="star"></ion-icon>
                      <ion-icon name="star" class="star"></ion-icon>
                      <ion-icon name="star" class="star"></ion-icon>
                  </div>
              </div>
          </div>
          <div class="p-3 text-center text-white add-to-cart cursor">
  <span class="text-uppercase">add to cart
   <ion-icon name="bag-add"></ion-icon>
  </span>
          </div>
      </div>
  </div>
      </li>
`)
      $("#responsive .card img").last().attr("src", "img/" + $(productItem).eq(item).attr("id") + ".jpg");
      $("#responsive .card .product-name").last().text($(productItem).eq(item).find("Name").text());
      $("#responsive .card .product-price").last().text($(productItem).eq(item).find("price").text() + "$");
    };
    $("#responsive").lightSlider(
      {
        item: 4,
        loop: true,
        auto: true,
        pauseOnHover: true,
        slideMove: 1,
        slideMargin: 1,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        speed: 1000,
        responsive: [
          {
            breakpoint: 990,
            settings: {
              item: 3,
              slideMove: 1,
              slideMargin: 1,
              loop: true,
              speed: 1000,
              easing: 'cubic-bezier(0.25, 0, 0.25, 1)'
            }
          },
          {
            breakpoint: 770,
            settings: {
              item: 2,
              slideMove: 1,
              slideMargin: 1,
              loop: true,
              speed: 1000,
              easing: 'cubic-bezier(0.25, 0, 0.25, 1)'
            }
          },
          {
            breakpoint: 550,
            settings: {
              item: 1,
              slideMove: 1,
              slideMargin: 1,
              loop: true,
              speed: 1000,
              easing: 'cubic-bezier(0.25, 0, 0.25, 1)'
            }
          }
        ]
      }
    );
    $(".add-to-cart").click(function () {
      swal({
        title: "Oops",
        text: "please Signup or Signin first!",
        icon: "",
        closeModal: true,
      });
    })

  };

});

// script navbar start
let selectMenueIcons = document.querySelector(".menue-icons");
selectMenueIcons.addEventListener("click", function () {
  let selectNavebar = document.querySelector("navbar");
  selectNavebar.classList.toggle("active");
});
// script navbar end


//Gallery script start
$(".gallery").magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: {
    enabled: true
  }
});
//Gallery script end

//scrollbar script start
var progressbar = document.getElementById("progressbar");
var totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  var progressHeight = (window.pageYOffset / totalHeight) * 100;
  progressbar.style.height = progressHeight + "%";
}
//scrollbar script end

//scroll to top script start
let scrollToTop = document.getElementById("ScrollToTop");
scrollToTop.addEventListener("click", function () {
  // window.scrollTo({
  //     top: 0 ,
  //     left : 0 ,
  //     behavior : "smooth"
  // })
  //  just vanilla js and animation

  // OR

  $("html , body").animate({ scrollTop: 0 }, "slow");
  // just use jquery
})
//scroll to top script end

//card Gallery script start
let selectCard = document.querySelectorAll(".Card-container .card-Gallery");
selectCard.forEach((selectCard) => {
  selectCard.addEventListener("click", function () {
    selectCard.classList.toggle("active");
  });
});
//card Gallery script end

// email section script start
let CustomerEmail = document.getElementById("Customer-Email");
let EmailAlert = document.getElementById("Email-alert");
CustomerEmail.addEventListener("input", function (e) {
  let emailPattern = /^(([^0-9!#$%^&*|'`~<>/()\[\]\\.,;:\s@"]+(\.[^0-9!#$%^&*_+-=<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,4}))$/;
  let emailValue = e.target.value;
  let checkEmail = emailPattern.test(emailValue);
  if (checkEmail) {
    EmailAlert.innerHTML = "Good Luck!"
  }
  else {
    EmailAlert.innerHTML = "please enter your valid email!";
  }

})
// email section script end

// form script start
$(".last-btn-submit-form").click(function () {
  swal({
    title: "Are you sure about your information?",
    text: "please click Ok Or Cancel",
    icon: "warning",
    buttons: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("your Singed Up", {
        });
      } else {
        swal("please check your information again");
      }
    });
  $(".swal-button-container .swal-button--confirm").click(function () {
    location.href = "product-page/index.html";
  });
  $(".swal-button-container .swal-button--cancel").click(function () {
    setTimeout(function () {
      location.reload();
    }, 2000)
  });
});



//DOM elements

const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next'
};
//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsBtns, 'js-active');

  //set picked items to active
  DOMstrings.stepsBtns.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }

  });
};

//get active panel
const getActivePanel = () => {

  let activePanel;

  DOMstrings.stepFormPanels.forEach(elem => {

    if (elem.classList.contains('js-active')) {

      activePanel = elem;

    }

  });

  return activePanel;

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active');

  //show active panel
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {

      elem.classList.add('js-active');

      setFormHeight(elem);

    }
  });

};

//set form height equal to current panel height
const formHeight = activePanel => {

  const activePanelHeight = activePanel.offsetHeight;

  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
  const activePanel = getActivePanel();

  formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

  //open active panel
  setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
    return;
  }

  //find active panel
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
    activePanelNum--;

  } else {

    activePanelNum++;

  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);

});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);

//changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};

//selector onchange - changing animation
// const animationSelect = document.querySelector('.pick-animation__select');

// animationSelect.addEventListener('change', () => {
//   const newAnimationType = animationSelect.value;

//   setAnimationType(newAnimationType);
// });

let firstName = document.getElementById("firstName");
let errFirstName = document.getElementById("Err-firstName");
let lastName = document.getElementById("lastName");
let errLastName = document.getElementById("Err-lastName");
let userName = document.getElementById("UserName");
let errUserName = document.getElementById("Err-UserName");
let emailUser = document.getElementById("User-Email");
let errEmail = document.getElementById("Err-User-Email");
let UserPass = document.getElementById("User-Pass");
let ErrPass = document.getElementById("Err-Pass");
let nextBtn = document.getElementsByClassName("js-btn-next");

firstName.addEventListener("input", function (e) {
  let firstNamePattern = /^[^0-9!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][\w]{2,15}$/;
  let firstNameVal = e.target.value;
  let firstNameCheck = firstNamePattern.test(firstNameVal);
  if (firstNameCheck) {
    firstName.style.border = "1px solid green";
    errFirstName.innerHTML = "";
    nextBtn.item(0).disabled = false;

  } else {
    firstName.style.border = "1px solid red";
    errFirstName.innerHTML = "please enter valid name";
    nextBtn.item(0).disabled = true;
  }
});

lastName.addEventListener("input", function (e) {
  let lastNamePattern = /^[^0-9!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][\w]{4,15}$/;
  let lastNameVal = e.target.value;
  let lastNameCheck = lastNamePattern.test(lastNameVal);
  if (lastNameCheck) {
    lastName.style.border = "1px solid green";
    errLastName.innerHTML = "";
    nextBtn.item(0).disabled = false;
  } else {
    lastName.style.border = "1px solid red";
    errLastName.innerHTML = "please enter valid lastName";
    nextBtn.item(0).disabled = true;
  }
});

userName.addEventListener("input", function (e) {
  let userNamePattern = /^[^0-9!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][\w]{5,15}$/;
  let userNameVal = e.target.value;
  let userNameCheck = userNamePattern.test(userNameVal);
  if (userNameCheck) {
    userName.style.border = "1px solid green";
    errUserName.innerHTML = "";
    nextBtn.item(1).disabled = false;
  } else {
    userName.style.border = "1px solid red";
    errUserName.innerHTML = "please enter valid name";
    nextBtn.item(1).disabled = true;
  }
});

emailUser.addEventListener("input", function (e) {
  let emailPattern = /^(([^0-9!#$%^&*|'`~<>/()\[\]\\.,;:\s@"]+(\.[^0-9!#$%^&*_+-=<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z]+\.)+[a-zA-Z]{2,4}))$/;
  //  /^[^0-9!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][\w]{5,100}[][@]{1}[^0-9!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][\w]{3,8}$/;
  let emailInputVal = e.target.value;
  let checkEmail = emailPattern.test(emailInputVal);
  if (checkEmail) {
    emailUser.style.border = "1px solid green";
    errEmail.innerHTML = "";
    nextBtn.item(1).disabled = false;
  }
  else {
    emailUser.style.border = "1px solid red";
    errEmail.innerHTML = "please enter valid email!";
    nextBtn.item(1).disabled = true;
  }

});

UserPass.addEventListener("input", function (e) {
  let PassPattern = /^[^0-9a-z!@#$%^&*/()<>\\_+-="{}`~;',?[" "\\\]|][A-Z]{0,1}[\w]{5,20}$/;
  let PassValue = e.target.value;
  let CheckPass = PassPattern.test(PassValue);
  if (CheckPass) {
    UserPass.style.border = "1px solid green";
    ErrPass.innerHTML = "";
    nextBtn.item(2).disabled = false;
  }
  else {
    UserPass.style.border = "1px solid red";
    ErrPass.innerHTML = "A-Z/a-z|0-9";
    nextBtn.item(2).disabled = true;
  }
})

// form script end




