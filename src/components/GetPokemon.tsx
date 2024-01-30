import React from 'react'

export type Pokemon = {
  id: string,
  name: string,
  base_experience: string,
  sprites: {
      front_default: string
  }
}

export default function GetPokemon({data}:{data: Pokemon}) {
  if(!data.name){
      return(
          <div className='loading'>loading...</div>
      )
  } 
  return (
  <div>
        <div className='banner'>
          <h1>A Wild Pokemon Has Appeared!</h1>
        </div>

        <div className='imgMover'>
            <img className='pokemon' src={data.sprites.front_default}/>
          </div> 

        <div className='text'>
          <h2>Name: {data.name}</h2>
          <h2>Base Experience: {data.base_experience}</h2>
          </div>
  </div>
)
}
