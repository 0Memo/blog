import NavbarComponent from './components/Navbar/NavbarComponent';
import FooterComponent from './components/Footer/FooterComponent';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './services/utils/NotFoundPage';
import HomePage from './pages/Home/HomePage';
import PrivateRoute from './services/utils/PrivateRoute';
import ArticlePage from './pages/Article/ArticlePageCopy';
import { ArticleInterface } from './services/interfaces/Article';
import BlogPage from './pages/Blog/BlogPage';
import { useEffect, useState } from 'react';
import InboxDetailPage from './components/Inbox/InboxDetailPage';

function App() {

  const [articles, setArticles] = useState<ArticleInterface[]>(() => {
    const storedValues = localStorage.getItem("articleItem"); 
    return storedValues ? JSON.parse(storedValues) : [];
  });

  useEffect(() => {
    localStorage.setItem("articleItem", JSON.stringify(articles));
  }, [articles])

  const storesArticles = () => {
    const storedValues = localStorage.getItem("articleItem");
    if(!storedValues) { 
      setArticles(articles)
      return articles; 
    }
  
      return JSON.parse(storedValues);
    }

    useEffect(() => { storesArticles()}, [])
    
    useEffect(() => {
      if(!articles) return;
      storesArticles();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articles])

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
      <FooterComponent />
    </>
  )
}

export default App
