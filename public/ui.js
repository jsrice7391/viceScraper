$(document).ready(function(){


     $(".button-collapse").sideNav();


    console.log("WINNER")

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $(".commentDelete").on("click", function(){
              const buttonTitle = $(this).attr("elementId");

              $.ajax({
                type: "PUT",
                url: "/notes",
                data: {
                  title: buttonTitle
                }
              }).done(function() {
                console.log("NAILED IT");
              });
    })
  
    
     


})