'use client'

import { useState } from 'react'
import { InputField } from './Input'
import { Button } from './Button'
import { useRouter } from 'next/navigation'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { z } from 'zod'
import * as api from '@/api/site'

export const SignIn = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorItem[]>([])

  const userSchema = z.object({
    name: z.string().min(2, 'Preencha o nome'),
    email: z.string().email('Email invalido'),
  })

  const handleLogin = async () => {
    setErrors([])
    const data = userSchema.safeParse({ name, email })
    if (!data.success) return setErrors(getErrorFromZod(data.error))

    setLoading(true)
    const logged = await api.login({
      name,
      email,
    })
    setLoading(false)
    if (logged) {
      setName('')
      setEmail('')
      router.push(`/user/${logged.id}`)
    } else {
      alert('Deu erro')
    }
  }

  return (
    <div className="pr-6">
      <h1 className="mb-4 text-center text-xl text-gray-400">
        Já tem uma conta? <br /> Faça o login
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
          value={loading ? 'Logando...' : 'Login'}
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  )
}
