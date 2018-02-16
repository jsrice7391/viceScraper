$(document).ready(function(){

     $(".button-collapse").sideNav();

       $("#articleModal").modal({
         dismissible: false, 
         ready: function(modal, trigger) {
          //  Get the articles from theb 
           $.get("/articles/scrape").done(function(data){
                $("#articleCount").text(`Articles scraped from Vice`)
           });
         },
         complete: function() {
           location.reload();
         }
       });

       $("#modal1").modal({
         dismissible: true
       })




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