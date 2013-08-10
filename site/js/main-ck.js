function getNews(){$(".news").html('<img src="img/loading.gif">');amount=$("#number").val();scope=$("#date option:selected").val();section=$("#section option:selected").val();keyword="";try{keyword=$.trim(keyword);validate(amount,scope,section,keyword);getGuardianNews(amount,scope,section,keyword)}catch(e){ajax.abort();$(".news").html('<p class="error">Please assure your input is correct ('+e+")</p>");return}}function handleGuardianNews(e){str="<ol>";$.each(e,function(e,t){headline=t[0];link=t[1];date=t[2];str+="<li>";str+='<h2 class="headline">'+headline+"</h2>";str+="<article>";str+='<div class="summary--content"><img src="img/loading.gif"></div>';str+='<a href="'+link+'" class="read-more" target="_blank" tabindex="2">Full article</a>';str+="</article>";str+="</li>"});str+="</ol>";$(".news").html(str);initializeLinkListeners()}function initializeLinkListeners(){var e=$(".headline").next("article");e.hide();$(".headline").click(function(){var t=$(this),n=t.next("article");n.slideToggle({duration:400,easing:"easeInOutCirc"});e.not(n).slideUp({duration:400,easing:"easeInOutCirc"});if(!t.hasClass("loaded")){getSummary(t);t.addClass("loaded")}})}function initializeTryAgain(){$(".try-again").click(function(e){e.preventDefault();$(this).hasClass("try-again--news")?getNews():$(this).hasClass("try-again--summary")&&getSummary($(this).parent().parent().parent().prev("h2"))})}function resizeSection(){option_val=$("#section > option:selected").text();$("#section-span").html(option_val);$("#section").width($("#section-span").width()+3)}function resizeNumber(){$("#number-span").html($("#number").val());$("#number").css("width",$("#number-span").width()+3)}function resizeDate(){option_val=$("#date > option:selected").val();$("#date-span").html(option_val);$("#date").width($("#date-span").width()+3)}function validate(e,t,n,r){if(isNaN(e))throw"Invalid amount of "+$("#date option:selected").val()}function getGuardianNews(e,t,n,r){today=new Date;start_time=new Date;end_time=today;switch(t){case"days":start_time.setDate(today.getDate()-e);break;case"weeks":start_time.setDate(today.getDate()-e*7);break;case"months":start_time.setMonth(today.getMonth()-e)}ajaxGuardian(start_time,end_time,n,r)}function ajaxGuardian(e,t,n,r){ajax=$.ajax({url:"guardian_feeds.php",type:"GET",dataType:"json",data:{start_time:e.f("yyyy-MM-dd"),end_time:t.f("yyyy-MM-dd"),section:n,keyword:r},success:function(e,t,n){$.each(e,function(e,t){t[2]=new Date(t[2])});handleGuardianNews(e)},error:function(e,t,n){$(".news").html('<p class="error">Couldn’t scoop the news for you&hellip; <a href="#" title="Try again" class="try-again try-again--news">Try again</a></p>');initializeTryAgain();console.log("ERROR: "+n)}})}function getSummary(e){ajax=$.ajax({url:"ots.php",type:"GET",dataType:"html",data:{to_sum:$(e).next("article").find("a.read-more").attr("href"),ratio:10},success:function(t,n,r){t=$("<div/>").html(t).text();t=="null"&&(t="No summary found.");$(e).next("article").find(".summary--content").slideUp(200,function(){$(e).next("article").find(".summary--content").html("<p>"+t+"</p>");$(e).next("article").find(".summary--content").find("a").attr("target","_blank");e.addClass("loaded")}).slideDown(300)},error:function(t,n,r){$(e).next("article").find(".summary--content").html('<p class="error">Couldn’t get summary&hellip;<a href="#" title="Try again" class="try-again try-again--summary">Try again</a></p>');initializeTryAgain();console.log("ERROR in getSummary");console.log(t)}})}$(document).ready(function(){resizeSection();resizeNumber();resizeDate();$(window).resize(function(){resizeSection();resizeNumber();resizeDate()});getNews();$("#section").change(function(){resizeSection();getNews()});$("#number").bind("keyup input paste",function(){resizeNumber();$(this).val()!=""&&getNews();var e=$("#date option:first-child").text(),t=e.substr(e.length-1);t=="s"&&$(this).val()==1?$("#date option").each(function(){var e=$(this).text().slice(0,-1);$(this).text($(this).text().slice(0,-1))}):t!="s"&&$(this).val()!=1&&$("#date option").each(function(){old_text=$(this).text();$(this).text(old_text+"s")})});$("#date").change(function(){resizeDate();getNews()})});ajax=null;