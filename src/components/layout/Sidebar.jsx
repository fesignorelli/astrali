import { Rss, Globe2, Image, Rocket, User, Bell, Bookmark } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { currentUser } from '../../data/users'

// Sidebar — navegação lateral. Seções "Principal" e "Pessoal" + perfil no rodapé.
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

export default function Sidebar({ active = 'Feed', onNavigate }) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col gap-6 border-r border-white/10 p-4">
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
                    onClick={() => onNavigate?.(label)}
                    aria-current={active === label ? 'page' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
                      ${active === label
                        ? 'bg-cosmos/15 text-cosmos'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* perfil no rodapé */}
      <div className="mt-auto flex items-center gap-3 rounded-xl border border-white/10 p-3">
        <Avatar initials={currentUser.initials} type={currentUser.type} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{currentUser.name}</p>
          <p className="font-mono text-xs text-white/50">Terrestre · SP</p>
        </div>
      </div>
    </aside>
  )
}