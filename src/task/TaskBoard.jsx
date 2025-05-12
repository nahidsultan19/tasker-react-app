import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
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
	
	// state for update task
	const [taskToUpdate, setTaskToUpdate] = useState(null)


	const handleAddEditTask=(newTask,isAdd)=>{
		if(isAdd){
			setTasks([...tasks, newTask])
		}else{
			setTasks(tasks?.map(task=>{
				if(task.id === newTask.id){
					return newTask;
				}
				return task;
			}))
		}
		
		setShowAddModal(false);

		// after update the field, clear the state to add new 
		setTaskToUpdate(null);
	}

	const handleEditTask=(task)=>{
		setTaskToUpdate(task);
		setShowAddModal(true)

	}

	// close the modal 
	const handleCloseClick=()=>{
		setShowAddModal(false);
		setTaskToUpdate(null);
	}

	// delete the task
	const handleDeleteTask=(taskId)=>{
		console.log('deleting item',taskId)
		const deleteTask = tasks.filter(task=> task.id !== taskId);
		setTasks(deleteTask);
	}

	//delete all tasks
	const handleDeleteAllCLick=()=>{
		tasks.length= 0;
		setTasks([...tasks]);
	}

	//toggle favorite task
	const handleFavorite=(taskId)=>{
		const taskIndex = tasks.findIndex(task=>task.id === taskId);
		const newTask =[...tasks];
		newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
		setTasks(newTask);
	}

	// search task
	const handleSearch=(searchTerm)=>{
		const filtered = tasks.filter((task)=> task.title.toLowerCase().includes(searchTerm.toLowerCase()));
		setTasks([...filtered]);
	}

	return (
		<section className="mb-20" id="tasks">
			{showAddModal&& <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>}
			<div className="container">
			
			<div className="p-2 flex justify-end">
				<SearchTask onSearch={handleSearch}/>
			</div>
			
				<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
					<TaskActions onAddClick={()=> setShowAddModal(true)} onDeleteAllClick={handleDeleteAllCLick}/>
					{tasks.length >0?(<TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onFav={handleFavorite}/>):(<NoTaskFound/>)}
				</div>
			</div>
		</section>
	)
}

export default TaskBoard