import { FC } from 'react'
import { Button } from 'react-bootstrap'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    onClear: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
    inputClass?: string
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, onClear, loading, placeholder, buttonTitle = 'Поиск', inputClass='search' }) => {
    return (
        <div className="inputField">
            <input value={value} className={inputClass} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            <Button className='submit-btn' variant='outline-danger' disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
            <Button className='clear-btn' variant='outline-danger' disabled={value.length == 0} onClick={onClear}>X</Button>
        </div>
    )
}

export default InputField