import { useState } from 'react'

export const BuscadorPeliculas = () => {

    const api_Key = 'd376af3e26ba9b75563306833daa685e'
    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const urlImg = 'https://image.tmdb.org/t/p/w200'

    const [peliculas, setPeliculas] = useState('')
    const [dataBuscador, setDataBuscador] = useState([])

    const ManejoBuscador = (e) => {
        setPeliculas(e.target.value)
    }
    const ManejoEntrega = (e) => {
        e.preventDefault()
        BuscarPelicula()
    }
    const BuscarPelicula = async () => {
        try {
            const res = await fetch(`${urlBase}?api_key=${api_Key}&query=${peliculas}`)
            const data = await res.json()
            console.log(data.results)
            setDataBuscador(data.results)
        } catch (error) {
            console.error('ocurrio un error: ', error)
        }
    }

    return (
        <div className='container'>
            <h1 className="title">Busca tu Pelicula</h1>
            <form onSubmit={ManejoEntrega}>
                <input
                    type="text"
                    value={peliculas}
                    onChange={ManejoBuscador}
                />
                <button type='submit' className="search-button" >Buscar</button>
            </form>

            <div className="movie-list">
                {dataBuscador.map((pelicula) => (
                    <div key={pelicula.id} className="movie-card">
                        <img src={`${urlImg}${pelicula.poster_path}`} alt={pelicula.title} />
                        <h2>{pelicula.title}</h2>
                        <p>{pelicula.overview}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}
