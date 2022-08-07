$(document).ready(() => {
  let navClientHeight = $('.navbar')[0].clientHeight;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset >= navClientHeight) {
      $('#float-btn').addClass('show');
    } else {
      $('#float-btn').removeClass('show');
    }
  })

  $('#float-btn').on('click', () => {
    $(window).scrollTop(0);
  });

  $('.navbar-toggler').on('click', () => {
    let ariaExpandedNav = $('.navbar-toggler').attr('aria-expanded');
    if (ariaExpandedNav === 'true') {
      $('.navbar-toggler i').attr('class', 'fa-solid fa-xmark');
    } else {
      $('.navbar-toggler i').attr('class', 'fa-solid fa-bars');
    }
  })
});
