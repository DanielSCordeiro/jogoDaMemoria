import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Contexto } from '../contexts'

import { Loading } from '../components/loading'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export function Home() {
  const params = useParams()
  const navigate = useNavigate()
  const { ListaImagens } = Contexto()
  const [ load, setLoad ] = useState(true)
  const [ lista, setLista ] = useState([])
  const [ jogada, setJogada ] = useState([])
  const [ cartasViradas, setCartasViradas ] = useState(0)
  const [ parFormado, setParFormado ] = useState(false)


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
  function EscolherCarta(itemClicado) {
    // marcar carta
    let novaLista = lista.filter(item => {
      if (item.id == itemClicado.id) {
        item.status = true
      }
      return item
    })
    // salvar alterações na lista de cartas
    setLista(novaLista)
    // salvar carta escolhida na jogada
    setJogada(prev => ([...prev, itemClicado]))
    // marcar jogada
    setCartasViradas(prev => prev + 1)
  }

  // CONFIRMAR JOGADA
  function ConfirmarJogada() {
    // reiniciar a jogada
    setJogada([])
  }

  // CONFIRMAR JOGADA
  function ApagarJogada() {
    // atrazar a retirada das cartas para mostrar que o usuário errou
    setTimeout(() => {
      // desmarcar cartas
      let novaLista = lista.filter(item => {
        if (item.id == jogada[0].id || item.id == jogada[1].id) {
          item.status = false
        }
        return item
      })
      // salvar alterações na lista de cartas
      setLista(novaLista)
      // reiniciar a jogada
      setJogada([])
    }, 2000)
  }

  // FIM DE JOGO - TODOS OS PARES FORMADOS
  function FinalizarJogo() {
    console.log('FinalizarJogo()')
  }

  // CHECAR PAR
  useEffect(() => {
    // verificar final do jogo
    let verificar = lista.filter(item => {
      if (item.status) {
        return item
      }
    })
    if (verificar.length === lista.length && jogada.length === 2) {
      // finalizar o jogo
      FinalizarJogo()
    } else {
      // verificar o par
      if (jogada.length === 2) {
        if (jogada[0].img === jogada[1].img) {
          // acertou o par
          ConfirmarJogada()
        } else {
          // errou o par
          ApagarJogada()
        }
      }
    }
  }, [jogada])


  // INICIAR
  useEffect(() => {
    IniciarJogo()
  }, [])

  return (
    <main>
      {load && <Loading />}
      {!load && 
        <div className="conteudo">
          <Header cartasViradas={cartasViradas} />
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