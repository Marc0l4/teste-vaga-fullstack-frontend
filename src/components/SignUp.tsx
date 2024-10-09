'use client'

import { useState } from 'react'
import { InputField } from './Input'
import { Button } from './Button'
import * as api from '@/api/site'
import { z } from 'zod'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { useRouter } from 'next/navigation'

export const SignUp = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorItem[]>([])

  const userSchema = z.object({
    name: z.string().min(2, 'Preencha o nome'),
    email: z.string().email(),
  })

  const handleAddUser = async () => {
    setErrors([])
    const data = userSchema.safeParse({ name, email })
    if (!data.success) return setErrors(getErrorFromZod(data.error))

    setLoading(true)
    const newUser = await api.createUser({
      name,
      email,
    })
    setLoading(false)
    if (newUser) {
      setName('')
      setEmail('')
      router.push(`/user/${newUser.id}`)
    } else {
      alert('Deu erro')
    }
  }

  return (
    <div className="border-l border-gray-400 pl-6">
      <h1 className="mb-4 text-center text-xl text-gray-400">
        Não tem uma conta? <br /> Cadastre-se já
      </h1>
      <div className="flex flex-col rounded-md border bg-gray-700 px-6 py-2">
        <InputField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          errorMessage={errors.find((i) => i.field === 'name')?.message}
          disabled={loading}
        />
        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          errorMessage={errors.find((i) => i.field === 'email')?.message}
          disabled={loading}
        />
        <Button
          value={loading ? 'Adicionando...' : 'Adicionar'}
          onClick={handleAddUser}
          disabled={loading}
        />
      </div>
    </div>
  )
}
