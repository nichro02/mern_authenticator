import { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    //get token from local storage to determine if user is authenticated
    const history = useNavigate()

    const [quote, setQuote] = useState('')
    const [tempQuote, setTempQuote] = useState('')

    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-acess-token': localStorage.getItem('token'),
            },
        })
        const data = req.json()
        console.log(data)
        if(data.status === 'ok'){
            setQuote(data.quote)
        } else {
            setQuote('There was an issue with your quote')
        }
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
    
    async function updateQuote(event) {
        event.preventDefault()
        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-acess-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                quote: tempQuote
            })
        })
        const data = req.json()
        console.log('STATUS',data.status)
        if(data.status === 'ok'){
            setTempQuote('')
            setQuote(data.quote)
        } else {
            setQuote('There was an issue with your quote')
        }
    }

    return(
        <div>
            <h1>
            Your quote: {quote || 'No quote found'}
            </h1>
            <form onSubmit={updateQuote}>
                <input
                    type='text'
                    placeholder='Quote'
                    value={tempQuote}
                    setValue={e => setTempQuote(e.target.value)}
                />
                <input 
                    type = 'submit'
                    value = 'Update Quote'
                />
            </form>
        </div>
        
    )
}

export default Dashboard