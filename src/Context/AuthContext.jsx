import createDataContext from './createDataContext';
import uriShortyAPI from '../API/uriShortyAPI';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'add_success':
            return { ...state, successMessage: action.payload };
        case 'is_Loading':
            return { ...state, loading: true };
        case 'done_Loading':
            return { ...state, loading: false };
        case 'signin':
            const { token, email } = action.payload;
            return { errorMessage: '', successMessage: '', token, email, auth: 'login' };
        case 'clear_messages':
            return { ...state, errorMessage: '', successMessage: '' };
        case 'signout':
            return { token: null, email: null, errorMessage: '', successMessage: '', auth: 'login' };
        case 'login':
            return { errorMessage: '', successMessage: '', token: null, email: null, auth: action.payload };
        case 'signup':
            return { errorMessage: '', successMessage: '', token: null, email: null, auth: !state.auth };
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => (history) => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
        dispatch({ type: 'signin', payload: { token, email } });
        // navigate('TrackList');
        history.push("/dashboard");
    } else {
        // navigate('Signup');
        dispatch({ type: 'login', payload: true });
        history.push("/Auth");
    }
};

const clearMessage = dispatch => () => {
    dispatch({ type: 'clear_messages' });
};

const isLoading = dispatch => () => {
    dispatch({ type: 'is_Loading' });
}

const doneLoading = dispatch => () => {
    dispatch({ type: 'done_Loading' });
}


const switchToSignupPage = dispatch => () => {
    dispatch({ type: 'signup' });
}

const signup = dispatch => async ({ email, password }) => {
    try {
        const response = await uriShortyAPI.post('/signup', { email, password });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            dispatch({ type: 'signin', payload: { token: response.data.token, email } });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something Went Wrong or Already Signed Up!'
        });
    }
};

const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await uriShortyAPI.post('/signin', { email, password });
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);
            dispatch({ type: 'signin', payload: { token: response.data.token, email } });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! either invalid credentials or not verified'
        });
    }
};

const signout = dispatch => () => {
    localStorage.removeItem('token');
    dispatch({ type: 'signout' });
    // navigate('loginFlow');
};

const forgotPassword = dispatch => async ({ email }) => {
    try {
        const response = await uriShortyAPI.post('/forgotPassword', { email });
        dispatch({ type: 'is_Loading' });
        if (response.status === 200) {
            dispatch({ type: 'add_success', payload: 'Password Reset Link is sent to your Email, please note that the link will expire in 10 minutes' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! either invalid email or not verified'
        });
    }
};


const resetPassword = dispatch => async ({ email, password, token }) => {
    try {
        const response = await uriShortyAPI.post('/resetPassword', { email, password, token });
        dispatch({ type: 'is_Loading' });
        if (response.status === 200) {
            dispatch({ type: 'add_success', payload: 'Password Reset Successful' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! either link has expired or server error'
        });
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearMessage, tryLocalSignin, switchToSignupPage, forgotPassword, isLoading, doneLoading, resetPassword },
    { token: null, email: null, errorMessage: '', auth: true, successMessage: '', loading: false }
);
