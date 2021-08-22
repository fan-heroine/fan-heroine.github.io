/*!
* Start Bootstrap - Landing Page v6.0.3 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


$(document).ready(function () {


    var estado = 0;

    jQuery.fn.extend({

        phone: function () {
            $("#webpage").fadeOut("fast");
            $("#call_screen").fadeIn("fast")
            $("#call_screen").addClass("d-flex align-items-center justify-content-center")

            var audio = document.getElementById("call_audio");
            var ring = document.getElementById("call_ring");

            var playing = 0;

            ring.play();
            setTimeout(function () {
                if (playing == 0) {

                    $("#webpage").fadeIn("fast");
                    $("#call_screen").fadeOut("fast");
                    $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


                    $("#call_calling").css("height", "30px");
                    $("#call_time").css("height", "0");

                    $("#phone").prop('disabled', false);
                    $("#mute").prop('disabled', true);
                    $("#speaker").prop('disabled', true);

                    paused = !paused;

                    audio.pause();
                    audio.currentTime = 0;
                    ring.pause();
                    ring.currentTime = 0;

                }
            }, 30000);


            var count = 0;
            var timer;
            var paused = false;
            var counter = function () {
                count++;
                if (count > 120) { count = 1; }
                console.log(count);
                setTime();
                timer = setTimeout(function () {
                    counter();
                }, 1000);
            };

            var minutesLabel = document.getElementById("minutes");
            var secondsLabel = document.getElementById("seconds");


            function setTime() {
                secondsLabel.innerHTML = pad(count % 60);
                minutesLabel.innerHTML = pad(parseInt(count / 60));
            }

            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                } else {
                    return valString;
                }
            }


            $('button').on('click', function () {
                

                if ($(this).is('#phone')) {

                    clearTimeout(timer);

                    $("#call_calling").animate({
                        height: '0px'
                    }, 500);
                    $("#call_time").animate({
                        height: '30px'
                    }, 500);

                    $("#phone").prop('disabled', true);
                    $("#mute").prop('disabled', false);
                    $("#speaker").prop('disabled', false);

                    count = 0;
                    counter();

                    
                    audio.play();
                    ring.pause();
                    ring.currentTime = 0;

                    playing = 1;



                } else if ($(this).is('#phone_slash')) {

                    $("#webpage").fadeIn("fast");
                    $("#call_screen").fadeOut("fast");
                    $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


                    $("#call_calling").css("height", "30px");
                    $("#call_time").css("height", "0");

                    $("#phone").prop('disabled', false);
                    $("#mute").prop('disabled', true);
                    $("#speaker").prop('disabled', true);

                    paused = !paused;

                    audio.pause();
                    audio.currentTime = 0;
                    ring.pause();
                    ring.currentTime = 0;

                    playing = 0;

                } else if ($(this).is('#mute')) {

                    audio.muted = true;

                } else if ($(this).is('#speaker')) {

                    audio.muted = false;

                }





            });

            $('#call_audio').on('ended', function() {
                $("#webpage").fadeIn("fast");
                    $("#call_screen").fadeOut("fast");
                    $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


                    $("#call_calling").css("height", "30px");
                    $("#call_time").css("height", "0");

                    $("#phone").prop('disabled', false);
                    $("#mute").prop('disabled', true);
                    $("#speaker").prop('disabled', true);

                    paused = !paused;

                    audio.pause();
                    audio.currentTime = 0;
                    ring.pause();
                    ring.currentTime = 0;

                    playing = 0;
            });

        },

    });





    $("#button_enter").click(function () {
        $("#enter_screen").fadeOut("slow");
        $("#intro").removeClass("d-flex align-items-center justify-content-center")
        $("#intro").css("display", "none");
        $("#webpage").fadeIn("slow");
        $("#video_screen").fadeIn("slow");
        $('#video').get(0).play();
        $('#video').on('ended', function () {
            $("#video_screen").fadeOut("slow");
            $("#webpage").fadeIn("slow");

            setTimeout(function () {
                $.fn.phone();
            }, 2000);
    
            setTimeout(function () {
                $.fn.phone();
            }, 50000);

        });

        


    });

});