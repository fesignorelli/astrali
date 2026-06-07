import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { Rocket, Globe2 } from 'lucide-react'

// AuthPage — login + cadastro num só lugar, alternando por aba.
export default function AuthPage({ onAuthed }) {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState('signup') // 'signup' | 'login'
  const [form, setForm] = useState({ name: '', email: '', password: '', type: 'orbital' })
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = () => {
    setError('')
    if (mode === 'signup') {
      if (!form.name.trim() || !form.email.trim() || !form.password) {
        return setError('Preencha todos os campos.')
      }
      const res = signup(form)
      if (!res.ok) return setError(res.error)
    } else {
      if (!form.email.trim() || !form.password) {
        return setError('Informe e-mail e senha.')
      }
      const res = login({ email: form.email, password: form.password })
      if (!res.ok) return setError(res.error)
    }
    onAuthed?.()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 text-white">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          ASTRALIS
        </h1>
        <p className="mb-8 text-center text-sm text-white/50">
          onde o espaço encontra a Terra — em tempo real
        </p>

        <Card className="p-6">
          {/* abas */}
          <div className="mb-6 flex rounded-xl border border-white/10 p-1">
            {['signup', 'login'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition
                  ${mode === m ? 'bg-cosmos/20 text-cosmos' : 'text-white/50 hover:text-white'}`}
              >
                {m === 'signup' ? 'Criar conta' : 'Entrar'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'signup' && (
              <Field label="Nome" value={form.name} onChange={set('name')} placeholder="Como quer ser chamado?" />
            )}
            <Field label="E-mail" type="email" value={form.email} onChange={set('email')} placeholder="voce@astralis.space" />
            <Field label="Senha" type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />

            {/* escolha de tipo (só no cadastro) */}
            {mode === 'signup' && (
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Você é
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <TypeOption
                    active={form.type === 'orbital'}
                    onClick={() => setForm((f) => ({ ...f, type: 'orbital' }))}
                    icon={Rocket} label="Astronauta" sub="Em órbita" color="cosmos"
                  />
                  <TypeOption
                    active={form.type === 'terrestrial'}
                    onClick={() => setForm((f) => ({ ...f, type: 'terrestrial' }))}
                    icon={Globe2} label="Terráqueo" sub="Na Terra" color="terra"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-reentry/10 px-3 py-2 text-sm text-reentry" role="alert">
                {error}
              </p>
            )}

            <Button variant="primary" size="lg" className="w-full" onClick={submit}>
              {mode === 'signup' ? 'Criar conta e explorar' : 'Entrar'}
            </Button>
          </div>
        </Card>

        <p className="mt-4 text-center font-mono text-[10px] text-white/30">
          Demo acadêmica — dados salvos localmente no seu navegador.
        </p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/15 bg-nebula/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30
          focus:border-cosmos/50 focus:outline-none focus:ring-2 focus:ring-cosmos/30"
      />
    </div>
  )
}

function TypeOption({ active, onClick, icon: Icon, label, sub, color }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center gap-1 rounded-xl border p-4 transition
        ${active
          ? `border-${color} bg-${color}/15`
          : 'border-white/15 hover:border-white/30'}`}
    >
      <Icon className={`h-6 w-6 ${active ? `text-${color}` : 'text-white/60'}`} aria-hidden="true" />
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="font-mono text-[10px] text-white/40">{sub}</span>
    </button>
  )
}