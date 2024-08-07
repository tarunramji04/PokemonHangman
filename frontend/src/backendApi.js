import axios from 'axios'

export async function createUser(username, password) {
    try {
        const response = await axios.post('http://localhost:5000/user/', {
            username,
            password,
        });
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function loginUser(username, password) {
    try {
        const response = await axios.post('http://localhost:5000/user/login', {
            username,
            password,
        });
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function getUserData(token) {
    try {
        const response = await axios.get('http://localhost:5000/user/info', 
            {headers: {'Authorization': `Bearer ${token}`}});
        return response.data;
    // axios treats 400s (unauthorized 401 from authenticateToken middleware) as an error
    // so return null in the catch block. In this way, the logic in fetchUserData (gets called
    // when the page loads if there is a token in local storage) will delete the token and make the
    // user log in normally if this function returns null 
    } catch (error) {
        return null;
    }
}

export async function updateGuessed(token, id) {
    try {
        const response = await axios.put('http://localhost:5000/user/update',
            {id},
            {headers: {'Authorization': `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        return null;
    }
}
