import { DoubleActionButton } from '../Button/DoubleActionButton';
import './Modal.scss';

export const DoubleActionModal = ({
  setShowModal,
  bodyText,
  leftText,
  leftOnClick,
  rightText,
  rightOnClick,
}) => {
  const handleModal = () => {
    setShowModal((state) => !state);
  };
  return (
    <div className="modal-background">
      <div className="modal-wrapper">
        <div className="modal-content">
          <p>{bodyText}</p>
          <DoubleActionButton
            leftText={leftText}
            leftOnClick={leftOnClick}
            rightText={rightText}
            rightOnClick={rightOnClick}
            onClick={handleModal}
          />
        </div>
      </div>
    </div>
  );
};
