const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

//INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray, // this ensures that songLyricsArray is part of our Redux state. 
  arrayPosition: 0, // this is our key, which will refer to which lyric in the array the user is on. By setting to 0, we are telling the app it should begin on the first song lyric when launched.  
}   
 
//REDUCER:
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition +1;
      let newState = {
        songLyricsArray: state.songLyricsArray,
        arrayPosition: newArrayPosition,
      }
      return newState;
    default: 
      return state;
}
}
// the default statement will execute if the action.type is NOT equivalent to NEXT_LYRIC



// JEST TESTS AND SETUP:
const { expect } = window; // because the CDN loads the Expect library as a object belonging to window. ONLY WHEN USING THE CDN.

expect (reducer(initialState, { type: null})).toEqual(initialState);
//the most basic thing any reducer can do is return our initial state without mutating it

expect (reducer(initialState, { type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray, 
  arrayPosition: 1
});
//We're testing our reducer has a NEXT_LYRIC action type that can advance the arrayPosition slice of our State. This test will fail until we add logic to pass the test in scripts.js. 





//REDUX "STORE"
const { createStore } = Redux; //imports the createStore() method from teh Redux library. this is REQUIRED. 
const store = createStore(reducer); // uses createStore() to construct a Redux store named STORE. When creating a store we must ALWAYS PROVIDE A REDUCER AS AN ARGUMENT. 
console.log(store.getState()); //console logging our store's state. 
// console.log(initialState);
//"initialState" is a general Redux term. Similar to how we defined initial state within our constructor() methods last week. 

//RENDERING STATE IN DOM
// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
   //defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
     //if there are already lyrics in this div, remove them one-by-one until it's empty. 
  const currentLine = store.getState().songLyricsArray
  [store.getState().arrayPosition];
  //locates the song lyric at the current arrayPosition
  const renderedLine = document.createTextNode(currentLine);
  //creates DOM text node containing the song lyric identified:
  document.getElementById('lyrics').appendChild(renderedLine);
  //adds text node created 2 lines up to 'lyrics' div in DOM
}

//run renderLyrics() method from above when paged is finised loading.
//window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = function () {
  renderLyrics();
}

//CLICK LISTENER
//when the user clicks the page, userClick() is invoked, thanks to this line from index.html: <body style='height:100vh' onClick='userClick()'
  const userClick = () => {
        store.dispatch({ type: 'NEXT_LYRIC'} );
        //logic to dispatch a Redux action with a TYPE of NEXT_LYRIC. the action includes a NEXT_LYRIC type, so the reducer will run its NEXT_LYRIC case, which is what increments arrayPosition by 1. The reducer handles returning the object containing state. 
        console.log(store.getState());
      }
