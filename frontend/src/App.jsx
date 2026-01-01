import { useState, useEffect } from 'react'
import axios from 'axios' 
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Loader2, Edit3, Trash2, CheckCircle } from 'lucide-react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://dt-project-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/tasks')
      setTasks(data.data || data)  
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData)
      setTasks(prev => [...prev, data.data || data])
    } catch (err) {
      console.error('Add error:', err)
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData)
      setTasks(prev => prev.map(t => t._id === id ? (data.data || data) : t))
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      setTasks(prev => prev.filter(t => t._id !== id))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-indigo-600" />
          <p className="text-xl text-slate-600 font-medium">Loading tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            DT Task Manager
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-md mx-auto">
            DeepTech Node.js Challenge • Full CRUD Operations (Axios)
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {tasks.length} Tasks
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-200">
              Axios Live Sync
            </Badge>
          </div>
        </div>

        <TaskForm onAddTask={addTask} />

       
        <TaskList 
          tasks={tasks} 
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  )
}

export default App
