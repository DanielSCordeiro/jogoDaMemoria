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
  const [ bloquear, setBloquear ] = useState(false)
  const [ parFormado, setParFormado ] = useState(false)
  const [ informacao, setInformacao ] = useState('')


  function IniciarJogo() {
    // informar status da jogada
    setInformacao('Escolha uma carta para iniciar a partida.')
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
    if (jogada.length == 1) {
      // bloquear temporariamente uma nova jogada
      setBloquear(true)
    }
  }

  // CONFIRMAR JOGADA
  function ConfirmarJogada() {
    // informar status da jogada
    setTimeout(() => {
      setInformacao('Parabéns! Você conseguiu formar o par.')
    }, 600)
    // reiniciar a jogada
    setJogada([])


    // atrazar o inicio da próxima jogada
    setTimeout(() => {
      Desbloquear()
    }, 2000)
  }

  // CONFIRMAR JOGADA
  function ApagarJogada() {
    // informar status da jogada
    setTimeout(() => {
      setInformacao('Ops! As cartas não combinam.')
    }, 600)
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
      // continuar o jogo
      Desbloquear()
    }, 2000)
  }

  // DESBLOQUEAR BOTOES PARA CONTINUAR O JOGO ESCOLHENDO OUTRA CARTA
  function Desbloquear() {
    setTimeout(() => {
      // informar status da jogada
      setInformacao('Escolha outra carta para continuar.')
      // desbloquear temporariamente uma nova jogada
      setBloquear(false)
    }, 500)
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
      else if (jogada.length === 1) {
        setTimeout(() => {
          setInformacao(`Onde está a outra carta com ${jogada[0].img}`)
        }, 600)
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
          <Header informacao={informacao} />
          <div className="container">
            <div className="cartas">
              {lista.map(item => 
                <button 
                  className={item.status ? 'carta cartaVirada' : 'carta'}
                  key={item.id}
                  disabled={item.status || bloquear}
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
          <Footer cartasViradas={cartasViradas} />
        </div>
      }
    </main>
  )
}