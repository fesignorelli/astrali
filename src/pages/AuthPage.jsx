import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { Rocket, Globe2 } from 'lucide-react'

export default function AuthPage({ onAuthed }) {
  const { login, signup } = useAuth()

  const [mode, setMode] = useState('signup')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    type: 'orbital',
  })
  const [error, setError] = useState('')

  const set = (key) => (e) => {
    const value = e.target.value

    setForm((current) => ({
      ...current,
      [key]: key === 'email' ? value.trim().toLowerCase() : value,
    }))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validateName = (name) => {
    return name.trim().length >= 2
  }

  const validateForm = () => {
    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()
    const password = form.password

    if (mode === 'signup') {
      if (!name || !email || !password) {
        return 'Preencha todos os campos.'
      }

      if (!validateName(name)) {
        return 'O nome precisa ter pelo menos 2 caracteres.'
      }
    }

    if (!email || !password) {
      return 'Informe e-mail e senha.'
    }

    if (!validateEmail(email)) {
      return 'Digite um e-mail válido. Exemplo: voce@email.com'
    }

    if (!validatePassword(password)) {
      return 'A senha precisa ter pelo menos 6 caracteres.'
    }

    return ''
  }

  const submit = (e) => {
    e?.preventDefault()
    setError('')

    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    }

    if (mode === 'signup') {
      const res = signup(payload)
      if (!res.ok) {
        setError(res.error)
        return
      }
    } else {
      const res = login({
        email: payload.email,
        password: payload.password,
      })

      if (!res.ok) {
        setError(res.error)
        return
      }
    }

    onAuthed?.()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4 text-white">
      <div className="w-full max-w-md">
        <div className="mb-2 flex justify-center">
          <img src="/astralis-logo.png" alt="ASTRALIS" className="h-20 w-auto" />
        </div>

        <p className="mb-8 text-center text-sm text-white/50">
          Onde o espaço encontra a Terra em tempo real.
        </p>

        <Card className="p-6">
          <div className="mb-6 flex rounded-xl border border-white/10 p-1">
            {['signup', 'login'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m)
                  setError('')
                }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition
                  ${mode === m ? 'bg-cosmos/20 text-cosmos' : 'text-white/50 hover:text-white'}`}
              >
                {m === 'signup' ? 'Criar conta' : 'Entrar'}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={submit}>
            {mode === 'signup' && (
              <Field
                label="Nome"
                value={form.name}
                onChange={set('name')}
                placeholder="Como quer ser chamado?"
                autoComplete="name"
              />
            )}

            <Field
              label="E-mail"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="voce@astralis.space"
              autoComplete="email"
            />

            <Field
              label="Senha"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="Mínimo 6 caracteres"
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            />

            {mode === 'signup' && (
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Você é
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <TypeOption
                    active={form.type === 'orbital'}
                    onClick={() => setForm((f) => ({ ...f, type: 'orbital' }))}
                    icon={Rocket}
                    label="Astronauta"
                    sub="Em órbita"
                    color="cosmos"
                  />

                  <TypeOption
                    active={form.type === 'terrestrial'}
                    onClick={() => setForm((f) => ({ ...f, type: 'terrestrial' }))}
                    icon={Globe2}
                    label="Terráqueo"
                    sub="Na Terra"
                    color="terra"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-reentry/10 px-3 py-2 text-sm text-reentry" role="alert">
                {error}
              </p>
            )}

            <Button variant="primary" size="lg" className="w-full" type="submit">
              {mode === 'signup' ? 'Criar conta e explorar' : 'Entrar'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
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
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-white/15 bg-nebula/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30
          focus:border-cosmos/50 focus:outline-none focus:ring-2 focus:ring-cosmos/30"
      />
    </div>
  )
}

function TypeOption({ active, onClick, icon: Icon, label, sub, color }) {
  const activeClasses = {
    cosmos: 'border-cosmos bg-cosmos/15',
    terra: 'border-terra bg-terra/15',
  }

  const iconClasses = {
    cosmos: 'text-cosmos',
    terra: 'text-terra',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center gap-1 rounded-xl border p-4 transition
        ${active ? activeClasses[color] : 'border-white/15 hover:border-white/30'}`}
    >
      <Icon
        className={`h-6 w-6 ${active ? iconClasses[color] : 'text-white/60'}`}
        aria-hidden="true"
      />

      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="font-mono text-[10px] text-white/40">{sub}</span>
    </button>
  )
}
