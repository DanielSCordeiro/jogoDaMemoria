import { createContext, useState, useContext } from 'react'

const Context = createContext()

export const ContextProvider = ({children}) => {
  const ListaImagens = [
    {id: 1, img: 'elefante'},
    {id: 2, img: 'girafa'},
    {id: 3, img: 'hipopotamo'},
    {id: 4, img: 'leao'},
    {id: 5, img: 'tigre'},
    {id: 6, img: 'zebra'},
    {id: 7, img: 'elefante'},
    {id: 8, img: 'girafa'},
    {id: 9, img: 'hipopotamo'},
    {id: 10, img: 'leao'},
    {id: 11, img: 'tigre'},
    {id: 12, img: 'zebra'}
  ]

  return (
    <Context.Provider value={{
      ListaImagens
    }}>
      {children}
    </Context.Provider>
  )
}

export function Contexto() {
  const context = useContext(Context)
  return context
}