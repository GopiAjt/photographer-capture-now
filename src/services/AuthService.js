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
    validateOtp(emailId, otp){
        return Api().get(`/photographer/validate?email=${emailId}&otp=${otp}`);
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
    },
    getBookings(id, token){
        return Api().get(`/photographer/getBookingStatus?emailId=${id}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    },
    declineBooking(bookigId, token){
        return Api().delete(`/photographer/acceptDeclineBooking?status=${false}&bookingId=${bookigId}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    },
    acceptBooking(bookigId, token){
        return Api().delete(`/photographer/acceptDeclineBooking?status=${true}&bookingId=${bookigId}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    },
    updateProfileInfo(photographer, token){
        return Api().put(`/photographer/updateProfileInfo`, photographer, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    },
    sendForgotPasswordOtp(emailId){
        return Api().post(`/photographer/forgotPasswordOtp?emailId=${emailId}`)
    },
    forgotPassword(emailId, newPass, otp){
        return Api().post(`/photographer/forgotPassword?emailId=${emailId}&newPassword=${newPass}&otp=${otp}`)
    }
};
