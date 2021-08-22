$("#phone").click(function () {
  $("#call_calling").animate({
      height: '0px'
  }, 500);
  $("#call_time").animate({
      height: '30px'
  }, 500);

  estado = 1;

  console.log("Estado " + estado);

  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;

  //myVar = setInterval(setTime, 1000);



  function setTime() {
      //if (estado == 0){
      //minutesLabel = 0;
      //secondsLabel = 0;
      //totalSeconds = 0;
      //val = 0; 
      //clearInterval(myVar);
      //}else{
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
      console.log(totalSeconds);
      //}

  }

  function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
          return "0" + valString;
      }
      else {
          return valString;
      }
  }

  var count = 0,
      timer,
      counter = function () {
          count++;
          if (count > 15) { count = 1; }
          timer = setTimeout(function () {
              setTime();
              counter();
          }, 1000);
      };

  counter();

  $("#phone").prop('disabled', true);
  $("#mute").prop('disabled', false);
  $("#speaker").prop('disabled', false);

});

$("#phone_slash").click(function () {
  $("#webpage").fadeIn("fast");
  $("#call_screen").fadeOut("fast");
  $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


  $("#call_calling").css("height", "30px");
  $("#call_time").css("height", "0");

  $("#phone").prop('disabled', false);
  $("#mute").prop('disabled', true);
  $("#speaker").prop('disabled', true);

  estado = 0;

  console.log("Estado " + estado);
});