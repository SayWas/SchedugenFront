<template>
  <div @click="editButtonClick(subject)" v-if="subject.id != null" class="lesson lesson-exists">
    <div class="lesson-subject">{{ subjectName }}</div>
    <div class="info-zone">
      <div class="lesson-teacher">{{ teacherName }}</div>
      <div class="lesson-cabinet">{{ classroomName }}</div>
    </div>
  </div>
  <div v-else class="lesson add-lesson">
    <div @click="addButtonClick(subject)" class="add-icon">
      <AddIcon/>
    </div>
  </div>
</template>

<script>
import AddIcon from "@/components/icons/AddIcon.vue";
import axios from "axios";

export default {
  name: "ScheduleLesson",
  components: {AddIcon},
  data() {
    return {
      subjectName: '',
      teacherName: '',
      classroomName: ''
    }
  },
  props: {
    subjects: {
      type: Array,
      required: true
    },
    teachers: {
      type: Array,
      required: true
    },
    classrooms: {
      type: Array,
      required: true
    },
    subject: {
      type: Object,
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
  },
  methods: {
    getSubjectName() {
      this.subjectName = this.subjects.find(subject => subject.id === this.subject.subject).name;
    },
    getTeacherName() {
      if(this.teachers.length === 0)
        return
      this.teacherName = this.teachers.find(teacher => teacher.id === this.subject.teacher).name;
    },
    getClassroomName() {
      if(this.classrooms.length === 0)
        return
      this.classroomName = this.classrooms.find(classroom => classroom.id === this.subject.classroom).name;
    },
  },
  updated() {
    if (this.subject.subject !== null && this.subjects !== undefined) {
      this.getSubjectName()
    }
    if (this.subject.teacher !== null && this.teachers !== undefined) {
      this.getTeacherName()
    }
    if (this.subject.classroom !== null && this.classrooms !== undefined) {
      this.getClassroomName()
    }
  }
}
</script>

<style scoped>
.lesson {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  height: 85px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.1s ease-out;
}

.lesson-exists {
  background-color: #DBEFFD;
}

.lesson-exists:hover {
  background-color: #CCE0FD;
}

.lesson-subject {
  align-self: start;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 500;
  color: #687182;
}

.info-zone {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-teacher {
  margin-left: 10px;
  font-size: 12px;
  font-weight: normal;
  color: #687182;
}

.lesson-cabinet {
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: normal;
  color: #687182;
}

.add-lesson {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-lesson:hover {
  background-color: #E9EDF5;
}

.add-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.1s ease-out;
}

.add-icon:hover {
  opacity: 0.8;
}
</style>