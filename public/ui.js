$(document).ready(function(){



     $(".button-collapse").sideNav();

     $("#articleModal").on("click", function(){
         $.get("/articles/scrape",function(data){
            $("#articleModal").modal();
         });
     });

     $("#articleModal").on("hidden", function() {
        console.log("HIDDEN")
     });

     $(".saver").on("click", function(){
       const theId = $(this).attr("elementId");

               $.ajax({
                 type: "PUT",
                 url: "/save",
                 data: {
                   id: theId
                 }
               }).done(function() {
                 console.log("Item updated")
              
               });


     })

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $(".commentDelete").on("click", function(){
              const buttonId = $(this).attr("elementId");

              $.ajax({
                type: "PUT",
                url: "/notes",
                data: {
                  id: buttonId
                }
              }).done(function() {
                console.log("NAILED IT");
              });
    })

})