import { ItemButton } from '@/components/ItemButton'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import * as api from '@/api/site'
import { Docs } from '@/types/Docs'

type Props = {
  item: Docs
  refreshAction: () => void
  openModal: (item: Docs) => void
  id: number
}

export const DocsItem = ({ item, refreshAction, openModal, id }: Props) => {
  const handleDeletButton = async () => {
    if (confirm('Tem certeza que deseja excluir esse Documento?')) {
      const deletedDoc = await api.deleteDocs(item.id, id)
      if (deletedDoc) {
        refreshAction()
      } else {
        alert('Ocorreu um erro!')
      }
    }
  }

  const handleEditButton = () => openModal(item)

  return (
    <div className="m-3 flex flex-col items-center rounded-md border border-gray-800 p-3 md:flex-row">
      <div className="mx-4 w-full text-3xl md:text-2xl">
        {item.name.toUpperCase()}
      </div>
      <div className="mt-2 flex items-center md:mt-0">
        <ItemButton
          IconElement={FaRegEdit}
          label="editar"
          onClick={handleEditButton}
        />
        <ItemButton
          IconElement={FaRegTrashAlt}
          label="excluir"
          onClick={handleDeletButton}
        />
      </div>
    </div>
  )
}
