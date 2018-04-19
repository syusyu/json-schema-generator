export function user(id) {
    return fetch(`http://localhost:3000/users/${id}`)
        .then(res => res.json())
        .then(payload => { payload })
        .catch(error => { error });
}