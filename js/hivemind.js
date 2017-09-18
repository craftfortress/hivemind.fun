 var query, conjugation, hashMap = {};

 function addScript(u) {
   var s = document.createElement('script');
   s.src = u;
   document.getElementsByTagName('*')[1].appendChild(s);
 }

 function getQueryWiki(term, callback) {
   var id = "i" + Math.random().toString(36).slice(2);
   getQueryWiki[id] = function(data) {
     callback(data);
     delete getQueryWiki[id];
   };
   addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fen.wikipedia.org%2Fw%2Fapi.php%3Faction%3Dopensearch%26search%3D" +
     encodeURIComponent(term) +
     "%26namespace%3D0%22%20&format=json&callback=getQueryWiki." + id);
 }

 function getQueryGoogle(term, callback) {
   var id = "i" + Math.random().toString(36).slice(2);
   getQueryGoogle[id] = function(data) {
     callback(data);
     delete getQueryGoogle[id];
   };
   addScript("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26q%3D" +
     encodeURIComponent(term) +
     "%22%20&format=json&callback=getQueryGoogle." + id);
 }

 function parseThis(arr) {
   var arr = JSON.parse(arr);
   var i = 0;

   if (!arr.map) {

     // $('#content' + i).fadeOut();
     // $('#smallBubble' + i).fadeOut();

     return;

   }

   arr = arr.map(function(x) {
     i++;



     var leReply = x.replace(query, "");

     if (i <= 1) {
       updateValue(query + leReply);
       //alert(leReply);
     }

     var stringy = "https://www.google.com/webhp?hl=en#hl=en&q=" + query + leReply;

     $("#tweet").attr("href", "https://twitter.com/home?status=The%20planet%20thinks%20" + query + leReply + " .Ask%20the%20%23hivemind%20about%20http%3A//hivemind.fun?" + query + "%20%40craftfortress.");
     $('#content' + i).append("<a href='" + stringy + "' style='z-index:999999999999999999999999 !important' class='reply'>" + leReply + "</a>");

     var random = Math.random() * 2000;

     if (leReply.length < 1) {
       //$('#content' + i).fadeOut();
       //  $('#smallBubble' + i).fadeOut();

       //$('#smallBubble'+i).fadeOut();
       //$('#content'+i).fadeOut();


     } else {

       $('#tinyBubble' + i).fadeIn(1000);
       $('#smallBubble' + i).fadeIn(2000);
       $('#content' + i).fadeIn(3000);
     }

     return x;

   })

   while (i < arr.length - 1) {
     //$('#content' + i).fadeOut();
     //$('#smallBubble' + i).fadeOut();

     i++;
   }

   return arr;

 }

 $('#input').keyup(function(event) {
   //$('.bubble').fadeOut();
   //$('.content').fadeOut();

   event.preventDefault();
   if (event.keyCode != 13) {
     $('.bubble').fadeOut();
     $('.content').fadeOut();
     return;
   } else {

     // $('bubble').addClass('.fadeBubbleIn');
   }

   query = $('#input').val();
   query = query.replace("%20is", "");
   query = query.replace("%20are", "");
   query = query.replace("%20", "");

   conjugation = "%20are%20";

   if (query[query.length - 1] != 's')
     conjugation = "%20is%20";

   var longQuery = query + conjugation;


   getQueryGoogle(longQuery, function(d) {

     var leString = "";

     try {
       leString = d.query.results.json.json[1].json;
     } catch (exception) {

       $('.content').fadeOut();


       return;
     }

     $('.reply').remove();
     parseThis(
       JSON.stringify(
         leString,
         null,
         "\t"
       )
     );
   });
 });

 function floatElement(x) {
   setTimeout(function() {
     $('#content' + x).addClass('floatAway');
   }, Math.random() * 3000)

   setTimeout(function() {
     $('#smallBubble' + x).addClass('floatAway');
   }, Math.random() * 3000)

 }

 $(document).ready(function() {


   $('.content').hide();
   $('.bubble').hide();
   $('.tinyBubble').hide();


   $('.content').fadeIn();
   let i = 0;

   while (i < 7) {
     floatElement(i);
     i++;
   }

   Tipped.create('.boxes .box');
   var url = window.location.href;

   var resultUrl = "";

   if (url.indexOf("?") > -1)
     resultUrl = url.substring(url.lastIndexOf("?") + 1, url.length);

   if (resultUrl.length > 0) {
     $('#input').val(resultUrl);
   } else {
     $('#input').val("cats");

   }
   $('#tweet').fadeIn(10000);
   $('#link').fadeIn(10000);

   $('.content').hide();
 });


 setInterval(function() {
   getValue();
   var x = parseInt((Math.random() * screen.width));
   var y = parseInt((Math.random() * screen.height)); // (Math.random()*window.height);

    if(x>(screen.width-200))
      x-=200;

    if(y>(screen.height-200))
      y-=50;

    $('#cloudQuery').css('margin-left', x);
    $('#cloudQuery').css('margin-top', y);

   if (!(cloudQuery in hashMap)) {
     $('#cloudQuery').text(cloudQuery);
     hashMap[cloudQuery] = cloudQuery;
     $('#cloudQuery').fadeIn();
     setTimeout(function() {
       $('#cloudQuery').fadeOut()
     }, 2000)
     var snd = new Audio("pop.flac"); // buffers automatically when created
     snd.play();
   }
 }, 3000);
$('#github').hide();

 setTimeout(function(){  $('#github').fadeIn(20000);}, 10000)