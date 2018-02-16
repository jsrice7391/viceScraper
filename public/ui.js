$(document).ready(function(){

     $(".button-collapse").sideNav();

       $("#articleModal").modal({
         dismissible: false, // Modal can be dismissed by clicking outside of the modal
         ready: function(modal, trigger) {
           // Callback for Modal open. Modal and trigger parameters available.
           $.get("/articles/scrape").done(function(data){
                $("#articleCount").text(`Articles scraped from Vice`)
           });
         },
         complete: function() {
           location.reload();
         } // Callback for Modal close
       });




     $(".saver").on("click", function(){
       const theId = $(this).attr("elementId");
               $.ajax({
                 type: "PUT",
                 url: "/save",
                 data: {
                   id: theId
                 }
               }).done(function(response) {
                 if(response.result === "good"){
                   location.reload();
                 }
               });
     })

    $(".commentDelete").on("click", function(){
              const buttonId = $(this).attr("elementId");
              $.ajax({
                type: "PUT",
                url: "/notes",
                data: {
                  id: buttonId
                }
              }).done(function(response) {
                if(response.result == "good"){
                  location.reload();
                }
            
              });
    })

})