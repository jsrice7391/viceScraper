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


       $(".delArticle").on("click", function(){
         const delID = $(this).attr("elementid");
        $.ajax({
          url:"/deleteArticle",
          method: "POST",
          data: {
            id: delID
          }
        }).done(function(response){
          if(response.result === "good"){
            location.reload();
          }
        })
       })

        $(".unSaver").on("click", function() {
          const unsaveId= $(this).attr("elementId");
          $.ajax({
            type: "PUT",
            url: "/unsave",
            data: {
              id: unsaveId
            }
          }).done(function(response) {
            if (response.result === "good") {
              location.reload();
            }
          });
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