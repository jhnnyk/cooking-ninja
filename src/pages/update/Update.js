import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'

// styles
import './Update.css'

export default function Update() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')


  useEffect(() => {
    setIsPending(true)

    projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe({ id: doc.id, ...doc.data() })
        setTitle(doc.data().title)
      } else {
        setIsPending(false)
        setError('Could not find that recipe')
      }
    })

  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await projectFirestore.collection('recipes').doc(id).update({
        title: title
      })
      navigate(`/recipes/${id}`)
    } catch (err) {
      console.log(err);
    }
    
  }

  return (
    <div className='create'>
      <div className="page-title">Edit recipe title</div>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title: {recipe.title}</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <button className='btn'>submit</button>
      </form>}
    </div>
  )
}
