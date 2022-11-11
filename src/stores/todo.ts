import { app } from "@/utils/firebase";
import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";
import type { Todo } from "@/utils/types";

export const useTodoStore = defineStore("todos", () => {
  const db = getFirestore(app);
  const todos = ref<Map<string, Todo>>();
  const testCollectionRef = collection(db, "test");
  const orderedCollection = query(testCollectionRef, orderBy("pos", "desc"));

  const unsubscribe = onSnapshot(orderedCollection, snapshot => {
    const todosMap = new Map();
    snapshot.docs.forEach(v => todosMap.set(v.id, { ...v.data(), id: v.id, editing: false }));
    todos.value = todosMap;
  });

  const addTodo = async (data: Pick<Todo, "text">) => {
    await addDoc(testCollectionRef, { ...data, done: false, pos: new Date().getTime() });
  };

  const updateTodo = async (id: string, updatedTodoData: Omit<Todo, "id" | "editing">) => {
    const todoRef = doc(testCollectionRef, id);
    await updateDoc(todoRef, updatedTodoData);
  };

  const deleteTodo = async (id: string) => {
    const todoRef = doc(testCollectionRef, id);
    await deleteDoc(todoRef);
  };

  return { todos, addTodo, updateTodo, deleteTodo, unsubscribe };
});
