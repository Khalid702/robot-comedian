const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton(){
 button.disabled = !button.disabled;
}


//pass joke to voiceRSS API
function tellMe(joke){
  console.log('tell me:' ,joke);
  VoiceRSS.speech({
            key: '73a5b5b07a344f718729ce6a066c0278',
            src: `${joke}`,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });	
}

//Get Jokes from joke API
async function getJokes(){
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious';
	try{
       const response = await fetch(apiUrl);
       const data = await response.json();
       if(data.setup){
       	joke = `${data.setup} ... ${data.delivery}`;
       }else{
       	joke = data.joke;
       }
       //joke to audio
      tellMe(joke);
      //disable btn
      toggleButton();
	}catch(err){
		console.log('err', err);
	}
}


button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);