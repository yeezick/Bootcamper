import './DoubleActionButton.scss';


export const DoubleActionButton = ({leftText, leftOnClick, leftType,rightText, rightOnClick, rightType }) => {
    return (
        <div className="double-button">
            <button className="left" onClick={leftOnClick} type={leftType} >{leftText}</button>
            <div className="separator">|</div>
            <button className="right" onClick={rightOnClick} type={rightType} value={rightText}>{rightText}</button>
        </div>
    )
}