import React, { useState} from 'react';
import './App.css';
import DragDrop from './components/DragDrop';
import Thanks from './components/Thanks';

const kannada = [
  {
    id: '1',
    name: 'n'
  },
  {
    id: '2',
    name: 'K'
  },
  {
    id: '3',
    name: 'a'
  },
  {
    id: '4',
    name: 'a'
  },
  {
    id: '5',
    name: 'd'
  },
  {
    id: '6',
    name: 'a'
  },
  {
    id: '7',
    name: 'n'
  }
]

const kannadaState = "Karnataka"
const kannada1 =['K','a','n','n','a','d','a']

const hindi = [
  {
    id: '1',
    name: 'i'
  },
  {
    id: '2',
    name: 'H'
  },
  {
    id: '3',
    name: 'd'
  },
  {
    id: '4',
    name: 'i'
  },
  {
    id: '5',
    name: 'n'
  }
]

const hindiState ="Uttar Pradesh"
const hindi1 =['H','i','n','d','i']

const tamil = [
  {
    id: '1',
    name: 'a'
  },
  {
    id: '2',
    name: 'm'
  },
  {
    id: '3',
    name: 'T'
  },
  {
    id: '4',
    name: 'l'
  },
  {
    id: '5',
    name: 'i'
  }
]

const tamilState ="Tamil Nadu"
const tamil1 =['T','a','m','i','l']

function App() {

const [isPreview, setIsPreview] = useState(0);
 const nextJumble = (nextWord) => {
    //  console.log(nextWord);
     var increment=isPreview+1;
     setIsPreview(increment)
    //  console.log(isPreview)
     if(isPreview ===2){
      // console.log(isPreview);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
     }
  }

  return (

    <div>
     {(() => {
      if (isPreview===0) {
        return <DragDrop jumbleWord={kannada} word={kannada1} state={kannadaState} nextJumble={nextJumble}/>;
      } 
      else if (isPreview===1){
        return <DragDrop jumbleWord={hindi} word={hindi1} state={hindiState} nextJumble={nextJumble}/>;
      } 
      else if (isPreview===2){
        return <DragDrop jumbleWord={tamil} word={tamil1} state={tamilState} nextJumble={nextJumble}/>;
      } 
      else{
        return <Thanks/>;
      } 
      })()}
       
    </div>
  );
}

export default App;
