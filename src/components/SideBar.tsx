import { useMemo, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ISideBarProps {
  selectedGenreId: number | null;
  click: Function
}

export function SideBar(props: ISideBarProps) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  
  useMemo(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    })
  }, [])

  // useEffect(() => {
  //   api.get<GenreResponseProps[]>('genres').then(response => {
  //     setGenres(response.data);
  //   });
  // }, []);

  return (
  <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.click(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
          <Button
            title="Favoritos"
            iconName="favorite"
            onClick={() => props.click(null)}
            selected={props.selectedGenreId === null}
          />
        </div>

      </nav>
  )
}