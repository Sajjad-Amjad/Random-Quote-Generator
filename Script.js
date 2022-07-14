let refresh_btn = document.querySelector('.refresh-btn');
let speak_btn = document.querySelector('.speak-btn');
let copy_btn = document.querySelector(".copy-btn");
let twitter_btn = document.querySelector('.twitter-btn');
let container = document.querySelector('.container');
let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let copy_icon = document.querySelector(".fa-copy");
let copy_message = document.querySelector(".copy-btn span");

refresh_btn.addEventListener('click',()=>{
//Call getQuote Function
getQuote();
//Call getRandomColor function
getRandomColor();
});

//Change Container Color On Refresh Btn Click
let getRandomColor = ()=>{
const colors = ["#548E9C", "#131454", "#34567B", "#044B5D", "#6367B0", "#A05A5C", "#CF554A"];
var Randomcolor = colors[Math.floor(Math.random() * colors.length)]
container.style.backgroundColor = Randomcolor;       
}

//Fetch Api
const url = "https://api.quotable.io/random";

let getQuote = ()=>{
fetch(url).then((data) => data.json()).then((item) =>{
 quote.innerHTML = item.content;
 author.innerHTML = "- " + item.author;
 speechSynthesis.cancel()
});
};

//Quote Speak
speak_btn.addEventListener('click',()=>{
let speech = new SpeechSynthesisUtterance();
speech.lang = 'en-US';
speech.text =  `${quote.textContent} by ${author.textContent}`;
speech.rate = 0.9;
speech.volume = 1;
speech.pitch = 1;

speechSynthesis.speak(speech);
});

//Copy Quote
copy_btn.addEventListener('click',()=>{
  var r = document.createRange();
  r.selectNode(quote);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();   
  copy_icon.style.display = 'none';
  copy_message.style.display = 'block';
  setTimeout(()=>{
copy_icon.style.display = 'block';
copy_message.style.display = 'none';          
  },1000)
});

//Tweet A Quote
twitter_btn.addEventListener('click',()=>{
let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}                              ${author.innerText}`;
window.open(tweetUrl, "_blank");     
});

getQuote();
getRandomColor();