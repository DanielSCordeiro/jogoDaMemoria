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
  const [ jogada, setJogada ] = useState([])

  function IniciarJogo() {
    // embaralhar cartas
    let embaralhar = ListaImagens.sort()
    setLista(embaralhar)

    // atraso no carregamento para dar impressão de que as cartas estão sendo carregadas
    setTimeout(() => {
      setLoad(false)
    }, 500)
  }

  // MARCAR CARTA
  function EscolherCarta(e) {
    // console.log(jogada.length)

    // marcar carta
    let novaLista = lista.filter(item => {
      if (item.id == e.id) {
        item.status = true
      }
      return item
    })
    setLista(novaLista)
    console.log(novaLista, 'novaLista')

    // setJogada((prev) => ({...prev, item}))
  }


  // INICIAR
  useEffect(() => {
    console.log(jogada)
    IniciarJogo()
  }, [jogada])

  return (
    <main>
      {load && <Loading />}
      {!load && 
        <div className="conteudo">
          <Header />
          <div className="container">
            <div className="cartas">
              {lista.map(item => 
                <button 
                  className={item.status ? 'carta cartaVirada' : 'carta'}
                  key={item.id}
                  disabled={item.status}
                  onClick={() => EscolherCarta(item)}
                >
                  <div className='face'>
                    <img src="/assets/capa.jpg" alt="Capa da carta no jogo da memória" />
                  </div>
                  <div className='face'>
                    <img src={`/assets/${item.img}.jpg`} alt={`Carta contendo a foto de um ${item.img} no jogo da memória`} />
                  </div>
                </button>
              )}
            </div>
          </div>
          <Footer />
        </div>
      }
    </main>
  )
}