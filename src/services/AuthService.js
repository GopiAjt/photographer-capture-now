import Api from '@/services/Api';

export default {
    handleLogin(email, password){
        return Api().get(`/photographer/Login?email=${email}&password=${password}`);
    },
    getAuthToken(email, password){
        return Api().get(`/photographer/authtoken?email=${email}&password=${password}`);
    },
    register(registerBody){
        return Api().post(`/photographer/signup`, registerBody,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};
