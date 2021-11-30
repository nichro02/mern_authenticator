import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    //get token from local storage to determine if user is authenticated
    const history = useNavigate()
    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-acess-token': localStorage.getItem('token'),
            },
        })
        const data = req.json()
        console.log(data)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt.decode(token)
            if(!user) {
                localStorage.removeItem('token')
                //window.location.href = '/login'
                history.replace('/login')
            } else {
                populateQuote()
            }
        }
    }, [])
    
    return(
        <h1>
            Hello world
        </h1>
    )
}

export default Dashboard