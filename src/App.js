import React, { useState,useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const jumbleWord = [
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

const word =['K','a','n','n','a','d','a']

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: '8px',
  overflow: 'auto',
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: `8px 22px 16px 20px`,
  margin: `0 8px 0 0`,
  fontSize:'30px',

  background: isDragging ? 'yellow' : 'gray',

  ...draggableStyle,
});

var check;
var right=false;
var wrong=false;
var complete;
var finalWord=[];
function App() {
  const [characters, updateCharacters] = useState(jumbleWord);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);

    complete=false;

    //  console.log(result);
    //  console.log(jumbleWord[result.draggableId-1].id,jumbleWord[result.draggableId-1].name);
    if(jumbleWord[result.draggableId-1].name===word[(jumbleWord[result.destination.index].id)-1]){
      // console.log("right",result.destination.index);
      check=result.destination.index;
      right=true;
      wrong=false;
    }
    else{
      wrong=true;
      right=false;
      check=result.destination.index;
    }
  }

  useEffect(() => {
    finalWord=[];
    characters.map(({id, name}, index) => {
      finalWord.push(characters[index].name);
      // console.log(finalWord)
      if(JSON.stringify(finalWord)===JSON.stringify(word)){
        complete=true;
        setSeconds(0);
      }
      return null;
    })
  });

  const [seconds, setSeconds] = React.useState(20);

  React.useEffect(() => {
    if (seconds > 0 && !complete) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }else if(complete){
      setSeconds('Well Done!');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } 
    else {
      setSeconds('Times Up!');

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  },[seconds]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Jumble Word</h1>
        <h2>Karnataka</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters" direction='horizontal' type='column'>
            {(provided, snapshot) => (
              <ul className="characters" style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <li 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style)}
                          className={characters[index].name===word[index] ? 'correct-letter' : null}
                          >
                           <div className="check">
                              {(() => {
                                if (check===index && right) {
                                  // console.log("ok")
                                  return (
                                    <div className="wrapper zoom"> <svg className="animated-check" viewBox="0 0 24 24">
                                          <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> </svg>
                                    </div>
                                  )
                                } else if(check===index && wrong) {
                                  return (
                                    <div className="wrapper zoom">
                                      <svg className="animated-cross" viewBox="9 0 39 39">
                                          <path d="M19 15 35 28 M34.5 14 18 30 " fill="none" />
                                      </svg>
                                    </div>
                                  )
                                }
                              })()}
                            </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div>
        {seconds>0 ? '0:' : '' }{seconds}
      </div>
      </header>
    </div>
  );
}

export default App;
