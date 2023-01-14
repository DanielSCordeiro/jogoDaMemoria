export function Footer({cartasViradas, final, IniciarJogo}) {
  return (
    <footer>
      <div>
        <p>Pontos: <strong>{cartasViradas}</strong></p>
        <p>Cartas viradas: <strong>{cartasViradas}</strong></p>
      </div>
      <button 
        className={final ? 'jogar' : ''}
        onClick={IniciarJogo}
      >
        {final ? 'Jogar novamente' : 'Reiniciar'}
      </button>
    </footer>
  )
}