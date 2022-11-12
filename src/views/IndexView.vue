<script setup lang="ts">
  import { useTodoStore } from "@/stores/todo";
  import { ref } from "vue";

  const store = useTodoStore();
  const todoText = ref("");
</script>

<template>
  <div class="p-8">
    <div class="border max-w-sm mx-auto [&_input]:text-black">
      <form
        class="p-2.5 flex"
        @submit.prevent="
          store.addTodo({ text: todoText });
          todoText = '';
        "
      >
        <input class="p-2 grow-1.4" v-model="todoText" type="text" />
        <button class="flex-1 bg-green-4 text-green-9">Add</button>
      </form>

      <ul>
        <li
          v-for="todo in store.todos?.values()"
          :key="todo.id"
          class="flex justify-between items-center px-2.5 py-1 [&:not(:last-child)]:border-b-(1 gray-1/50)"
          :class="todo.done && 'opacity-50 line-through'"
        >
          <template v-if="!todo.editing">
            <p class="max-w-28ch">
              {{ todo.text }}
            </p>
          </template>
          <template v-else>
            <form @submit.prevent="store.updateTodo(todo.id, { ...todo, text: todo.text })">
              <input v-model="todo.text" type="text" />
            </form>
          </template>

          <div class="flex [&>div]:(p-2 cursor-pointer)">
            <div @click="todo.editing = !todo.editing">
              <div class="i-ri-edit-line" />
            </div>
            <div @click="store.deleteTodo(todo.id)">
              <div class="i-ri-delete-bin-7-line" />
            </div>
            <div @click="store.updateTodo(todo.id, { ...todo, done: !todo.done })">
              <div class="i-ri-check-line" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
