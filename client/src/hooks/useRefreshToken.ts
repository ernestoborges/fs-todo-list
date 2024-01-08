import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../providers/AuthProvider';

export function useRefreshToken() {

    const { setAccessToken, logout } = useAuth()
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.get('/api/user/refresh-token', {
                withCredentials: true
            });
            setAccessToken(response.data.accessToken)
            return response.data.accessToken;
        } catch (err) {
            logout()
            navigate("/login");
        }
    }
    return refresh;
};