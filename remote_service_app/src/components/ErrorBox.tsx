import { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
    visible: boolean,
    onClose: () => void,
    message: string
}

const ErrorBox: FC<Props> = ({visible, message, onClose}) => {
    return (
        <Modal show={visible} centered>
            <Modal.Header>
                <Modal.Title>Ошибка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onClose}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ErrorBox