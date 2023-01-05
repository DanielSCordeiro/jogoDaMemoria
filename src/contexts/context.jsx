import { createContext, useState, useContext } from 'react'

const Context = createContext()

export const ContextProvider = ({children}) => {
  const URL_API = 'https://vendas.showdepremios.top/api/'

  return (
    <Context.Provider value={{
      URL_API
    }}>
      {children}
    </Context.Provider>
  )
}

export function Contexto() {
  const context = useContext(Context)
  return context
}