import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import LandingPage from './pages/LandingPage'
import Topbar from './components/layout/Topbar'
import Sidebar from './components/layout/Sidebar'
import RightRail from './components/layout/RightRail'
import FeedPage from './pages/FeedPage'
import MapPage from './pages/MapPage'
import GalleryPage from './pages/GalleryPage'
import MissionsPage from './pages/MissionsPage'
import ProfilePage from './pages/ProfilePage'
import { currentUser } from './data/users'

function App() {
  const [entered, setEntered] = useState(false) // false = landing, true = app
  const [active, setActive] = useState('Feed')

  const navigate = (label) => {
    const map = { 'Mapa Orbital': 'Mapa' }
    setActive(map[label] ?? label)
  }

  // landing é a primeira tela
  if (!entered) {
    return (
      <AppProvider>
        <LandingPage onEnter={() => setEntered(true)} />
      </AppProvider>
    )
  }

  const showRail = active === 'Feed'

  const renderPage = () => {
    switch (active) {
      case 'Mapa': return <MapPage />
      case 'Galeria': return <GalleryPage />
      case 'Missões': return <MissionsPage />
      case 'Perfil': return <ProfilePage user={currentUser} />
      case 'Feed':
      default: return <FeedPage />
    }
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-void text-white">
        <Topbar active={active} onNavigate={navigate} />
        <div className="mx-auto flex max-w-[1400px]">
          <Sidebar active={active} onNavigate={navigate} />
          <main className="min-w-0 flex-1 px-4 py-8 md:px-8">
            {renderPage()}
          </main>
          {showRail && <RightRail />}
        </div>
      </div>
    </AppProvider>
  )
}

export default App