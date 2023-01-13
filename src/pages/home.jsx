import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Contexto } from '../contexts'

import { Loading } from '../components/loading'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Carta } from '../components/carta'

export function Home() {
  const params = useParams()
  const navigate = useNavigate()
  const { ListaImagens } = Contexto()
  const [ load, setLoad ] = useState(true)
  const [ lista, setLista ] = useState([])

  function IniciarJogo() {
    // embaralhar cartas
    let embaralhar = ListaImagens.sort()
    setLista(embaralhar)

    // atraso no carregamento para dar impressão de que as cartas estão sendo carregadas
    setTimeout(() => {
      setLoad(false)
    }, 500)
  }


  // INICIAR
  useEffect(() => {
    IniciarJogo()
  }, [])

  return (
    <main>
      {load && <Loading />}
      {!load && 
        <div className="conteudo">
          <Header />
          <div className="container">
            <div className="cartas">
              {lista.map(item => <Carta key={item.id} img={item.img} />)}
            </div>
          </div>
          <Footer />
        </div>
      }
    </main>
  )
}