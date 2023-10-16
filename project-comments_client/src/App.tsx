import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Comments } from './components/Comments'
import { Form } from './components/Form'
import { useEffect, useState } from 'react'
import { useSharedState } from './store/store'
import { Socket, io } from 'socket.io-client'
import { getComments } from './api/comments'

function App() {

  const [socket, setSocket] = useState<Socket>()
  const [state, setState] = useSharedState();
  const send = (value:string) => {
    socket?.emit('message', value);
  }

  useEffect(() => {
    const newSocket = io('wss://commentserver.onrender.com');
    setSocket(newSocket)
  }, [setSocket]);

  const fetchComments = async (query: string) => {
      const commentsFromServer = await getComments(query);
      if (typeof commentsFromServer === 'string') {
        return console.log(commentsFromServer);
      }

      if (commentsFromServer) {
        setState(prev => ({...prev, comments: commentsFromServer}))
      }
  }

  const commentListener = async() => {
     await fetchComments(`?sortBy=${state.sortBy}&order=${state.order}`);
  }

  useEffect(() => {
    socket?.on('message', commentListener);

    return () => {
      socket?.off('message', commentListener)
    }
  }, [commentListener])
  return (
    <>
      <Form send={send}/>
      <Comments />
    </>
  )
}

export default App
