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
  // Load isAuth from localStorage on initialization
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuth');
    return storedAuth === 'true'; // Ensures boolean conversion
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication validation (you can replace this with an API call)
    const storedAuth = localStorage.getItem('isAuth') === 'true';
    setIsAuth(storedAuth);
    setIsLoading(false);
  }, []);

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

  // Show a loading spinner while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuth && <NavbarComponent />}
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
              <LoginPage setIsAuth={setIsAuth} />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
                <HomePage isAuth={isAuth} />
              </Suspense>
            }
          />
          <Route
            path="/message/:id"
            element={
              <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
                <InboxDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
                <BlogDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/article"
            element={
              <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
                <ArticlePage handleSubmitArticle={handleSubmitArticle} />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div className="italic text-3xl ml-10 font-h1">Loading...</div>}>
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