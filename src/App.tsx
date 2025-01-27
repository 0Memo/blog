import { Route, Routes, useLocation } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect, createContext, useContext } from 'react';
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

// Context for authentication
const AuthContext = createContext<{ isAuth: boolean; setIsAuth: (value: boolean) => void } | null>(null);

// Hook to use authentication context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthContextProvider');
  return context;
};

console.log('useAuth', useAuth);

function App() {
  const location = useLocation(); // Tracks the current route

  // Authentication State and Synchronization
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuth', String(isAuth));
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
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {isAuth && <NavbarComponent currentPath={location.pathname} />}
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
    </AuthContext.Provider>
  );
}

export default App;