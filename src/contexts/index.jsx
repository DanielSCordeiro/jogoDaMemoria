import { createContext, useState, useContext } from 'react'

const Context = createContext()

export const ContextProvider = ({children}) => {
  const ListaImagens = [
    {id: 1, status: false, img: 'elefante'},
    {id: 2, status: false, img: 'girafa'},
    {id: 3, status: false, img: 'hipopotamo'},
    {id: 4, status: false, img: 'leao'},
    {id: 5, status: false, img: 'tigre'},
    {id: 6, status: false, img: 'zebra'},
    {id: 7, status: false, img: 'elefante'},
    {id: 8, status: false, img: 'girafa'},
    {id: 9, status: false, img: 'hipopotamo'},
    {id: 10, status: false, img: 'leao'},
    {id: 11, status: false, img: 'tigre'},
    {id: 12, status: false, img: 'zebra'}
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