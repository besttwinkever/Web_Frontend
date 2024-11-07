import { FC } from 'react'
import { Button } from 'react-bootstrap'

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
    inputClass?: string
}

const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск', inputClass='search' }) => {
    return (
        <div className="inputField">
            <input value={value} className={inputClass} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            <Button className='submit-btn' variant='outline-danger' disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
        </div>
    )
}

export default InputField