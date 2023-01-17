export function Footer({cartasViradas, final, IniciarJogo}) {
  return (
    <footer>
      <div>
        <p>Cartas viradas: <strong>{cartasViradas}</strong></p>
      </div>
      <button onClick={IniciarJogo}>
        {final ? 'Jogar novamente' : 'Reiniciar jogo'}
      </button>
    </footer>
  )
}