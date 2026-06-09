import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Hero from './components/Hero.jsx';
import LatestStories from './components/LatestStories.jsx';
import UpcomingItinerary from './components/UpcomingItinerary.jsx';
import Footer from './components/Footer.jsx';
import ArticlesPage from './pages/ArticlesPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminListPage from './pages/AdminListPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider, useAuth } from './auth.jsx';

const API = import.meta.env.VITE_API_URL || '/api';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

function HomePage() {
  const [settings, setSettings] = useState({
    current_location: 'Dallol, Ethiopia',
    latitude: '14.2417° N',
    longitude: '40.3169° E',
  });
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [latestArticles, setLatestArticles] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    fetch(`${API}/settings`).then(r => r.json()).then(d => { if (d?.current_location) setSettings(d); }).catch(() => {});
    fetch(`${API}/articles/featured`).then(r => r.json()).then(d => { if (d) setFeaturedArticle(d); }).catch(() => {});
    fetch(`${API}/articles/latest`).then(r => r.json()).then(d => { if (Array.isArray(d)) setLatestArticles(d); }).catch(() => {});
    fetch(`${API}/itinerary`).then(r => r.json()).then(d => { if (Array.isArray(d)) setItinerary(d); }).catch(() => {});
  }, []);

  return (
    <>
      <Hero article={featuredArticle} />
      <LatestStories articles={latestArticles} />
      <UpcomingItinerary items={itinerary} />
      <Footer />
    </>
  );
}

function Layout() {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/admin');

  const [settings] = useState({
    current_location: 'Dallol, Ethiopia',
    latitude: '14.2417° N',
    longitude: '40.3169° E',
  });

  if (isAdminArea) {
    return (
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminListPage /></ProtectedRoute>} />
        <Route path="/admin/new" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar settings={settings} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
