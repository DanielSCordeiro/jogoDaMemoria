export function Carta({item, set}) {
  return (
    <button 
      className='carta'
      disabled={item.status}
      onClick={() => set(prev => ({...prev, item}))}
    >
      <div className='face'>
        <img src="/assets/capa.jpg" alt="Capa da carta no jogo da memória" />
      </div>
      <div className='face'>
        <img src={`/assets/${item.img}.jpg`} alt={`Carta contendo a foto de um ${item.img} no jogo da memória`} />
      </div>
    </button>
  )
}