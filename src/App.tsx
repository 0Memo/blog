import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import NavbarComponent from './components/Navbar/NavbarComponent';
import FooterComponent from './components/Footer/FooterComponent';
import PrivateRoute from './services/utils/PrivateRoute';
import { ArticleInterface } from './services/interfaces/Article';

const NotFoundPage = lazy(() => import('./services/utils/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const ArticlePage = lazy(() => import('./pages/Article/ArticlePage'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const InboxDetailPage = lazy(() => import('./components/Inbox/InboxDetailPage'));
const BlogDetailPage = lazy(() => import('./pages/Blog/BlogDetailPage'));

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(() => localStorage.getItem('isAuth') === 'true');

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth));
  }, [isAuth]);

  const [articles, setArticles] = useState<ArticleInterface[]>(() => {
    const storedValues = localStorage.getItem('articleItem');
    return storedValues ? JSON.parse(storedValues) : [];
  });

  useEffect(() => {
    // Sync articles with localStorage
    localStorage.setItem('articleItem', JSON.stringify(articles));
  }, [articles]);

  function handleSubmitArticle(article: ArticleInterface): void {
    setArticles([...articles, article]);
  }

  return (
    <>
      {isAuth && <NavbarComponent />}
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage setIsAuth={setIsAuth} />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomePage isAuth={isAuth} />
              </Suspense>
            }
          />
          <Route
            path="/message/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InboxDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BlogPage articles={articles} />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BlogDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/article"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ArticlePage handleSubmitArticle={handleSubmitArticle} />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;