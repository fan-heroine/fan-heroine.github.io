/*!
* Start Bootstrap - Landing Page v6.0.3 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


$(document).ready(function () {


    const name = [
        "Francisco Ferrer Guardia",
        "La PEQUE",
        "EE Heroine"
    ];

    const audio_url = [
        "audio2.mp3",
        "audio1.mp3",
        "audio3.mp3"
    ];

    const time_btw_calls = [
        "10000",
        "5000",
        "15000"
    ];






    var call_count = 0;

    const rndInt = Math.floor(Math.random() * name.length) + 1;

    for (let i = 0; i < rndInt; i++) {
        var delete_name = name.shift();
        name.push(delete_name);
    
        var delete_audio_url = audio_url.shift();
        audio_url.push(delete_audio_url);
    } 

    var phone = function () {

        $("#webpage").fadeOut("fast");
        $("#call_screen").fadeIn("fast")
        $("#call_screen").addClass("d-flex align-items-center justify-content-center")

        var audio = document.getElementById("call_audio");
        var ring = document.getElementById("call_ring");

        var playing = 0;

        ring.play();
        playing = 1;
        
        var contestador = setTimeout(function () {

                $("#webpage").fadeIn("fast");
                $("#call_screen").fadeOut("fast");
                $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


                $("#call_calling").css("height", "30px");
                $("#call_time").css("height", "0");

                $("#phone").prop('disabled', false);
                $("#mute").prop('disabled', true);
                $("#speaker").prop('disabled', true);


                audio.pause();
                audio.currentTime = 0;
                ring.pause();
                ring.currentTime = 0;

                // BORRAR
                console.log("Prueba de duplicados No contesta");

                slideTimer(function () {
                    phone();
                    call_count++;
                }, time_btw_calls[call_count]);

        }, 30000);
        

        var count = 0;
        var timer;
        var counter = function () {
            if (playing == 1) {
                count++;
                setTime();
                timer = setTimeout(function () {
                    counter();
                }, 1000);
            }
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

                $("#call_calling").animate({
                    height: '0px'
                }, 500);
                $("#call_time").animate({
                    height: '30px'
                }, 500);

                $("#phone").prop('disabled', true);
                $("#mute").prop('disabled', false);
                $("#speaker").prop('disabled', false);

                clearTimeout(timer);
                clearTimeout(contestador);
                count = 0;
                playing = 1;
                counter();

                audio.load();
                audio.play();
                audio.muted = false;
                ring.pause();
                ring.currentTime = 0;


            } else if ($(this).is('#phone_slash')) {

                $("#webpage").fadeIn("fast");
                $("#call_screen").fadeOut("fast");
                $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


                $("#call_calling").css("height", "30px");
                $("#call_time").css("height", "0");

                $("#phone").prop('disabled', false);
                $("#mute").prop('disabled', true);
                $("#speaker").prop('disabled', true);

                clearTimeout(contestador);

                audio.pause();
                audio.currentTime = 0;
                ring.pause();
                ring.currentTime = 0;

                playing = 0;


                slideTimer(function () {
                    phone();
                    call_count++;
                }, time_btw_calls[call_count]);
                

            } else if ($(this).is('#mute')) {

                audio.muted = true;

            } else if ($(this).is('#speaker')) {

                audio.muted = false;

            }

        });

        $('#call_audio').on('ended', function () {

            $("#webpage").fadeIn("fast");
            $("#call_screen").fadeOut("fast");
            $("#call_screen").removeClass("d-flex align-items-center justify-content-center");


            $("#call_calling").css("height", "30px");
            $("#call_time").css("height", "0");

            $("#phone").prop('disabled', false);
            $("#mute").prop('disabled', true);
            $("#speaker").prop('disabled', true);

            clearTimeout(contestador);

            audio.pause();
            audio.currentTime = 0;
            ring.pause();
            ring.currentTime = 0;

            playing = 0;


            slideTimer(function () {
                phone();
                call_count++;
            }, time_btw_calls[call_count]);
      
            
        });

    };


    var slideTimer = (function () {
        var timer = 0;

        // Because the inner function is bound to the slideTimer variable,
        // it will remain in score and will allow the timer variable to be manipulated.

        return function (callback, ms) {
            clearTimeout(timer);
            $("button").unbind('click');
            if (call_count < name.length) {
                var call_name = document.getElementById("call_name");

                call_name.innerHTML = name[call_count];
                $("#call_src").attr("src","assets/audio/" + audio_url[call_count]);

                timer = setTimeout(callback, ms);
            };
        };
    })();

    $("#button_enter").click(function () {
        $("#enter_screen").fadeOut("slow");
        $("#intro").removeClass("d-flex align-items-center justify-content-center")
        $("#intro").css("display", "none");
        $("#video_screen").fadeIn("slow");
        $('#video').get(0).play();
        $('#video').on('ended', function () {
            $("#video_screen").fadeOut("slow");
            $("#webpage").fadeIn("slow");


            slideTimer(function () {
                phone();
                call_count++;
            }, time_btw_calls[call_count]);

        });




    });

});