import { SingleActionButton } from '../Button/SingleActionButton';
import './Modal.scss';

export const GenericModal = ({ setShowModal, bodyText, buttonText }) => {
    const handleModal = () => {
        setShowModal((state) => !state);
    };
    return (
        <div className="modal-background">
        <div className="modal-wrapper">
            <div className="modal-content">
            <p>{bodyText}</p>
            <SingleActionButton text={buttonText} onClick={handleModal} />
            </div>
        </div>
        </div>
    );
    };