import {useState, useEffect} from 'react'
import GetPokemon from './components/GetPokemon'
import type { Pokemon } from './components/GetPokemon'


function App() {
  const [pokemon, SetPokemon] = useState<Pokemon>({} as Pokemon)
  const [visible, SetVisible] = useState<boolean>(false)
  const random = Math.floor(Math.random() * 1017)

  async function fetchPokemon(){
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + random)
    const data = await res.json()
    SetPokemon(data) 
  }

async function handledb() {
  const res = await fetch('http://localhost:3000/api/pokemon',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify({name: pokemon.name})
  })
  const data = await res.json()
  console.log(data);
}


  useEffect (()=>{
    fetchPokemon()
  },[])

  function ifCatched(exp:number){
    const chance = Math.random() // 0.0 - 1.0
    const catched = -0.00109090909090909 * exp + 0.549090909090909 // 0.20 - 0.50

    if(chance <= catched){
      console.log('caught');
      SetVisible(true)
    }else{
      SetVisible(false)
      console.log('lost');
    }
  } 
  return (
    
    <div className='wholeThing'>
      <img className='background' src="BattleBgForest.webp"/>

      <div>
      <GetPokemon data={pokemon} />

    {visible && 
    <div className='styling'> 
    <p>You Caught It!</p> 
    <button onClick={()=> handledb()}>Put In Backpack</button>
    </div>}

      <button className='button' onClick={()=>{
        ifCatched(parseInt(pokemon.base_experience))
      }}>


        <img src="download.png"/>
      </button>
      </div>

    </div>

  )
}

export default App
