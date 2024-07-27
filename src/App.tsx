import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/transactions" element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
