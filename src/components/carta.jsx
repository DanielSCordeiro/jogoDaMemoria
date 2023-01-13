export function Carta({img}) {
  return (
    <button className='carta'>
      <div className='face'>
        <img src="/assets/capa.jpg" alt="Capa da carta no jogo da memória" />
      </div>
      <div className='face'>
        <img src={`/assets/${img}.jpg`} alt={`Carta contendo a foto de um ${img} no jogo da memória`} />
      </div>
    </button>
  )
}