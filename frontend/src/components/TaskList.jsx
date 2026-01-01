import TaskItem from './TaskItem'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0 pt-8 pb-8">
        <div className="px-8 pb-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Your Tasks</h2>
          <p className="text-slate-600">Manage your tasks with full CRUD operations</p>
        </div>
        
        {tasks.length === 0 ? (
          <div className="text-center py-20 px-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No tasks yet</h3>
            <p className="text-slate-600 text-lg max-w-md mx-auto">
              Add your first task above to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4 px-8 pb-8">
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TaskList
