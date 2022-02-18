import './SingleActionButton.scss'

export const SingleActionButton = ({text, onClick, type}) => {
    return (
        <div className="single-button">
            <button onClick={onClick} type={type} >{text}</button>
        </div>

    )
}