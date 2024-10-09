import { getCookie, setCookie } from 'cookies-next'
import { req } from './axios'
import { User } from '@/types/User'
import { Docs } from '@/types/Docs'

type UserData = {
  name: string
  email: string
}
const login = async (data: UserData): Promise<User | false> => {
  try {
    const json = await req.post('/user/signin', data)
    setCookie('token', json.data.token as string)
    return (json.data.user as User) ?? false
  } catch (err) {
    return false
  }
}

const createUser = async (data: UserData): Promise<User | false> => {
  const json = await req.post('/user/signup', data)
  return (json.data.user as User) ?? false
}

const getAllDocs = async (id: number): Promise<Docs[] | false> => {
  const token = getCookie('token')
  const json = await req.get(`/user/${id}/docs`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return (json.data.docs as Docs[]) ?? false
}

type AddDocData = {
  name: string
  status: boolean
}
const addDoc = async (id: number, data: AddDocData): Promise<Docs | false> => {
  const json = await req.post(`/user/${id}/doc`, data)
  return (json.data.doc as Docs) ?? false
}

const updateDocs = async (
  id: number,
  userId: number,
  data: AddDocData,
): Promise<Docs | false> => {
  const token = getCookie('token')
  const json = await req.put(`/user/${userId}/doc/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return (json.data.newDoc as Docs) ?? false
}

const deleteDocs = async (
  id: number,
  userId: number,
): Promise<true | false> => {
  const token = getCookie('token')
  const json = await req.delete(`/user/${userId}/doc/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return json.data.status ?? false
}

export { login, createUser, getAllDocs, addDoc, updateDocs, deleteDocs }
