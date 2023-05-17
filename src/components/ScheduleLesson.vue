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
    async getSubject() {
      await axios.get('https://schedugen.pythonanywhere.com/api/subjects/' + this.subject.subject + '/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.subjectName = res.data.name;
          });
    },
    async getTeacher() {
      await axios.get('https://schedugen.pythonanywhere.com/api/teachers/' + this.subject.teacher + '/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.teacherName = res.data.name;
          });
    },
    async getClassroom() {
      await axios.get('https://schedugen.pythonanywhere.com/api/classrooms/' + this.subject.classroom + '/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classroomName = res.data.name;
          });
    }
  },
  mounted() {
    if (this.subject.id != null) {
      this.getSubject();
      this.getTeacher();
      this.getClassroom()
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