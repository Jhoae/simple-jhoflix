import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:id" element={<Home />} />
          {/* // home */}
        </Route>
        <Route path="/tv" element={<Tv />}></Route> {/* // tvshow */}
        <Route path="/search" element={<Search />}></Route> {/* // search */}
      </Routes>
    </Router>
  );
}

export default App;
