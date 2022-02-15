import { Link } from 'react-router-dom';
import './SingleActionButton.scss'

export const SingleActionButton = ({text,linkTo}) => {
    return (
        <Link to={linkTo}><button className="single-button">{text}</button></Link>
    )
}