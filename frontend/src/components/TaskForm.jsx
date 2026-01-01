import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onAddTask({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Plus className="h-7 w-7" />
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-14 text-lg border-2 border-slate-200 focus:border-indigo-500 transition-all"
          />
          <Textarea
            placeholder="Task description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none border-2 border-slate-200 focus:border-indigo-500 transition-all"
          />
          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!title.trim()}
          >
            Create Task
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default TaskForm
