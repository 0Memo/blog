import './App.css'
import NavbarComponent from './components/Navbar/NavbarComponent';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './services/utils/NotFoundPage';
import HomePage from './pages/Home/HomePage';
import PrivateRoute from './services/utils/PrivateRoute';
import ArticlePage from './pages/Article/ArticlePageCopy';
import { ArticleInterface } from './services/interfaces/Article';
import BlogPage from './pages/Blog/BlogPage';
import { useState } from 'react';
import InboxDetailPage from './components/Inbox/InboxDetailPage';

function App() {

  const [articles, setArticles] = useState<ArticleInterface[]>([]);

  function handleSubmitArticle(article:ArticleInterface):void{
    setArticles([ ...articles,  article]);
  }

  return (
    <>
      <NavbarComponent />
        <Routes>
            <Route path="/" element={ <HomePage articles={articles} /> } />

              <Route element={ <PrivateRoute /> }>

                <Route path='/message/:id' element={ <InboxDetailPage /> } />
                <Route path='/blog' element={ <BlogPage articles={articles} /> } />
                <Route path='/article' element={ <ArticlePage handleSubmitArticle={handleSubmitArticle} /> } />

              </Route>

            <Route path="*" element= { <NotFoundPage />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
