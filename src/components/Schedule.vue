<template>
  <div class="table">
    <div class="table-content table-header border-bottom">
      <div class="date f-center">
        {{ weekNames[date] }}
      </div>
      <div v-for="cl in classes" :key="cl.id" class="schedule-field f-center">
        {{ cl.name }}
      </div>
    </div>
    <div v-for="lesson in lessons" :key="lesson.id" class="table-content table-row border-bottom">
      <div class="date lesson-number sticky-left f-center">
        {{ lesson.id }} урок
      </div>
      <div v-for="cl in classes" :key="cl.id" class="schedule-field f-center">
        <ScheduleLesson :classrooms="classrooms" :subjects="subjects" :teachers="teachers"
                        :add-button-click="addButtonClick" :edit-button-click="editButtonClick"
                        :subject="schedule.filter(sched => sched.lesson_index === lesson.id && sched.group === cl.id && sched.weekday === date)[0] ?
                        schedule.filter(sched => sched.lesson_index === lesson.id && sched.group === cl.id && sched.weekday === date)[0] :
                        {
                          id: null,
                          weekday: date,
                          lesson_index: lesson.id,
                          group: cl.id,
                          teacher: null,
                          subject: null,
                          classroom: null
                        }"/>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBoxIcon from "@/components/icons/CheckBoxIcon.vue";
import CheckBoxCheckedIcon from "@/components/icons/CheckBoxCheckedIcon.vue";
import ScheduleLesson from "@/components/ScheduleLesson.vue";

export default {
  name: "Schedule",
  components: {ScheduleLesson, CheckBoxCheckedIcon, CheckBoxIcon},
  data() {
    return {
      weekNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    }
  },
  props: {
    date: {
      type: Number,
      required: true
    },
    classes: {
      type: Array,
      required: true
    },
    lessons: {
      type: Array,
      required: true
    },
    schedule: {
      type: Array,
      required: true
    },
    classrooms: {
      type: Array,
      required: true
    },
    subjects: {
      type: Array,
      required: true
    },
    teachers: {
      type: Array,
      required: true
    },
    addButtonClick: {
      type: Function,
      required: true
    },
    editButtonClick: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.table {
  display: grid;
  grid-template-columns: repeat(1, 0);
  overflow-x: auto;
}

.table-content {
  display: grid;
  grid-auto-flow: column;
  width: fit-content;
}

.table-header {
  height: 27px;
}

.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table .date {
  width: 95px;
  border-right: 1px solid #e5e5e5;
}

.table .lesson-number {
  height: 95px;
}

.table .schedule-field {
  width: 250px;
  border-right: 1px solid #e5e5e5;
}

.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}
</style>