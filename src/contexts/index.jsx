import { createContext, useState, useContext } from 'react'

const Context = createContext()

export const ContextProvider = ({children}) => {
  const ListaImagens = [
    {id: 1, status: false, img: 'elefante', info: 'um Elefante'},
    {id: 2, status: false, img: 'girafa', info: 'uma Girafa'},
    {id: 3, status: false, img: 'hipopotamo', info: 'um Hipopótamo'},
    {id: 4, status: false, img: 'leao', info: 'um Leão'},
    {id: 5, status: false, img: 'tigre', info: 'um Tigre'},
    {id: 6, status: false, img: 'zebra', info: 'uma Zebra'},
    {id: 7, status: false, img: 'elefante', info: 'um Elefante'},
    {id: 8, status: false, img: 'girafa', info: 'uma Girafa'},
    {id: 9, status: false, img: 'hipopotamo', info: 'um Hipopótamo'},
    {id: 10, status: false, img: 'leao', info: 'um Leão'},
    {id: 11, status: false, img: 'tigre', info: 'um Tigre'},
    {id: 12, status: false, img: 'zebra', info: 'uma Zebra'}
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