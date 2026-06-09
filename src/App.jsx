import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppProvider, useApp } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Topbar from './components/layout/Topbar'
import Sidebar from './components/layout/Sidebar'
import RightRail from './components/layout/RightRail'
import GameToast from './components/ui/GameToast'
import StarField from './components/ui/StarField'
import Astra from './components/ui/Astra'
import FeedPage from './pages/FeedPage'
import MapPage from './pages/MapPage'
import GalleryPage from './pages/GalleryPage'
import MissionsPage from './pages/MissionsPage'
import ProfilePage from './pages/ProfilePage'
import AlertsPage from './pages/AlertsPage'
import SavedPage from './pages/SavedPage'

function Shell() {
  const { user, ready } = useAuth()
  const [stage, setStage] = useState('landing')
  const [active, setActive] = useState('Feed')
  const [menuOpen, setMenuOpen] = useState(false)

  if (!ready) return <div className="min-h-screen" />

  if (!user) {
    if (stage === 'landing') return <LandingPage onEnter={() => setStage('auth')} />
    return <AuthPage onAuthed={() => setActive('Feed')} />
  }

  const navigate = (label) => {
    const map = { 'Mapa Orbital': 'Mapa' }
    setActive(map[label] ?? label)
  }
  const showRail = active === 'Feed'

  const renderPage = () => {
    switch (active) {
      case 'Mapa':
        return <MapPage />
      case 'Galeria':
        return <GalleryPage />
      case 'Missões':
        return <MissionsPage />
      case 'Perfil':
        return <ProfilePage user={user} />
      case 'Alertas':
        return <AlertsPage />
      case 'Salvos':
        return <SavedPage />
      default:
        return <FeedPage />
    }
  }

  return (
    <AppWithToasts>
      <div className="relative z-10 min-h-screen text-white">
        <div className="fixed left-0 top-0 z-50 w-full">
          <Topbar active={active} onNavigate={navigate} onMenu={() => setMenuOpen(true)} />
        </div>

        <div className="flex pt-20">
          <Sidebar
            active={active}
            onNavigate={navigate}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />

          <main className="min-w-0 flex-1 px-4 py-8 md:ml-[22.5rem] md:px-8">{renderPage()}</main>

          {showRail && <RightRail />}
        </div>
      </div>
      <Astra onNavigate={navigate} />
    </AppWithToasts>
  )
}r

function AppWithToasts({ children }) {
  return (
    <>
      {children}
      <ToastLayer />
    </>
  )
}

function ToastLayer() {
  const { toasts, dismissToast } = useApp()
  return <GameToast toasts={toasts} onDismiss={dismissToast} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <StarField />
        <Shell />
      </AppProvider>
    </AuthProvider>
  )
}
