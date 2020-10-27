import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context as AuthContext } from "../../Context/AuthContext";

const LandingPage = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {
        tryLocalSignin(history);
    }, [tryLocalSignin, history]);

    return null;
};

export default LandingPage;
