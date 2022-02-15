import './DoubleActionButton.scss';

export const DoubleActionButton = ({leftText, leftLinkTo, rightText, rightLinkTo }) => {
    return (
        <div className="double-button">
            <Link to={leftLinkTo}>{leftText}</Link>
            |
            <Link to={rightLinkTo}>{rightText}</Link>
        </div>
    )
}