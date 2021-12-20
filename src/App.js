import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Characters from './components/Routes/Characters/Characters';
import Locations from './components/Routes/Locations/Locations';
import Episodes from './components/Routes/Episodes/Episodes';
import SingleEpisode from './components/Routes/SingleCards/SingleEpisode';
import SingleCharacter from './components/Routes/SingleCards/SingleCharacter';
import Welcome from './components/Welcome';
import ErrorComponent from './components/Error';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />

        <Route path="/episode/:id" element={<SingleEpisode />} />
        <Route path="/character/:id" element={<SingleCharacter />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </div>
  );
}

export default App;
