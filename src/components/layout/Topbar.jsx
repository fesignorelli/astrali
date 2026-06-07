import { Plus, Menu, LogOut } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

const navItems = ['Feed', 'Missões', 'Mapa', 'Galeria']

export default function Topbar({ active = 'Feed', onNavigate, onMenu }) {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-white/10 bg-void/80 px-4 py-4 backdrop-blur md:gap-6 md:px-6">
      <button
        onClick={onMenu}
        aria-label="Abrir menu"
        className="grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <span className="bg-astralis-gradient bg-clip-text font-display text-2xl font-black tracking-tight text-transparent">
        ASTRALIS
      </span>

      <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate?.(item)}
            aria-current={active === item ? 'page' : undefined}
            className={`rounded-full px-4 py-1.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
              ${active === item ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <Button variant="primary" size="sm" onClick={() => onNavigate?.('Feed')}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Transmitir</span>
        </Button>
        {user && (
          <>
            <button
              onClick={() => onNavigate?.('Perfil')}
              aria-label="Ver meu perfil"
              className="rounded-full transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos"
            >
              <Avatar initials={user.initials} type={user.type} size="sm" />
            </button>
            <button
              onClick={logout}
              aria-label="Sair"
              className="grid h-9 w-9 place-items-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </header>
  )
}