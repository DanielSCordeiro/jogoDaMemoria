import { useState, useEffect } from 'react'
import { Contexto } from '../contexts'

import { Loading } from '../components/loading'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export function Home() {
  const { ListaImagens } = Contexto()
  const [ load, setLoad ] = useState(true)
  const [ lista, setLista ] = useState([])
  const [ jogada, setJogada ] = useState([])
  const [ cartasViradas, setCartasViradas ] = useState(0)
  const [ paresFormados, setParesFormados ] = useState(0)
  const [ bloquear, setBloquear ] = useState(false)
  const [ parFormado, setParFormado ] = useState([])
  const [ naoFormado, setNaoFormado ] = useState([])
  const [ informacao, setInformacao ] = useState('')


  function IniciarJogo() {
    // zerar dados
    setLoad(true)
    setJogada([])
    setCartasViradas(0)
    setParesFormados(0)
    setBloquear(false)
    setParFormado([])
    setNaoFormado([])
    setInformacao('Escolha uma carta para iniciar a partida.')
    // desmarcar cartas (pode ser um bug, mas sem este filtro os pares montados anteriormente continuavam montados)
    let novaLista = ListaImagens.filter(item => {
      if (item.status) {
        item.status = false
      }
      return item
    })
    // embaralhar cartas
    let embaralhado = embaralhar(novaLista)
    // salvar cartas embaralhadas
    setLista(embaralhado)
    // atraso no carregamento para dar impressão de que as cartas estão sendo carregadas
    setTimeout(() => {
      setLoad(false)
    }, 500)
  }

  // EMBARALHAR LISTA
  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let aleatorio = Math.floor(Math.random() * (i + 1));
      [array[i], array[aleatorio]] = [array[aleatorio], array[i]]
    }
    return array
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
    // marcar quantidade de pares formados
    setParesFormados(prev => prev + 1)
    // informar status da jogada
    setTimeout(() => {
      setInformacao('Parabéns! Você conseguiu formar o par.')
    }, 600)
    // efeito de parFormado com CSS
    setTimeout(() => {
      setParFormado([jogada[0].id, jogada[1].id])
    }, 600)
    // reiniciar a jogada
    setJogada([])
    // atrazar o inicio da próxima jogada
    setTimeout(() => {
      Desbloquear()
    }, 2000)
  }

  // APAGAR JOGADA
  function ApagarJogada() {
    // informar status da jogada
    setTimeout(() => {
      setInformacao('Ops! As cartas não combinam.')
    }, 600)
    // efeito de parNaoFormado com CSS
    setTimeout(() => {
      setNaoFormado([jogada[0].id, jogada[1].id])
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
    // limpar parFormado
    setParFormado([])
    // limpar parNaoFormado
    setNaoFormado([])
    // VERIFICAR SE O JOGO CHEGOU AO FIM
    if (paresFormados === 5) {
      // o jogo chegou ao fim - 5 pois o array inicia em 0, então terá 6 elementos
      setTimeout(() => {
        setInformacao('Parabéns! Você completou o desafio.')
      }, 500)
    } else {
      // continuar o jogo
      setTimeout(() => {
        setInformacao('Escolha outra carta para continuar.')
        // desbloquear temporariamente uma nova jogada
        setBloquear(false)
      }, 500)
    }
  }

  // CHECAR PAR
  useEffect(() => {
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
              {lista.map(item => {

                  let estilo = 'carta'
                  if (item.status) {
                    estilo += ' cartaVirada'
                  }
                  if (parFormado.includes(item.id)) {
                    estilo += ' parFormado'
                  }
                  if (naoFormado.includes(item.id)) {
                    estilo += ' parNaoFormado'
                  }

                  return (
                    <button 
                      className={estilo}
                      key={item.id}
                      disabled={item.status || bloquear}
                      onClick={() => EscolherCarta(item)}
                    >
                      <div className='face'>
                        <img src='/assets/capa.jpg' alt="Capa da carta no jogo da memória" />
                      </div>
                      <div className='face'>
                        <img src={`/assets/${item.img}.jpg`} alt={`Carta contendo a foto de um ${item.img} no jogo da memória`} />
                      </div>
                    </button>
                  )
                }
              )}
            </div>
          </div>
          <Footer 
            cartasViradas={cartasViradas} 
            final={informacao === 'Parabéns! Você completou o desafio.' ? true : false} 
            IniciarJogo={IniciarJogo}
          />
        </div>
      }
    </main>
  )
}