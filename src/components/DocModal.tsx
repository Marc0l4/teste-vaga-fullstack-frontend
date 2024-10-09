import { ChangeEvent } from 'react'
import { Button } from './Button'
import { InputField } from './Input'

type Props = {
  valueName: string
  valueButton: string
  checked: boolean
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeStatus: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => Promise<void>
  disabled: boolean
  placeholder: string
}

export const DocModal = ({
  valueName,
  valueButton,
  checked,
  onChangeName,
  onChangeStatus,
  onClick,
  disabled,
  placeholder,
}: Props) => {
  return (
    <div className="">
      <InputField
        value={valueName}
        onChange={onChangeName}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className="mb-5">
        <h4 className="text-xl">Este documento esta disponivel?</h4>
        <input
          checked={checked}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={onChangeStatus}
          type="checkbox"
          className="mt-3 block h-5 w-5"
        />
      </label>
      <Button value={valueButton} onClick={onClick} />
    </div>
  )
}
