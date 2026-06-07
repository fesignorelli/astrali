import { Rss, Globe2, Image, Rocket, User, Bell, Bookmark, X } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../context/AuthContext'
const sections = [
  {
    title: 'Principal',
    items: [
      { label: 'Feed', icon: Rss },
      { label: 'Mapa Orbital', icon: Globe2 },
      { label: 'Galeria', icon: Image },
      { label: 'Missões', icon: Rocket },
    ],
  },
  {
    title: 'Pessoal',
    items: [
      { label: 'Perfil', icon: User },
      { label: 'Alertas', icon: Bell },
      { label: 'Salvos', icon: Bookmark },
    ],
  },
]

export default function Sidebar({ active = 'Feed', onNavigate, open = false, onClose }) {
  const { user } = useAuth()

  const handleNavigate = (label) => {
    onNavigate?.(label)
    onClose?.()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
  className={`fixed left-0 top-20 bottom-0 z-40 flex w-90 flex-col gap-6 border-r border-white/10 bg-void p-4 transition-transform duration-300
    md:translate-x-0
    ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
  aria-hidden={!open ? undefined : false}
>
        <div className="flex items-center justify-between md:hidden">
          <span className="bg-astralis-gradient bg-clip-text font-display text-xl font-black text-transparent">
            ASTRALIS
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-6" aria-label="Menu lateral">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {section.title}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <button
                      onClick={() => handleNavigate(label)}
                      aria-current={active === label ? 'page' : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
                        ${active === label
                          ? 'bg-cosmos/15 text-cosmos'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {user && (
          <button
            onClick={() => handleNavigate('Perfil')}
            className=" flex items-center gap-3 rounded-xl border border-white/10 p-3 text-left transition hover:border-white/25 hover:bg-white/5"
          >
            <Avatar initials={user.initials} type={user.type} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="font-mono text-xs text-white/50">
                {user.type === 'orbital' ? 'Em órbita' : 'Terrestre'}
              </p>
            </div>
          </button>
        )}
      </aside>
    </>
  )
}