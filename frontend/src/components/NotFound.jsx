import { useNavigate } from 'react-router';


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
           <h1>404 Not Found</h1>
           <button onClick={() => navigate('/login')}>Go to login</button>
        </div>
    );
};

export default NotFound;