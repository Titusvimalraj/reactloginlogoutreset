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
        case 'clear_messages':
            return { ...state, errorMessage: '', successMessage: '' };
        case 'update_dashboard_urls':
            return { ...state, dashboardurls: action.payload };
        case 'urls_list':
            return { ...state, urlsList: action.payload };
        case 'add_url':
            return { ...state, urlsList: [...state.urlsList, action.payload] };
        case 'delete_url':
            const urlId = action.payload;
            const urlsList = [...state.urlsList].filter(url => url.urlId !== urlId);
            return { ...state, urlsList };
        default:
            return state;
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

const updateDashboard = dispatch => async () => {
    try {
        dispatch({ type: 'is_Loading' });
        const response = await uriShortyAPI.get('/url/dashboard');
        if (response.status === 200) {

            dispatch({ type: 'update_dashboard_urls', payload: response.data });

            dispatch({ type: 'done_Loading' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'done_Loading' });
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! '
        });
    }
};

const updateUrlsList = dispatch => async () => {
    try {
        dispatch({ type: 'is_Loading' });
        const response = await uriShortyAPI.get('/urls');
        if (response.status === 200) {

            dispatch({ type: 'urls_list', payload: response.data });

            dispatch({ type: 'done_Loading' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'done_Loading' });
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! '
        });
    }
};

const addUrl = dispatch => async ({ url }) => {
    try {
        dispatch({ type: 'is_Loading' });
        const response = await uriShortyAPI.post('/urls', { url });
        if (response.status === 200) {
            if (response.data) {
                dispatch({ type: 'add_url', payload: response.data });
                dispatch({ type: 'add_success', payload: `Created Short url for ${url}` });
            } else {
                throw new Error(response);
            }
            dispatch({ type: 'done_Loading' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'done_Loading' });
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! '
        });
    }
};

const deleteUrl = dispatch => async ({ urlId }) => {
    try {
        dispatch({ type: 'is_Loading' });
        const response = await uriShortyAPI.delete(`/${urlId}`);
        if (response.status === 200) {
            if (response.data) {
                dispatch({ type: 'delete_url', payload: urlId });
            } else {
                throw new Error(response);
            }
            dispatch({ type: 'done_Loading' });
        } else {
            throw new Error(response);
        }
        // navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'done_Loading' });
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong! '
        });
    }
};


export const { Provider, Context } = createDataContext(
    authReducer,
    { clearMessage, isLoading, doneLoading, updateDashboard, updateUrlsList, addUrl, deleteUrl },
    { errorMessage: '', successMessage: '', loading: false, dashboardurls: [], urlsList: [] }
);
