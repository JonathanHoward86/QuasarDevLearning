<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 500px;">
      <div class="q-gutter-md">
        <q-input filled v-model="newTask" label="New task" />
        <q-btn label="Add task" @click="addTask" color="primary" />
      </div>
      <q-list bordered separator>
        <q-item v-for="(task, index) in tasks" :key="index" clickable @click="removeTask(index)">
          <q-item-section>
            {{ task }}
          </q-item-section>
          <q-item-section side>
            <q-btn dense flat round icon="delete" @click="removeTask(index)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      newTask: '',
      tasks: []
    }
  },
  methods: {
    addTask () {
      if (this.newTask !== '') {
        this.tasks.push(this.newTask)
        this.newTask = ''
      }
    },
    removeTask (index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>
