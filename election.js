$(function(){



  //list injection function
  function injector(){
    $('#list').html('');
    $.ajax({
      url:"https://bb-election-api.herokuapp.com/",
      method: 'get',
      data: { },
      dataType: 'json'
    }).done(function(responseData){
      for (i = 0; i < responseData.candidates.length; i++) { //go through all candidates
        $('<li>').appendTo('#list')
                 .html(responseData.candidates[i].name)
                 .attr('name', responseData.candidates[i].name);
        $('<li>').appendTo('#list')
                 .html(responseData.candidates[i].votes)
                 .attr('name', responseData.candidates[i].name);
        $('<button>').appendTo('#list')
                 .html('Vote for ' + responseData.candidates[i].name)
                 .attr('name', responseData.candidates[i].name)
                 .on('click', function(){
                   console.log('clicked');
                   $.ajax({
                     url: "https://bb-election-api.herokuapp.com/vote",
                     method: "POST",
                     data: {name: this.name },//(this).data('name'),
                     dataType: 'html'
                   }).done(function(responseData){
                     $('#list').html('').html(injector);
                   });
                 });//end of vote button click
      };//end for loop
      //BREAKOFF POINT FOR CTRL Z
    }); //end of request
  }; //end of function


  $('#button').on('click', injector); //updates list on refresh button click
  $(window).on('load', injector); //puts list on page load




});
