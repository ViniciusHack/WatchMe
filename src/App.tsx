import { useCallback, useState } from 'react';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import './styles/content.scss';
import './styles/global.scss';
import './styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);


  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar selectedGenreId={selectedGenreId} click={handleClickButton}/>

      <Content selectedGenreId={selectedGenreId} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>
    </div>
  )
}