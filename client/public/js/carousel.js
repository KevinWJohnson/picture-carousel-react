$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel").carousel("pause");
  
    // Click on the button to start sliding 
    $("#myBtn1").click(function(){
      $("#myCarousel").carousel("cycle");
    });
  
    // Click on the button to stop sliding 
    $("#myBtn2").click(function(){
      $("#myCarousel").carousel("pause");
    });
      
    // Enable Carousel Indicators
      $(".carousel-indicators").on("click", ".indicator", function(e) {
      console.log("Indicator clicked");
      console.log("Current target id: " + e.currentTarget.id);
      var idAttr = e.currentTarget.id;
      console.log("idAtrr: " + idAttr);

      var match = /\d+/.exec(idAttr);
      idNumber = Number(match[0]);
      console.log("Current idNumber: " + idNumber);
      $("#myCarousel").carousel(idNumber - 1);
    });
      
    // Enable Carousel Controls
    $(".left").click(function(){
      $("#myCarousel").carousel("prev");
    });
    $(".right").click(function(){
      $("#myCarousel").carousel("next");
    });
  
    // Enable swiping of the pictures
    $(".carousel").on("touchstart", function(event){
          var xClick = event.originalEvent.touches[0].pageX;
      $(this).one("touchmove", function(event){
          var xMove = event.originalEvent.touches[0].pageX;
          if( Math.floor(xClick - xMove) > 5 ){
              $(this).carousel('next');
          }
          else if( Math.floor(xClick - xMove) < -5 ){
              $(this).carousel('prev');
          }
      });
      $(".carousel").on("touchend", function(){
              $(this).off("touchmove");
      });
    });
  
  // Creating the item elements
  var pictureArray = PicGrp1.pictures;
  pictureArray.forEach(function(picture, index) {
    // Item Div
    var $carouselInner = $('.carousel-inner');
    var $itemDiv = $('<div></div>');
    $itemDiv.addClass('item');
    if (index == 0) {
      $itemDiv.addClass('active');
    }
    $carouselInner.append($itemDiv);

    // Image tag
    var $img = $('<img/>');
    $img.attr('src', picture.imageUrl);
    $img.attr('alt', picture.title);
    $img.attr('width', picture.width);
    $img.attr('height', picture.height);
    var rotateTxt = "transform:rotate(" + picture.rotate + "deg);"
    $img.attr('style', rotateTxt);
    $itemDiv.append($img);

    var $captionDiv = $('<div class="carousel-caption bg-dark mb-4"></div>');
    $itemDiv.append($captionDiv);

    var $titleHeading = $('<h3>' + picture.title + '</h3>');
    $captionDiv.append($titleHeading);

    var $author = $('<p>' + picture.author + '</p>');
    $captionDiv.append($author);

    // Creating Indicators
    var $carouselIndicators = $('.carousel-indicators');
    var $indicatorli = $('<li></li>');
    var ItemClass = "indicator";
    var idIndicator = "idItem" + (index + 1);
    $indicatorli.addClass(ItemClass);
    $indicatorli.attr('id', idIndicator);
    if (index == 0) {
      $indicatorli.addClass('active');
    }
    $carouselIndicators.append($indicatorli);
    
  });

  console.log("Carousel JS");
    var $itemIndicator = $(".itemIndicator");

    $itemIndicator.each(function() {
      var ids = this.id;
      console.log("ids: " + ids);
    });

});