import { Clock, Heart, Star } from 'react-feather';
import '../styles/movie-card.scss';


interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: string;
  runtime: string;
  isFavorite: boolean;
  onFavorite: (movieId: string) => void;
}

export function MovieCard(props: MovieCardProps) {
  
  return (
    <div className="movie-card">
      <img
        src={props.poster}
        alt={props.title}
      />
      
      <div>
        <div className="movie-info">

        <div className="favorite" onClick={() => props.onFavorite(props.id)}>
          <Heart color={props.isFavorite ? "var(--red)" : "var(--yellow)"}/>
        </div>

          <span>{props.title}</span>
          <div className="meta">
            <div>
              <Star /> {props.rating}
            </div>

            <div>
              <Clock /> {props.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}