<script setup lang="ts">
  import type { Todo } from "@/utils/types";
  import { ref } from "vue";

  const todos = ref<Omit<Todo, "pos">[]>([]);
  const todoText = ref("");

  function addTodo() {
    if (!todoText.value.trim()) return;
    todos.value.push({
      id: crypto.randomUUID(),
      text: todoText.value,
      done: false,
      editing: false,
    });
    todoText.value = "";
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter(v => v.id !== id);
  }
</script>

<template>
  <div class="p-8">
    <div class="border max-w-sm mx-auto [&_input]:text-black">
      <form class="p-2.5 flex mb-2.5" @submit.prevent="addTodo">
        <input class="p-2 grow-1.4" v-model="todoText" type="text" />
        <button class="flex-1 bg-green-4 text-green-9">Add</button>
      </form>

      <ul>
        <li
          class="flex justify-between items-center px-2.5 py-1 border-(1 gray-1/50) mb-2"
          :class="todo.done && 'opacity-50 line-through'"
          v-for="todo in todos"
          :key="todo.id"
        >
          <template v-if="!todo.editing">
            <p class="max-w-28ch">
              {{ todo.text }}
            </p>
          </template>
          <template v-else>
            <form @submit.prevent="todo.editing = !todo.editing">
              <input v-model="todo.text" type="text" />
            </form>
          </template>

          <div class="flex [&>div]:(p-2 cursor-pointer)">
            <div @click="todo.editing = !todo.editing">
              <div class="i-ri-edit-line" />
            </div>
            <div @click="deleteTodo(todo.id)">
              <div class="i-ri-delete-bin-7-line" />
            </div>
            <div @click="todo.done = !todo.done">
              <div class="i-ri-check-line" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
