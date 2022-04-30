import { SingleActionButton } from '../Button/SingleActionButton';

export const Modal = ({ setShowModal }) => {
  const handleModal = () => {
    setShowModal((state) => !state);
  };
  return (
    <div className="modal-background">
      <div className="modal-wrapper">
        <div className="modal-content">
          <p>Would you like to finish setting up your account?</p>
          <SingleActionButton text="Finish Account" onClick={handleModal} />
        </div>
      </div>
    </div>
  );
};
