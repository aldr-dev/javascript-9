import {Route, Routes} from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/categories/:id/edit" element={<Categories/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
};

export default App;