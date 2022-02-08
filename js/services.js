$(document).ready(function(){
  $('.categories > a').click(function(e, t){
    e.preventDefault();
    
    var currentC = $('.categories > a').eq($(this).index());
    
    $('.categories > a').removeClass('active-category');
    currentC.addClass('active-category');
  });
  
  $('.last-example > #exmpl').click(function(e, t){
    var searchEl = $('header#search > input'),
        currentV = $(this).text();
    
    searchEl.val(currentV);
  });
});
