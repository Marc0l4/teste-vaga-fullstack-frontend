'use client'

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useEffect, useState } from 'react'
import * as api from '@/api/site'
import { Docs } from '@/types/Docs'
import { DocsItem } from '@/components/DocsItem'
import { useParams } from 'next/navigation'
import { DocModal } from '@/components/DocModal'

const Page = () => {
  const params = useParams()

  const [haveDocs, setHaveDocs] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [docName, setDocName] = useState('')
  const [docStatus, setDocStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [docs, setDocs] = useState<Docs[]>([])
  const [selectedDoc, setSelectedDoc] = useState<Docs>()

  const id: string = params.id

  const loadDocs = async () => {
    const userDocs = await api.getAllDocs(parseInt(id))
    if (userDocs) {
      setDocs(userDocs)
      if (userDocs.length >= 1) setHaveDocs(true)
    } else {
      alert('Ocorreu um erro')
    }
  }

  useEffect(() => {
    loadDocs()
  }, [])

  const handleOpenModal = () => {
    setModal(true)
    setModalAdd(true)
  }

  const handleOpenModalEdit = (doc: Docs) => {
    setModalEdit(true)
    setSelectedDoc(doc)
    setModal(true)
  }

  const handleEditDoc = async () => {
    if (selectedDoc) {
      setLoading(true)
      const updatedDoc = await api.updateDocs(selectedDoc.id, parseInt(id), {
        name: docName,
        status: docStatus,
      })
      setLoading(false)
      if (updatedDoc) {
        loadDocs()
        setDocName('')
        setDocStatus(false)
        setModal(false)
      } else {
        alert('Ocorreu um erro')
      }
    }
  }

  const handleAddDoc = async () => {
    setLoading(true)
    const newDoc = await api.addDoc(parseInt(id), {
      name: docName,
      status: docStatus,
    })
    setLoading(false)
    if (newDoc) {
      loadDocs()
      setDocName('')
      setDocStatus(false)
      setModal(false)
    } else {
      alert('Ocorreu um erro')
    }
  }

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <h1 className="mb-10 text-3xl">Seus Documentos</h1>
      <div className="rounded-md border border-dashed border-gray-400 p-4">
        <div className="">
          <Button value="Adicionar Documento" onClick={handleOpenModal} />
        </div>
        {!haveDocs && (
          <div className="">
            <h1 className="my-5">
              Parece que você ainda não tem nenhum documento
            </h1>
          </div>
        )}
        {haveDocs &&
          docs.map((i) => (
            <div key={i.id} className="">
              <DocsItem
                item={i}
                refreshAction={loadDocs}
                openModal={(i) => handleOpenModalEdit(i)}
                id={parseInt(id)}
              />
            </div>
          ))}
        {modal && (
          <>
            {modalEdit && (
              <Modal onClose={() => setModal(false)}>
                <DocModal
                  checked={docStatus}
                  disabled={loading}
                  onChangeName={(e) => setDocName(e.target.value)}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onChangeStatus={(e) => setDocStatus(!docStatus)}
                  onClick={handleEditDoc}
                  placeholder="Digite o nome do documento"
                  valueButton={loading ? 'Adicionando...' : 'Adicionar'}
                  valueName={docName}
                />
              </Modal>
            )}
            {modalAdd && (
              <Modal onClose={() => setModal(false)}>
                <DocModal
                  checked={docStatus}
                  disabled={loading}
                  onChangeName={(e) => setDocName(e.target.value)}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onChangeStatus={(e) => setDocStatus(!docStatus)}
                  onClick={handleAddDoc}
                  placeholder="Digite o nome do documento"
                  valueButton={loading ? 'Adicionando...' : 'Adicionar'}
                  valueName={docName}
                />
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Page
