import { useState, useEffect } from 'react'
import { Contexto } from '../contexts'

import { Loading } from '../components/loading'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export function Home() {
  const { ListaImagens } = Contexto()
  const [ load, setLoad ] = useState(true)
  const [ informacao, setInformacao ] = useState('')
  const [ cartasViradas, setCartasViradas ] = useState(0)
  const [ paresFormados, setParesFormados ] = useState(0)
  const [ lista, setLista ] = useState([])
  const [ jogada, setJogada ] = useState([])
  const [ bloquearBotao, setBloquearBotao ] = useState(false)
  const [ finalDoJogo, setFinalDoJogo ] = useState(false)
  const [ parFormado, setParFormado ] = useState([])
  const [ naoFormado, setNaoFormado ] = useState([])

  // EMBARALHAR ARRAY
  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let aleatorio = Math.floor(Math.random() * (i + 1));
      [array[i], array[aleatorio]] = [array[aleatorio], array[i]]
    }
    return array
  }

  // INICIAR JOGO
  function IniciarJogo() {
    // zerar dados
    setLoad(true)
    setJogada([])
    setCartasViradas(0)
    setParesFormados(0)
    setBloquearBotao(false)
    setParFormado([])
    setNaoFormado([])
    setInformacao('Escolha uma carta para iniciar a partida.')
    // desmarcar cartas
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
    }, 2000)
  }

  // ALTERAR INFORMAÇÕES NA TELA
  function SetInfo(info) {
    // atrazar alteração para dar tempo de efeito visual (css)
    setTimeout(() => {
      setInformacao(info)
    }, 600)
  }

  // MARCAR CARTA ESCOLHIDA
  function EscolherCarta(itemClicado) {
    // marcar carta
    let novaLista = lista.filter(item => {
      if (item.id === itemClicado.id) {
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
    // bloquear temporariamente uma nova jogada
    if (jogada.length === 1) {
      setBloquearBotao(true)
    }
  }

  // MONITORAR CADA JOGADA
  useEffect(() => {
    if (jogada.length === 2) {
      if (jogada[0].img === jogada[1].img) {
        ConfirmarJogada()
      } else {
        ApagarJogada()
      }
    }
    else if (jogada.length === 1) {
      SetInfo(`Onde está a outra carta com ${jogada[0].info}.`)
    }
  }, [jogada])

  // CONFIRMAR JOGADA
  function ConfirmarJogada() {
    // marcar quantidade de pares formados
    setParesFormados(prev => prev + 1)
    // informar status da jogada
    SetInfo('Parabéns! Você conseguiu formar o par.')
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
    SetInfo('Ops! As cartas não combinam.')
    // atrazar para efeito de parNaoFormado com CSS
    setTimeout(() => {
      setNaoFormado([jogada[0].id, jogada[1].id])
    }, 600)
    // desmarcar cartas
    // atrazar a retirada das cartas para mostrar que o usuário errou
    setTimeout(() => {
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
    // VERIFICAR SE O JOGO CHEGOU AO FIM
    if (paresFormados === 5) {
      SetInfo('Parabéns! Você completou o desafio.')
      setTimeout(() => {
        setFinalDoJogo(true)
      }, 600)
    } else {
      // limpar parFormado
      setParFormado([])
      // limpar parNaoFormado
      setNaoFormado([])
      SetInfo('Escolha outra carta para continuar.')
      // desbloquear temporariamente uma nova jogada
      setTimeout(() => {
        setBloquearBotao(false)
      }, 600)
    }
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
          <Header informacao={informacao} />
          <div className="container">
            <div className={finalDoJogo ? 'cartas finalJogo' : 'cartas'}>
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
                      disabled={item.status || bloquearBotao}
                      onClick={() => EscolherCarta(item)}
                    >
                      <div className='face'>
                        <img src='/assets/capa.jpg' alt="Capa da carta no jogo da memória" />
                      </div>
                      <div className='face'>
                        <img 
                          src={`/assets/${item.img}.jpg`} 
                          alt={`Carta contendo a foto de ${item.info} no jogo da memória`} 
                        />
                      </div>
                    </button>
                  )
                }
              )}
            </div>
          </div>
          <Footer 
            cartasViradas={cartasViradas}
            final={finalDoJogo}
            IniciarJogo={IniciarJogo}
          />
        </div>
      }
    </main>
  )
}