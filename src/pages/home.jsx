import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Contexto } from '../contexts/context'
import { Loading } from '../components/loading'

export function Home() {
  const params = useParams()
  const navigate = useNavigate()
  const { URL_API } = Contexto()
  const [ load, setLoad ] = useState(true)

  return (
    <main>
      {load ? (
          <Loading />
        ) : (
          <div className="conteudo">
            HOME
          </div>
        )
      }
    </main>
  )
}