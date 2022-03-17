import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string): void => {
    const task = tasks.find(task => task.title === newTaskTitle);

    if( task ) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return;
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldState => [...oldState, data])
  }

  const handleToggleTaskDone = (id: number): void => {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(task => task.id === id);

    if( !foundItem )
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  const handleEditTask = ({ taskId, taskNewTitle }: EditTaskArgs): void => {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(task => task.id === taskId);

    if( !foundItem )
      return;

    foundItem.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  const handleRemoveTask = (id: number): void => {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
