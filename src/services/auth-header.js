export default function authHeader() {
    let user = localStorage.getItem('token');
    if (user) {
        return { Authorization: user };
    } else {
        return {};
    }
}