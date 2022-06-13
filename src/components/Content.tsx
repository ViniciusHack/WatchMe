import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  isFavorite: boolean;
}


interface IContentProps {
  selectedGenre: GenreResponseProps,
  selectedGenreId: number | null,
  setSelectedGenre: Function
}

export function Content({ selectedGenre, selectedGenreId, setSelectedGenre }: IContentProps) {
  
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    if(selectedGenreId !== null) {
      api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
        setMovies(response.data.map(movie => {
          movie.isFavorite = false;
          return movie;
        }));
      });
  
      api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
      })
    } else [
      setMovies(movies.filter(movie => movie.isFavorite))
    ]
  }, [selectedGenreId]);

  const handleFavorite = (id: string) => {
    setMovies(
      movies.map(movie => {
        if(movie.imdbID === id) {
          movie.isFavorite = !movie.isFavorite;
        }
        return movie
      })
    )
  }

  return (
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard 
                key ={movie.imdbID} 
                title={movie.Title} 
                poster={movie.Poster} 
                runtime={movie.Runtime} 
                rating={movie.Ratings[0].Value}
                id={movie.imdbID}
                isFavorite={movie.isFavorite}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        </main>
      </div>
  )
}