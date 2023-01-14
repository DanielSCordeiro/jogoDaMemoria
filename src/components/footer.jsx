export function Footer({cartasViradas}) {
  return (
    <footer>
      <p>Pontos: <strong>{cartasViradas}</strong></p>
      <p>Cartas viradas: <strong>{cartasViradas}</strong></p>
    </footer>
  )
}