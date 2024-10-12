import Api from '@/services/Api';

export default {
    handleLogin(email, password) {
        return Api().get(`/photographer/Login?email=${email}&password=${password}`);
    },
    getAuthToken(email, password) {
        return Api().get(`/photographer/authtoken?email=${email}&password=${password}`);
    },
    register(photographerRegistrationDTO) {
        return Api().post(`/photographer/signup`, photographerRegistrationDTO, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    fetchReviews(id, token) {
        return Api().get(`/photographer/getReviews?email=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    fetchAlbums(id, offset, pageSize, token){
        return Api().get(`/photographer/getAlbums?email=${id}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    fetchEquipments(id, offset, pageSize, token){
        return Api().get(`/photographer/getEquipment?email=${id}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },
    addAlbums(albumData, token){
        return Api().post(`/photographer/addAlbums`, albumData, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
    },
    addPackge(packageData, token){
        return Api().post(`/photographer/addPackage`, packageData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    deleteAlbum(photoId, token){
        return Api().delete(`/photographer/deletePhoto?id=${photoId}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    },
    deletePackage(packageId, token){
        return Api().delete(`/photographer/deletePackage?id=${packageId}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    }
};
