'use strict';

let flavorsFlexItems = document.querySelectorAll('.flavors__flexItem');

let statusColors = {
  default: '#1698d9',
  active: '#d91667',
  sold: '#b3b3b3',
  defaultHover: '#2ea8e6',
  activeHover: '#e62e7a'
};

let comments = {
  sold: ['Печалька, с фуа-гра закончился.', 
         'Печалька, с рыбой закончился.', 
         'Печалька, с курой закончился.',],
  active: ['Печень утки разварная с артишоками.',
           'Головы щучьи с чесноком да свежайшая сёмгушка.',
           'Филе из цыплят с трюфелями в бульоне.'],
  default: ['Чего сидишь? Порадуй котэ, <a href="#">купи.</a>']       
};

function disableDiv(i) {

  let flavorsDiv = flavorsFlexItems[i].querySelector('.flavors__describe');

  let div = document.createElement('div');
  flavorsDiv.append(div);
  div.classList.add('disabled');

  flavorsFlexItems[i].classList.add('sold');

  flavorsDiv.style.borderColor = statusColors.sold;

  let flavorsWeight = flavorsDiv.querySelector('.flavors__weight');
  flavorsWeight.style.background = statusColors.sold;

  let flavorsComment = flavorsFlexItems[i].querySelector('.flavors__comment');
  flavorsComment.innerHTML = comments.sold[i];
  flavorsComment.style.color = '#ffff66'; 
}

disableDiv(2);

flavorsFlexItems.forEach((item) => {
  if (!item.classList.contains('sold')) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', activate);

    // let comment = item.querySelector('.flavors__comment a');
    // comment.addEventListener('click', activate);
  }
});

flavorsFlexItems.forEach((item) => {

  if (!item.classList.contains('activeItem') && !item.classList.contains('sold')) {
    item.addEventListener('mouseover', defaultHover);
    item.addEventListener('mouseleave', defaultColor);
  } else if (item.classList.contains('activeItem')) {
    item.addEventListener('mouseover', activeHover);
    item.addEventListener('mouseleave', activeColor);
  }

});

function defaultHover() {
  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.defaultHover;

  flavorsDiv.querySelector('.flavors__weight').style.background = 
  statusColors.defaultHover;

  let link = this.querySelector('.flavors__comment > a');
  link.style.color = statusColors.defaultHover;
}

function defaultColor() {
  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.default;

  flavorsDiv.querySelector('.flavors__weight').style.background = 
  statusColors.default;

  let link = this.querySelector('.flavors__comment > a');
  link.style.color = statusColors.default;
}

function activeHover() {
  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.activeHover;

  flavorsDiv.querySelector('.flavors__weight').style.background = 
  statusColors.activeHover;

  let link = this.querySelector('.flavors__comment > a');
  link.style.color = statusColors.activeHover;
}

function activeColor() {
  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.active;

  let small = flavorsDiv.querySelector('.flavors__describe > small');
  small.innerHTML = 'Котэ не одобряет?';
  small.style.color = statusColors.active;

  flavorsDiv.querySelector('.flavors__weight').style.background = 
  statusColors.active;

  let link = this.querySelector('.flavors__comment > a');
  link.style.color = statusColors.active;

}


function activate() {
  this.removeEventListener('click', activate);
  this.addEventListener('click', deactivate);
  
  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.active;

  this.classList.add('activeItem');

  let flavorsWeight = flavorsDiv.querySelector('.flavors__weight');
  flavorsWeight.style.background = statusColors.active;

  let comment = this.querySelector('.flavors__comment');
  comment.innerHTML = comments.active[comment.dataset.num];

  flavorsFlexItems.forEach((item) => {
    item.removeEventListener('mouseover', defaultHover);
    item.removeEventListener('mouseleave', defaultColor); 
  });
  flavorsFlexItems.forEach((item) => {
    if (item.classList.contains('activeItem')) {
      item.addEventListener('mouseover', activeHover);
      item.addEventListener('mouseleave', activeColor);
    }
  });
}

function deactivate() {
  this.removeEventListener('click', deactivate);
  this.addEventListener('click', activate);

  let flavorsDiv = this.querySelector('.flavors__describe');
  flavorsDiv.style.borderColor = statusColors.default;

  let small = flavorsDiv.querySelector('.flavors__describe > small');
  small.innerHTML = 'Сказочное заморское яство';
  small.style.color = '#666';

  this.classList.remove('activeItem');

  let flavorsWeight = flavorsDiv.querySelector('.flavors__weight');
  flavorsWeight.style.background = statusColors.default;

  let comment = this.querySelector('.flavors__comment');
  comment.innerHTML = comments.default;

  flavorsFlexItems.forEach((item) => {
    item.removeEventListener('mouseover', activeHover);
    item.removeEventListener('mouseleave', activeColor); 
  });

  flavorsFlexItems.forEach((item) => {
    if (!item.classList.contains('activeItem') && !item.classList.contains('sold')) {
      item.addEventListener('mouseover', defaultHover);
      item.addEventListener('mouseleave', defaultColor);
    }
  });
}