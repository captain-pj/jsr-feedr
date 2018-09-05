const keyGuardian = "e62a9133-6057-4ad4-b54e-321907886dbc",
      baseurlGuardian = "https://content.guardianapis.com/search?api-key=",
      keyYT ="AIzaSyBJLyXCAXMN-3RyIomeGVnUk7094fB5MRM",
      baseurlYT ="https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=",
      keyTimes = "ae89bef99206435f89589ee632e72ddf",
      baseurlTimes = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=";

var xhrGuardian = new XMLHttpRequest();
var xhrYT = new XMLHttpRequest();
var xhrTimes = new XMLHttpRequest();

var logo = document.querySelector('h1'),
    titleSpot = document.querySelector('h3'),
    pillarSpot = document.querySelector('h6'),
    main = document.getElementById('main'),
    sourceGaurdian = document.getElementById('sourceGaurdian'),
    sourceYT = document.getElementById('sourceYT'),
    sourceTimes = document.getElementById('sourceTimes'),
    sourceName = document.getElementById('sourceName'),
    sourceAll = document.getElementById('sourceAll'),
    guardianarticles = document.getElementsByClassName('guardianarticle'),
    ytvideos = document.getElementsByClassName('ytvideo'),
    timesarticles = document.getElementsByClassName('timesarticle');

xhrGuardian.open('GET', baseurlGuardian + keyGuardian);
xhrGuardian.send();
xhrGuardian.onerror = errorHandler;
xhrGuardian.onload = successHandlerGuardian;

xhrYT.open('GET', baseurlYT + keyYT);
xhrYT.send();
xhrYT.onerror = errorHandler;
xhrYT.onload = successHandlerYT;

xhrTimes.open('GET', baseurlTimes + keyTimes);
xhrTimes.send();
xhrTimes.onerror = errorHandler;
xhrTimes.onload = successHandlerTimes;

//click to only show gaurdian articles
sourceGaurdian.addEventListener('click', function() {
for (var i=0; i < guardianarticles.length; i++){
  if(guardianarticles[i].classList.contains('hidden')){
    guardianarticles[i].classList.remove('hidden')
  }//end if
}//end for loop
for (var i=0; i < ytvideos.length; i++){
  if(!ytvideos[i].classList.contains('hidden')){
    ytvideos[i].classList.add('hidden')
  }//end if
}//end for loop
for (var i=0; i < timesarticles.length; i++){
  if(!timesarticles[i].classList.contains('hidden')){
    timesarticles[i].classList.add('hidden')
  }//end if
}//end for loop
sourceName.innerText="The Guardian"
});//end click sourceGaurdian

//click to only show youtube videos
sourceYT.addEventListener('click', function() {
  for (var i=0; i < ytvideos.length; i++){
    if(ytvideos[i].classList.contains('hidden')){
      ytvideos[i].classList.remove('hidden')
    }//end if
  }//end for loop
  for (var i=0; i < guardianarticles.length; i++){
    if(!guardianarticles[i].classList.contains('hidden')){
      guardianarticles[i].classList.add('hidden')
    }//end if
  }//end for loop
  for (var i=0; i < timesarticles.length; i++){
    if(!timesarticles[i].classList.contains('hidden')){
      timesarticles[i].classList.add('hidden')
    }//end if
  }//end for loop
sourceName.innerText="Youtube"
});//end click sourceYT

//click to only show timesarticles
sourceTimes.addEventListener('click', function() {
  for (var i=0; i < timesarticles.length; i++){
    if(timesarticles[i].classList.contains('hidden')){
      timesarticles[i].classList.remove('hidden')
    }//end if
  }//end for loop
  for (var i=0; i < guardianarticles.length; i++){
    if(!guardianarticles[i].classList.contains('hidden')){
      guardianarticles[i].classList.add('hidden')
    }//end if
  }//end for loop
  for (var i=0; i < ytvideos.length; i++){
    if(!ytvideos[i].classList.contains('hidden')){
      ytvideos[i].classList.add('hidden')
    }//end if
  }//end for loop
sourceName.innerText="New York Times"
});//end click sourceTimes

//click to return to all sources
sourceAll.addEventListener('click', function() {
 for (var i=0; i < ytvideos.length; i++){
ytvideos[i].classList.remove('hidden')
}//end for loop
for (var i=0; i < timesarticles.length; i++){
timesarticles[i].classList.remove('hidden')
}//end for loop
for (var i=0; i < guardianarticles.length; i++){
guardianarticles[i].classList.remove('hidden')
}//end for loop
sourceName.innerText="All"
});//end click logo

function successHandlerGuardian() {
   var dataGuardian = JSON.parse(xhrGuardian.responseText);
   var hitsGuardian = dataGuardian.response.results;
   for (var i=0; i < hitsGuardian.length; i++){
     var gaurdianarticle =
     `<article class="article guardianarticle">
         <section class="featuredImage">
           <img src="images/article_placeholder_1.jpg" alt="" />
         </section>
         <section class="articleContent">
             <a href="#"><h3>${hitsGuardian[i].webTitle}</h3></a>
             <h6>${hitsGuardian[i].pillarName}</h6>
             <p>Source: The Gaurdian</p>
             <span class="hidden">${hitsGuardian[i].webUrl}</span>
         </section>
         <div class="clearfix"></div>
       </article>`;
       main.innerHTML += gaurdianarticle;
}//end for loop
//list of articles
   var clickArticles = document.querySelectorAll('.article');
//article clicking
for (i=0; i < clickArticles.length; i++){
    var popUp = document.getElementById('popUp'),
        closePopUp = document.querySelector('.closePopUp'),
        popUpTitleSpot = document.querySelector('h2'),
        popUpTextSpot = document.querySelector('.container p'),
        popUpButton = document.querySelector('.popUpAction');
  clickArticles[i].addEventListener('click', function(){
      popUp.classList.remove('hidden');
      popUpTitleSpot.innerHTML= this.children[1].children[0].children[0].innerText;
      // popUpTextSpot.innerHTML='';
      popUpButton.href=this.children[1].children[3].innerText;
  });//end event listener
  closePopUp.addEventListener('click', function(){
      popUp.classList.add('hidden');
  });//end event listener
}//end for loop
}//end successhandler

function successHandlerYT(){
  var dataYT = JSON.parse(xhrYT.responseText);
  var hitsYT = dataYT.items;
  for (var i=0; i < hitsYT.length; i++){
    var YTvideo =
    `<article class="article ytvideo">
        <section class="featuredImage">
          <img src="${hitsYT[i].snippet.thumbnails.default.url}" alt="" />
        </section>
        <section class="articleContent">
            <a href="#"><h3>${hitsYT[i].snippet.title}</h3></a>
            <h6>${hitsYT[i].snippet.tags[0]}</h6>
            <p>Source: YouTube</p>
            <span class="hidden">"https://youtube.com/${hitsYT[i].snippet.channelTitle}"</span>
        </section>
        <div class="clearfix"></div>
      </article>`;
      main.innerHTML += YTvideo;
}//end for loop
}//end successHandlerYT

function successHandlerTimes(){
  var dataTimes = JSON.parse(xhrTimes.responseText);
  var hitsTimes = dataTimes.results;
  for (var i=0; i < hitsTimes.length; i++){
    var timesarticle =
    `<article class="article timesarticle">
        <section class="featuredImage">
          <img src="${hitsTimes[i].multimedia[0].url}" alt=""/>
        </section>
        <section class="articleContent">
            <a href="#"><h3>${hitsTimes[i].title}</h3></a>
            <h6>${hitsTimes[i].section}</h6>
            <p>Source: New York Times</p>
            <span class="hidden">${hitsTimes[i].url}</span>
        </section>
        <div class="clearfix"></div>
      </article>`;
      main.innerHTML += timesarticle;
      console.log(hitsTimes);
}//end for loop
}//end successHandlerTimes


function errorHandler() {
  console.log("something went wrong");
}//end errorhandler
