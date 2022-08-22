import { useSelector, useDispatch } from 'react-redux';
import { reset, rotateCamera, resetCamera } from '../actions';

function HomeNav(props) {

    const dispatch = useDispatch();


    return (
            <ul className="homeBtn--wrapper">

                <li className="backBtn" onClick={() => {
                    dispatch(rotateCamera());
                    dispatch(reset());
                    props.setPage(`Home`); 
                    
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fa-solid fa-arrow-left-long" style={{color: 'white'}}></i></a> 
                    {/* <i className="fas fa-house homeIcon" style={{color: 'white'}}></i>*/}  
                </li>

                <li className="homeBtn" onClick={() => {
                    dispatch(reset());
                    props.setPage(`Home`); 
                    
                }}>
                    <a href="#" className="homeBtn--icon"><i className="fas fa-house homeIcon" style={{color: 'white'}}></i></a>
                </li>
            </ul>
    )
}

export default HomeNav;