import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
	const defaultTask={
		'id':crypto.randomUUID(),
		'title':'Learn React',
		'description':'I want to learn React as a pro developer',
		'tags':["Web", "React","JS"],
		'priority':'High',
		'isFavorite':false
	}

	const [tasks, setTasks] = useState([defaultTask]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState(false)

	const handleAddEditTask=(newTask, isAdd)=>{
		if(isAdd){
			setTasks([...tasks, newTask]);
		}else{
			const edit = tasks.map((task)=>{
				if(task.id ===newTask.id){
					return newTask
				}
				return task
			})
			setTasks(edit);
		}
		setShowAddModal(false);
	}

	const handleEditTask=(task)=>{
		setTaskToUpdate(task)
		setShowAddModal(true)
	}

	return (
		<section className="mb-20" id="tasks">
			{showAddModal&& <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate}/>}
			<div className="container">
			
			<div className="p-2 flex justify-end">
				<SearchTask/>
			</div>
			
				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions onAddClick={()=>  setShowAddModal(true)}/>
					<TaskList tasks={tasks} onEdit={handleEditTask}/>
				</div>
			</div>
		</section>
	)
}

export default TaskBoard