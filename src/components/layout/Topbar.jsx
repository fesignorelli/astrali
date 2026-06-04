import { Plus } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { currentUser } from '../../data/users'

const navItems = ['Feed', 'Missões', 'Mapa', 'Galeria']

// Topbar — logo ASTRALIS, navegação central e ações à direita.
export default function Topbar({ active = 'Feed', onNavigate }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-6 border-b border-white/10 bg-void/80 px-6 py-4 backdrop-blur">
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

      <div className="ml-auto flex items-center gap-3">
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Transmitir
        </Button>
        <Avatar initials={currentUser.initials} type={currentUser.type} size="sm" />
      </div>
    </header>
  )
}