//popup
const popupLinks=document.querySelectorAll('.popup-link');
const body=document.querySelector('body');
const lockPadding=document.querySelectorAll(".lock-padding");
let unlock=true;
const timeout=800;
if (popupLinks.length>0){
    for (let index = 0; index < popupLinks.length; index++){
        const popupLink=popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length>0){
    for (let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')){
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnLock();
        }
    }
}
function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector ('.wrapper').offsetWidth + 'px';
    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
}
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(function(){
        if (lockPadding.length>0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
    }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', function(e){
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});
(function() {
    //проверяем поддержку
    if (!Element.prototype.closest) {
        //реализуем
        Element.prototype.closest = function (css){
            let (node) = this;
            while (node){
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    } 
}) ();
(function () {
    //проверяем поддержку
    if  (!Element.prototype.matches) {
        //определяем свойство
        Element.prototype.matches = Element.prototype.webkitMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
}) ();
//gallery__popup coordinates
let popup = $('.gallery__popup');
$('.touch__img-left').click(function(e) {
    let coordinates = $(this).offset(); //Получаем координаты кликнутой кнопки
    coordinates.top += $(this).height() - 280; 
    coordinates.left += $(this).width() - 258; 
    popup.offset(coordinates); //Устанавливаем координаты попапу
});
//slick slider
$(document).ready(function(){
$('.content__slider').slick({
    slidesToShow:1,
    speed:300,
    variableWidth:true,
});
});
//menu burger
$(document).ready(function(){
    $('.header__burger').click(function(event){
        $('.header__burger,.header__top-menu').toggleClass('active');
    });
});

//mask
    $(document).ready(function() {
   $("#phone").mask("+7 (999) 999-99-99"); 
});
