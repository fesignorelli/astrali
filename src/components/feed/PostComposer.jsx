import { useState } from 'react'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { currentUser } from '../../data/users'

export default function PostComposer({ onTransmit }) {
  const [text, setText] = useState('')

  const handleTransmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onTransmit?.(trimmed)
    setText('')
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar initials={currentUser.initials} type={currentUser.type} />
        <label htmlFor="composer" className="sr-only">
          Registre algo do seu ponto de vista
        </label>
        <input
          id="composer"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTransmit()}
          placeholder="Registre algo do seu ponto de vista..."
          className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
        />
        <Button variant="primary" onClick={handleTransmit} disabled={!text.trim()}>
          Transmitir
        </Button>
      </div>
    </Card>
  )
}
