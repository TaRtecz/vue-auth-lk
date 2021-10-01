export default function authHeader() {
    let user = localStorage.getItem('token');
    if (user) {
        return { Authorization: user }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return {};
    }
}