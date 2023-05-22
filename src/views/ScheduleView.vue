<template>
  <div class="page-content">
    <Toolbar :date="date" :is-mistake="isMistake" :previous-button-click="previousButtonClick" :forward-button-click="forwardButtonClick"
             :warning-button-click="warningButtonClick"
             :generate-button-click="generateButtonClick"/>
    <Schedule :date="date" :classes="classes" :lessons="lessons" :schedule="schedule" :teachers="teachers"
              :subjects="subjects" :classrooms="classrooms"
              :add-button-click="addButtonClick"
              :edit-button-click="editButtonClick"/>
    <Modal @close="toggleModal" :modalIsActive="modalIsActive" :modal-apply-click="modalApplyClick">
      <template #modal-title>
        {{ modalTitle }}
      </template>
      <template #modal-body>
        <div class="text-field">
          <label class="text-field-label">Название предмета</label>
          <select class="text-field-input" v-model="currentSubject.subject">
            <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
          </select>
          <label class="text-field-label">Название класса</label>
          <select class="text-field-input" v-model="currentSubject.classroom">
            <option v-for="cl in classrooms" :value="cl.id">{{ cl.name }}</option>
          </select>
          <label class="text-field-label">ФИО Учителя</label>
          <select class="text-field-input" v-model="currentSubject.teacher">
            <option v-for="teacher in teachers" :value="teacher.id">{{ teacher.name }}</option>
          </select>
          <div v-if="isEditing" class="delete-zone">
            <label class="text-field-label">Удалить</label>
            <input type="checkbox" class="text-field-checkbox" v-model="isDeleting"/>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Toolbar from "@/components/ToolbarSchedule.vue";
import Schedule from "@/components/Schedule.vue";
import axios from "axios";
import Modal from "@/components/Modal.vue";

export default {
  name: "ScheduleView",
  components: {Modal, Schedule, Toolbar},
  data() {
    return {
      date: 0,
      isMistake: false,
      schedule: [],
      currentSubject: {
        id: null,
        weekday: null,
        lesson_index: null,
        group: null,
        teacher: null,
        subject: null,
        classroom: null
      },
      classes: [],
      subjects: [],
      classrooms: [],
      teachers: [],
      lessons: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        }
      ],
      modalIsActive: false,
      modalTitle: null,
      isEditing: null,
      isDeleting: false
    }
  },
  methods: {
    async getSchedule() {
      await axios.get('https://schedugen.pythonanywhere.com/api/schedule-classes/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.schedule = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/groups/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classes = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/subjects/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.subjects = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/classrooms/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classrooms = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/teachers/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.teachers = res.data;
          });
      this.$store.commit("setLoaded", true);
    },
    toggleModal() {
      this.modalIsActive = !this.modalIsActive;
    },
    async modalApplyClick() {
      if (this.isEditing) {
        if (this.isDeleting) {
          await axios.delete('https://schedugen.pythonanywhere.com/api/schedule-classes/' + this.currentSubject.id + '/',
              {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
        } else {
          await axios.put('https://schedugen.pythonanywhere.com/api/schedule-classes/' + this.currentSubject.id + '/', {
            weekday: this.currentSubject.weekday,
            lesson_index: this.currentSubject.lesson_index,
            group: this.currentSubject.group,
            teacher: this.currentSubject.teacher,
            subject: this.currentSubject.subject,
            classroom: this.currentSubject.classroom
          }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        }
      } else {
        await axios.post('https://schedugen.pythonanywhere.com/api/schedule-classes/', {
          weekday: this.currentSubject.weekday,
          lesson_index: this.currentSubject.lesson_index,
          group: this.currentSubject.group,
          teacher: this.currentSubject.teacher,
          subject: this.currentSubject.subject,
          classroom: this.currentSubject.classroom
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      }
      await this.getSchedule();
      this.toggleModal();
    },
    addButtonClick(subject) {
      this.modalTitle = "Добавить урок";
      this.isEditing = false;
      this.currentSubject.weekday = subject.weekday;
      this.currentSubject.lesson_index = subject.lesson_index
      this.currentSubject.group = subject.group;
      this.currentSubject.teacher = null;
      this.currentSubject.subject = null;
      this.currentSubject.classroom = null;
      this.toggleModal();
    },
    editButtonClick(subject) {
      this.modalTitle = "Изменить урок";
      this.isEditing = true;
      if (this.isDeleting) {
        this.isDeleting = false;
      }
      this.currentSubject = {...subject};
      this.toggleModal();
    },
    previousButtonClick() {
      if (this.date === 0)
        return;
      this.date -= 1;
    },
    forwardButtonClick() {
      if (this.date === 6)
        return;
      this.date += 1;
    },
    warningButtonClick() {
      // warning
      this.isMistake = !this.isMistake;
    },
    generateButtonClick() {
      // generate
    }
  },
  mounted() {
    this.getSchedule();
  }
}
</script>

<style scoped>
.page-content {
  flex: 1;
}

.text-field {
  margin-bottom: 1rem;
}

.text-field-label {
  display: block;
  margin-bottom: 0.25rem;
  margin-left: 0.2rem;
}

.text-field-input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-clip: padding-box;
  border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.text-field-input::placeholder {
  color: #687182;
  opacity: 0.4;
}

.text-field-input:focus {
  color: black;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgba(158, 158, 158, 0.25);
}

.delete-zone {
  display: flex;
  justify-content: start;
  align-items: center;
}

.text-field-checkbox {
  display: block;
  height: calc(2.25rem + 2px);
  margin-left: 5px;
  color: #212529;
  background-clip: padding-box;
  border: 1px solid #e5e5e5;
  border-radius: 0.2rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>