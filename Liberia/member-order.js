
$('#inquire').click(function(){ 
    
    $('.search__list').slideToggle('slow');
});

$('.search__list li').click(function(){
    $('.search__title p').html( $(this).text());
    $('.content__title em').html( $(this).text());
    
    $('.search__list').slideToggle('hide');
});

$('.order__inquire label').click(function(){
    $('.content__title em').html( $(this).text());
});