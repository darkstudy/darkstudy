//————————————Start page at top on refresh————————————————

$(window).on('beforeunload', function(){
    $(window).scrollTop(0);
});

//—————————————————p5 Rectfields———————————————————————

var rectfield_s = function(p) {
  
    var numRect, rectW, rectH;
    p.posArray = [];
    
    p.setup = function() {
        if(p.windowWidth > 1024) {
            p.sCanvas = p.createCanvas(p.windowWidth/2 - 100, p.windowHeight/2);

            numRect = 15;
            rectW = 60;
            rectH = 80;

        } else {
            p.sCanvas = p.createCanvas((p.windowWidth/5) * 2 - 100, p.windowHeight/2);

            numRect = 10;
            rectW = 50;
            rectH = 70;
        }

      p.sCanvas.parent("rectfield-small");
      p.background(0);
      rectField(p, numRect, 255, rectW, rectH, 0.3);
    }
    
    p.windowResized = function() {
      if(p.windowWidth > 1024) {
        p.resizeCanvas(p.windowWidth/2 - 100, p.windowHeight/2);
        numRect = 15;
        rectW = 60;
        rectH = 80;
      } else {
        p.resizeCanvas((p.windowWidth/5) * 2 - 100, p.windowHeight/2);
        numRect = 10;
        rectW = 50;
        rectH = 70;
      }

      p.background(0);
      p.posArray = [];
      rectField(p, numRect, 255, rectW, rectH, 0.3);
    }
    
  }
  
  var rectfield_h = function(q) {
    q.posArray = [];
  
    q.setup = function() {
      q.heroCanvas = q.createCanvas(q.windowWidth, q.windowHeight);
      q.heroCanvas.parent("rectfield");
      q.frameRate(10);
    }
  
    q.draw = function() {
  
    q.background(0);
    q.stagger = q.random();
    
    if(q.stagger<0.3) {
        q.noFill();
        q.stroke(0,255,0);
      } else {
        q.fill(0,255,0, q.random(255));
        q.noStroke();
      }
  
      q.rect(q.random(q.width), q.random(q.height), 70, 95);
  }
  
}

//——————————————————Doc Ready————————————————————————————

$(document).ready(function() {
    var trigHaunt = false;
    var windowCheck = $(window).width();
    $(".landing").css("height", window.innerHeight + "px");
    $(".landing").css("overflow", "hidden");
    $("#closed").hide();

    // $("#nav, .landing #rectfield #content .lightmode#nav #nav-mobi").css("height", window.innerHeight);
    $("#main-container").hide();
    $("#hamburger").hide();
    $("#menu").hide();
    $("#rectfield-small").hide();
    $("#logo-small").hide();
    $(".overlay").hide();
    $(".warning").hide();
    $(".more").hide();
    $(".more-p").hide();
    $("#nav-mobi").hide();
    $("#open-tablet").hide();
    if(windowCheck > 800) {

        var rect_s = new p5(rectfield_s); 
        rect_s.alph = rect_s.random(255); 
    }

    // if(windowCheck < 1024) {
    //     alert("This site is best viewed on desktop. Some interactions will not be available.")
    // }



    var rect_main = new p5(rectfield_h);
    $("#rectfield").hide();

    var fired=false;


//———————————————logo zalgo animation—————————————————————
    hero = document.getElementById("hero"),
    delay = 50, count = 0, last = 0;
    delayed();

    $("#rectfield").fadeIn(3000);

    var logoiteration = $("#hero").html();
    $(".overlay-logo").html(logoiteration);



//————————————————open rest of page————————————————————
    $(".charon").on("click", function(event) {
        $("#main-container").show();
        $("#content").css("display", "flex");
        $(".spacer").show();
        $("body").css("overflow-y", "scroll");
        if(windowCheck > 1024) {

            $("#nav").css("opacity", "0");

            setTimeout(function() {
                $("#logo-small").show();
                $("#hamburger").show();
                if(hoverCheck ===true) {

                    $("#logo-small").show();
                    $("#rectfield-small").hide();
                } else {
                    $("#rectfield-small").show();
                    $("#menu").hide();
                }
                $("#nav").animate({
                    opacity: 1
                }, 700);
            }, 1000);
        } else if(windowCheck <=1024 && windowCheck > 800) {
            $("#nav").css("opacity", "0");
            $("body").addClass("tab");
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
            setTimeout(function() {
                $("#rectfield-small").show();
                $("#logo-small").show();
                $("#hamburger").show();
                $("#open").hide();
                $("#closed").hide();
                $("#closed-lightmode").hide();
                $("#open-tablet").show();
                $("#nav").animate({
                    opacity: 1
                }, 600);
            },1000);

        }
       
       if(windowCheck > 800) {
        $("#mission-nav").hide();
        // positionP5(window, 4, 2, "rectfield-small");
       }

       if(windowCheck < 800) {
        $("body").addClass("black");
        $("#info1").show();
        transitionMode();

       }
       
       if(windowCheck < 800 && windowCheck >= 640) {
        $("body").css("overflow-y", "scroll");
        $("#closed-lightmode").hide();
        $("#menu").show();
        $("#hamburger").show();
        $("#open").show();
        $("#logo-small").show();
       }

       if(windowCheck < 640) {
            // $(".section-head").parents().css("overflow", "visible");
           $(".icon-file").hide();
           $("#nav").hide();
           $("#logo-small").hide();
           $("body").addClass("mobile");
           $(".mobi").fadeIn(1100);
           $("#eyeblack").hide();
       }

       //smooth scroll to top of main content
       $('html, body').animate({
            scrollTop: $("#main-container").offset().top
        }, 1100);

        //prevent scroll back up
        setTimeout(function() {
            $(".spacer").hide();
            $(".landing").hide();

            if(windowCheck < 800) {
                $('html, body').animate({
                    scrollTop: $("#main-container").offset().top
                }, 0);
            }
         }, 1100);

         document.title = $("#hero").html();

    });

//—————————————————reposition comment box—————————————————

//—————————————————menu/eye toggle————————————————————————

// var mouseTrack = [];
var currentMousePos = { x: -1, y: -1 };
var hoverCheck = false;
$(function($) {
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        // mouseTrack.push(currentMousePos);
        if (currentMousePos.x < window.innerWidth/2) {
            hoverCheck = true;
        }
    });

    $(".lightmode #hamburger, .charon").on("click", function() {
        $(".haunt").css("color", "#fff");
        if (currentMousePos.x < window.innerWidth/2 && windowCheck > 1024) {
            // hoverCheck = true;
            mouseTrack = [];
            $("#open").hide();
            $("#closed").stop(true,true).fadeIn();

            
            $("#rectfield-small").hide();
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
            $("#menu").stop(true,true).fadeIn();


        } else if(currentMousePos.x >= window.innerWidth/2 && windowCheck > 1024) {
            mouseTrack = [];
            $("#open").stop(true,true).fadeIn();
            $("#closed").hide();
            $("#rectfield-small").stop(true,true).fadeIn();            
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
            $("#menu").hide();
            hoverCheck = false;
        }
        
        // else {
        //     hoverCheck = false;
        //     mouseTrack = [];
        // }
    });

    if(hoverCheck===true && !$("body").hasClass("lightmode")) {
        

} else if(!$("body").hasClass("lightmode") && hoverCheck === false) {
    $("#closed").fadeOut(200, function() {
        $("#open").fadeIn();
    });

    $("#menu").fadeOut(200, function() {
        $("#rectfield-small").fadeIn();
    });
} else {
    return;
}

    $("#mission-column").mouseover(function() {
        if(!$("body").hasClass("lightmode")) {
            $("#open").fadeIn();
            $("#closed").hide();
            hoverCheck = false;
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
    
            $("#rectfield-small").fadeIn();
            $("#menu").hide();
            $("#hauntings").show();
        } else {
            return;
        }

    })



    $("#nav").mouseover(function() {
        if(windowCheck > 1024) {
            if(!$("body").hasClass("lightmode")) {
                $("#open").hide();
                $("#closed").fadeIn();
                hoverCheck = true;
        
                $("#rectfield-small").hide();
                $("#menu").fadeIn();
                $("#hauntings").finish();
                $(".haunt").finish();
                $("#rectfield-small").finish();
                $("#hauntings").hide();

            } else {
                return;
            }
        }
    })

});

var menuX, menuY

    
    $('#hamburger').on('click', function(){
        //lightmode eye nav
        if ($("body").hasClass("lightmode") && windowCheck > 800) {
            if (windowCheck > 1024) {
                $("#open").fadeIn(700);
            } else if($("#open-tablet").is(":hidden")) {
                $("#open-tablet").show();
            }
            $("body").removeClass("lightmode");
            $("#closed-lightmode").hide();
            $("#closed").hide();
            
            $("[data-typer]").text("");
            $("[data-typer]").css("background-color", "#000");
            $("[data-typer]").css("color", "#00ff00");
            $("#logo-small").removeClass("lightmode");
            $("#nav a").css("color", "#00ff00");
            $("#nav").removeClass("lightmode");
            $(".col").removeClass("lightmode");

            $("#info-column").fadeOut(400);  
            $("#mission").removeClass("lightmode");
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
            $("#menu").hide();
            $("#rectfield-small").fadeIn({duration: 2000, easing: "swing"});

            click = 0;
        } else if(!$("body").hasClass("lightmode")&& windowCheck<=1024 && windowCheck>800) {

            if($("#open-tablet").is(":visible")) {
                $("#menu").show();
                $("#rectfield-small").hide();
                $("#open-tablet").hide();
                $("#closed").show();
            } else if($("#open-tablet").is(":hidden")) {
                $("#menu").hide();
                $("#rectfield-small").fadeIn();
                $("#open-tablet").fadeIn();
                $("#closed").hide();
            }

        
        } else if(!$("body").hasClass("lightmode") && windowCheck > 1024) {
        $("#open").hide();
        $("#closed-lightmode").show();
        $(".popup").hide();
        $(".dark").stop(true,true).show();
        $("[data-typer]").stop().hide();
        $("#comment-box").hide();
        $("#nav a").css("color", "#000");
       transitionMode();

        click = 1;
 
        var el = document.getElementById("people");
        $('#info-column').animate({
            scrollTop: el.offsetTop
        }, 0);
        setTimeout(function() {
            click=3;
        }, 700);
    } else {
        return;
    }
    });

    //mobile navigation————————————————————————

    $(".mobi-eye").on("click", function() {
        $(".logo-mobi").html($("#hero").html());
        $("#nav-mobi").slideDown();
    });

    $(".eye").on("click", function() {
        $("#nav-mobi").slideUp();
    })

    $(".menu-mobi a").on("click", function(event) {
        $("#nav-mobi").slideUp();
        // el = document.getElementById(href.substr(1));
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top-90
            }, {duration: 1100, easing: "swing"});
        return false;
    });


//—————————transition from dark mode to lightmode————————
    var click = 0;    

    $("#menu a").on("click", function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        if(!$("body").hasClass("lightmode") && windowCheck >800) {
            $("#open").hide();
            $("#open-tablet").hide();
            $("#closed-lightmode").show();
            $(".popup").hide();
            $(".dark").stop(true,true).show();
            $("[data-typer]").stop().hide();
            $("#comment-box").hide();
            $("#nav a").css("color", "#000");

           transitionMode();

            click = 1;
            var el = document.getElementById(href.substr(1));
            $('#info-column').animate({
                scrollTop: el.offsetTop
            }, 0);

        }

//———————————————smooth scroll to anchor———————————————_
        if(click === 1) {

            $("#info-column").stop();

           setTimeout(function() {
            el = document.getElementById(href.substr(1));
            $('#info-column').animate({
                    scrollTop: el.offsetTop
                }, 0);
           }, 500);
           click++;
           setTimeout(function() {
               click=3;
           }, 700);
        }

        if(click > 2 || windowCheck < 800) {            
            el = document.getElementById(href.substr(1));
            if(windowCheck > 800) {
                $('#info-column').animate({
                    scrollTop: el.offsetTop
                }, {duration: 1100, easing: "swing"});
            } else {
                $("html, body").animate({
                    scrollTop: el.offsetTop
                }, {duration: 1100, easing: "swing"});
                
            }
        }
    });

    
//——————————light span text interactions——————————————————
    var statementKeep = [];
   
    $(".note").mouseover(function() {
        if (!$("body").hasClass("lightmode")) {
            var statement = $(this).html();
            statementKeep.push(statement);
            $(this).html(Z.generate(statement));
        } 
    });

    
    $(".note").mouseleave(function() {
        if (!$("body").hasClass("lightmode")) {
            statement =  $(statementKeep).get(0);
            $(this).html(statement);
            statementKeep.splice(0,1);
        }
    });


//————————————————Pop up modals——————————————————————————
    $(".note").on("click", function() {

        if(!$("body").hasClass("lightmode") && windowCheck >1024) {
            var modalID = $(this).attr("id") + "-cap";
            var randomX = Math.random() * $(window).width();
            var randomY = Math.random() * $(window).height();
    
            if (randomX > ($(window).width() - 400)) {
                randomX = randomX - 400;
            }
    
            if (randomY > $(window).height() - $("#" + modalID).height()) {
                randomY = randomY - $("#" + modalID).height();
            }
            
            $("#"+modalID).css({"top" : randomY+"px" , "left" : randomX+"px"});
            $("#"+modalID).show();
        } else if(windowCheck>1024) {
            $("#warning-text").css("background-color", "#00ff00");
            $(".warning").show();
        } else {
            return;
        }

    });

    $(function() {
        $(".popup, .comment-drag").draggable();
      } );

    $(".close").on("click", function() {
        var thisModal = $(this).parent().attr("id");
        $("#"+thisModal).hide();
    });

    $(".warning-close").on("click", function() {
        $(".warning").hide();
    })

    

//—————————————dark text typewriter———————————————————————
    $(".dark").on("click", function() {
        if(!$("body").hasClass("lightmode") && windowCheck > 1024) {
            $(this).hide();
            $("[data-typer]").show();
            setTimeout(function() {
                $("[data-typer]").attr("data-typer", function(i, txt) {
    
                    var $typer = $(this),
                      tot = txt.length,
                      pauseMax = 100,
                      pauseMin = 60,
                      ch = 0;
                  
                    (function typeIt() {
                      if (ch > tot) {
                        setTimeout(function() {
                            $("[data-typer]").css("background-color", "#fff");
                            $("[data-typer]").css("color", "#000");
                        }, 2000);
                        setTimeout(function() {
                            fired=false;
                            var offsetPos = $("[data-typer").offset();
                            if(!$("body").hasClass("lightmode")) {
                                $("#comment-box").show();
                            }
                            
                            $("#comment-box").css("position", "fixed");
                            $("#comment-box").css("top", ($(window).height() - offsetPos.top - $("#comment-box").height()/2));
                            $(".resolve").on("click", function() {
                                $("#comment-box").hide();
                                $typer.text("");
                                $("[data-typer]").css("background-color", "#000");
                                $("[data-typer]").css("color", "#00ff00");
                                $(".dark").show();
                            })
                        }, 2300);
                        return;
                       }
                      $typer.text(txt.substring(0, ch++));
                      setTimeout(typeIt, ~~(Math.random() * (pauseMax - pauseMin + 1) + pauseMin));
                      
                    }());
                  
                  });
            }, 500);
        } else if (windowCheck > 1024 && $("body").hasClass("lightmode")) {
            $("#warning-text").css("background-color", "#00ff00");
            $(".warning").show();
        } else {
            return;
        }       
    })


//——window resize ———————————————————————————————————
    $(window).resize(function() {
        if(windowCheck <=1024 && windowCheck !== $(window).width()) {
            $('body > :not(#error)').hide();
            $('#error').show();
        } else if(windowCheck > 1024) {
            menuY = $(window).height()/2 - $("#menu").height()/2-10;
            $("#menu").css("top", menuY);
        } else {
            return;
        }
        
    });

//—————————————————Read More——————————————————————————————
$(".readmore").on("click", function() {

    $(this).hide();
    var moreText = $(this).closest(".bio").find(".more");

        $(moreText).slideDown();
        

})

//————————————Logo click refresh page—————————————————————
$("#logo-small").on("click", function() {
    location.reload();
})

//———————————————————Sticky nav———————————————————————————
$(window).scroll(function() {

    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        trigHaunt = true;
    }, 1000));

    mainTop = $("#main-container").position(),
    scrollPos = $(document).scrollTop(),
    infoTop = $("#info-column").position(),
    bodyPos = $("body").scrollTop();
    spanTop = $(".dark").position();

    if (scrollPos >= mainTop.top && $(window).width() > 800) {
        $("#main-container").css("position", "sticky");
        $("#nav").addClass("sticky");
        $("#mission-column").css("overflow-y", "scroll");
        $(".col").css("overflow-y", "scroll");
    } else if (scrollPos >= spanTop.top && $(window).width() <= 800) {
        $(".col").css("overflow-y", "visible");
        if (scrollPos < infoTop.top) {
            $("body").removeClass("white");
            $("body").addClass("black");
            $("#closed-lightmode").hide();
            $("#open").fadeIn();
            $(".mobi-eye").css("border-bottom", "1px solid #00ff00");
            $("#eyegreen").show();
            $("#eyeblack").hide();
            $("#info1-g").fadeIn(700);
            $("#info1-bw").hide();
            
          } else {
            $("body").removeClass("black");
            $("body").addClass("white");
            $("#closed-lightmode").fadeIn();
            $("#open").hide();
            $(".mobi-eye").css("border-bottom", "1px solid #000");
            $("#eyegreen").hide();
            $("#eyeblack").show();
            $("#info1-g").hide();
            $("#info1-bw").fadeIn(700);
            }

        

    } else {
      $("#nav").removeClass("sticky");
      $("#mission-column").css("overflow", "hidden");
      $(".col").css("overflow", "hidden");
    }

  });

//hauntings

$(".haunt").mouseenter(function() {

    if(!$("body").hasClass("lightmode") && windowCheck > 1024 && trigHaunt === true) {
        // $("#rectfield-small").animate({
        //     opacity: 1
        // }, 0);
        // $("#hauntings").animate({
        //     opacity: 0
        // }, 0);
        // $(".haunt").animate({
        //     color: "#ffffff",
        //     borderBottomColor: "#ffffff"
        // },0); 
        $("#hauntings").finish();
        $(".haunt").finish();
        $("#rectfield-small").finish();
        var summon = $(this);
        haunt(summon);

    }

}); 

$(".haunt").mouseleave(function() {
    
});
// , function() {
//     $("#rectfield-small").animate({
//         opacity: 1
//     }, 700);
//     $("#hauntings").animate({
//         opacity: 0
//     }, 700);
//     $(this).animate({
//         color: "#ffffff"
//     }, 700);
// }


}); //end document ready

function transitionMode() {
    $("body").addClass("lightmode");
    $("#info-column").show();
    $("#rectfield-small").hide();
    $(".col").addClass("lightmode");
    $("#nav").addClass("lightmode");
    // $("#open").hide();
    $("#closed").hide();
    $("#menu").addClass("lightmode");
    // $("#menu").css("left", "20px");
    menuY = $(window).height()/2 - $("#menu").height()/2-10;
    $("#menu").css("top", menuY);
    $("[data-typer]").hide();
    // logoPos(window);
    $("#logo-small").addClass("lightmode");
    $("#mission").addClass("lightmode");
    $(".haunt").css("color", "#000");
}

//————————————————Position rectfield——————————————————————

function positionP5(relTo, divideY, targetDiv) {
    // var rectX = $(relTo).width()/divideX - $("#"+targetDiv).outerWidth()/2;

    var rectY = $(relTo).height()/divideY - $("#"+targetDiv).height()/2 - 10;
    // $("#"+targetDiv).css("left", rectX);
    $("#"+targetDiv).css("top", rectY);
} 


//————————————————————Zalgo generator—————————————————————

var Z = {
    chars: {
        0 : [ /* up */
    '\u030d', /*     ̍     */
    '\u030e', /*     ̎     */
    '\u0304', /*     ̄     */
    '\u0305', /*     ̅     */
    '\u033f', /*     ̿     */
    '\u0311', /*     ̑     */
    '\u0306', /*     ̆     */
    '\u0310', /*     ̐     */
    '\u0352', /*     ͒     */
    '\u0357', /*     ͗     */
    '\u0351', /*     ͑     */
    '\u0307', /*     ̇     */
    '\u0308', /*     ̈     */
    '\u030a', /*     ̊     */
    '\u0342', /*     ͂     */
    '\u0343', /*     ̓     */
    '\u0344', /*     ̈́     */
    '\u034a', /*     ͊     */
    '\u034b', /*     ͋     */
    '\u034c', /*     ͌     */
    '\u0303', /*     ̃     */
    '\u0302', /*     ̂     */
    '\u030c', /*     ̌     */
    '\u0350', /*     ͐     */
    '\u0300', /*     ̀     */
    '\u0301', /*     ́     */
    '\u030b', /*     ̋     */
    '\u030f', /*     ̏     */
    '\u0312', /*     ̒     */
    
    '\u0314', /*     ̔     */
    '\u033d', /*     ̽     */
    '\u0309', /*     ̉     */
    '\u0363', /*     ͣ     */
    '\u0364', /*     ͤ     */
    '\u0365', /*     ͥ     */
    '\u0366', /*     ͦ     */
    '\u0367', /*     ͧ     */
    '\u0368', /*     ͨ     */
    '\u0369', /*     ͩ     */
    '\u036a', /*     ͪ     */
    '\u036b', /*     ͫ     */
    '\u036c', /*     ͬ     */
    '\u036d', /*     ͭ     */
    '\u036e', /*     ͮ     */
    '\u036f', /*     ͯ     */
    '\u033e', /*     ̾     */
    '\u035b', /*     ͛     */
    '\u0346', /*     ͆     */
    '\u031a'  /*     ̚     */
    ],
    1 : [ /* down */
    '\u0316', /*     ̖     */
    '\u0317', /*     ̗     */
    '\u0318', /*     ̘     */
    '\u0319', /*     ̙     */
    '\u031c', /*     ̜     */
    '\u031d', /*     ̝     */
    '\u031e', /*     ̞     */
    '\u031f', /*     ̟     */
    '\u0320', /*     ̠     */
    '\u0324', /*     ̤     */
    '\u0325', /*     ̥     */
    '\u0326', /*     ̦     */
    '\u0329', /*     ̩     */
    '\u032a', /*     ̪     */
    '\u032b', /*     ̫     */
    '\u032c', /*     ̬     */
    '\u032d', /*     ̭     */
    '\u032e', /*     ̮     */
    '\u032f', /*     ̯     */
    '\u0330', /*     ̰     */
    '\u0331', /*     ̱     */
    '\u0332', /*     ̲     */
    '\u0333', /*     ̳     */
    '\u0339', /*     ̹     */
    '\u033a', /*     ̺     */
    '\u033b', /*     ̻     */
    '\u033c', /*     ̼     */
    '\u0345', /*     ͅ     */
    '\u0347', /*     ͇     */
    '\u0348', /*     ͈     */
    '\u0349', /*     ͉     */
    '\u034d', /*     ͍     */
    '\u034e', /*     ͎     */
    '\u0353', /*     ͓     */
    '\u0354', /*     ͔     */
    '\u0355', /*     ͕     */
    '\u0356', /*     ͖     */
    '\u0359', /*     ͙     */
    '\u035a', /*     ͚     */
    '\u0323'  /*     ̣     */
        ],
    2 : [ /* mid */
    '\u0315', /*     ̕     */
    '\u031b', /*     ̛     */
    '\u0340', /*     ̀     */
    '\u0341', /*     ́     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361' /*     ͡     */
    // '\u0489' /*     ҉_     */
    ]

    },
    random: function(len) {
        if (len == 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
        var str_arr = str.split(''),
            output = str_arr.map(function(a) {
                if(a == " ") return a;
                for(var i = 0, l = Z.random(16);
                    i<l;i++){
                        var rand = Z.random(3);
                        a += Z.chars[rand][
                        Z.random(Z.chars[rand].length)
                        ];
                    }
                return a;
            });
        return output.join('');
    },
    lengthen: function(str) {

    }
};

//——————————Landing Zalgo/Charon animation func————————

function delayed () {
    count += 1;
    hero.innerHTML = Z.generate("Dark Study");
    if (count > 40) {
        delay += 13;
    }

    if(count>52) {
        $("#rectfield").fadeOut(1000);
    }

    if(count > 54) {
        clearTimeout(anim);
        setTimeout(function() {
            hero.innerHTML = Z.generate("Dark Study");
        },400);
        setTimeout(function() {
            tag();
            $(".charon").show();
            $(".charon").animate({
                    opacity: 1
                }, 1500);  
        }, 1000);

        logoiteration = $("#hero").html();
        $("#logo-small").html(logoiteration); 
        
        
    }
    if (count < 55) {
        var anim = setTimeout(delayed, delay);
       
    }
}



//——————————————————p5 s + bw rect func——————————————————
  function rectField(o, numberRects, g, rWidth, rHeight, stagBreak) {
    while(o.posArray.length<numberRects) {
      o.rectPos = {
        x: o.random(o.width),
        y: o.random(o.height)
      };
    
      o.offscreen = false;
    
      if(o.rectPos.x > o.width - 60 || o.rectPos.y > o.height - 80) {
        o.offscreen = true;
      }
      
      if(!o.offscreen) {
        o.posArray.push(o.rectPos);
      }
    }
    
    for(j=0; j<o.posArray.length; j++) {
      o.stagger = o.random();
      
      if (g<255) {
          o.alph = 255;
      } else {
         o.alph = o.random(g);
      }
      
      if(o.stagger<stagBreak) {
        o.noFill();
        o.stroke(0, g, 0);
      } else {
        o.fill(0, g, 0, o.alph);
        o.noStroke();
      }
      
      o.rect(o.posArray[j].x, o.posArray[j].y, rWidth, rHeight);
    }
  }

//———————————————tagline rotate—————————————————————————
function tag() {
    var tag1 = "Dark Study is an experimental program centered on art."
    var tag2 = "We are digitally-rooted and virtual-first."
    var tag3 = "Dark Study is not a pure space."

    var tags = [tag1, tag2, tag3];
    $(".tagline").html(tags[Math.floor(Math.random() * tags.length)]);

}

//———————————————generate hauntings——————————————————————
var haunts = [
"$1000 phones", "Most never read a black or brown theorist throughout entire time in art school", "We understand", "Our virtual schooling will be better than yours, period", "Philosophy bros. No.", "Solid and monolithic institutions. No.", "Um we’re running from YOU", "Fredric Jameson didn’t start a revolution", "You think we are doing the same thing, but we’re not"];

function haunt(summon) {
    var thisHaunt = $(summon).attr("id");
    var hauntIndex = thisHaunt.charAt(thisHaunt.length-1)-1;
    var speed=1800;
    // $(".haunt").finish();
    $("#hauntings").html(haunts[hauntIndex]);
    $("#rectfield-small").animate({
        opacity: 0.3
    }, speed-700).delay(speed).animate({
        opacity: 1
    }, speed);
    $("#hauntings").animate({
        opacity: 1
    }, speed-700).delay(speed).animate({
        opacity: 0
    }, speed);
    $(summon).animate({
        color: "#00ff00",
        borderBottomColor: "#00ff00"
    }, 800).delay(speed).animate({
        color: "#ffffff",
        borderBottomColor: "#ffffff"
    }, speed);

    // setTimeout(function() {
    //     $("#rectfield-small").animate({
    //         opacity: 1
    //     }, speed);
    //     $("#hauntings").animate({
    //         opacity: 0
    //     }, speed);
    //     $(summon).animate({
    //         color: "#ffffff",
    //         borderBottomColor: "#ffffff"
    //     }, speed);
    // }, speed);
}



    




  


  

  

  