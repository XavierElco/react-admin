export default function Login() {
    const handleClick = () => {
        request
            .post('./login', {username: 'admin', password: '123456'})
            .then(res => {
                const {Authorization, userName, userId, roleId} = res.data
            })
            .catch(error => {
                console.log(error)
            })
    }
}