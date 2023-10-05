import logo from './../../assets/images/logo-footer.png';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import './lpFooter.css'

export default function lpFooter(){
    return(
        <>
            <div>
            <Link to="/">
                <img src={logo} alt="baanism-logo" className="logoStyle" />
            </Link>
            </div>
        </>
    );
}