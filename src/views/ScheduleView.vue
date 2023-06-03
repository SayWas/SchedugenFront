<template>
  <div class="page-content">
    <Toolbar :date="date" :is-mistake="isMistake" :previous-button-click="previousButtonClick"
             :forward-button-click="forwardButtonClick"
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
    <Mistakes @close="toggleMistakes" :mistakes-are-shown="mistakesAreShown" :mistakes-are-loaded="mistakesAreLoaded">
      <template #modal-body>
        <div v-for="mistake in mistakes" class="mistake-body">
          <div class="mistake-info">
            <div class="mistake-type" :class="{'mistake-type-sanpin':mistake.messageType === 'САНПИН'}">
              {{ mistake.messageType }}
            </div>
            <div class="mistake-position">
              <div class="mistake-position-item">
                {{ weekNames[mistake.classes[0].weekday] }},
                {{ mistake.classes[0].group }}-{{mistake.classes[1].group}},
                Урок {{ mistake.classes[0].lesson_index }}
              </div>
            </div>
          </div>
          <div class="mistake-text">
            {{ mistake.message }}
          </div>
        </div>
      </template>
    </Mistakes>
  </div>
</template>

<script>
import Toolbar from "@/components/ToolbarSchedule.vue";
import Schedule from "@/components/Schedule.vue";
import axios from "axios";
import Modal from "@/components/Modal.vue";
import useValidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import Mistakes from "@/components/Mistakes.vue";

export default {
  name: "ScheduleView",
  components: {Mistakes, Modal, Schedule, Toolbar},
  data() {
    return {
      v$: useValidate(),
      date: 0,
      weekNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
      isMistake: false,
      schedule: [],
      mistakes: [],
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
        },
        {
          id: 9
        },
        {
          id: 10
        },
        {
          id: 11
        },
        {
          id: 12
        },
        {
          id: 13
        },
        {
          id: 14
        }
      ],
      modalIsActive: false,
      mistakesAreShown: false,
      mistakesAreLoaded: false,
      modalTitle: null,
      isEditing: null,
      isDeleting: false
    }
  },
  validations() {
    return {
      currentSubject: {
        subject: {required},
        classroom: {required},
        teacher: {required}
      }
    }
  },
  methods: {
    async getSchedule() {
      await axios.get(this.$store.state.api_link +'schedule-classes/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.schedule = res.data;
          });
      await axios.get(this.$store.state.api_link +'groups/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classes = res.data;
          });
      await axios.get(this.$store.state.api_link +'subjects/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.subjects = res.data;
          });
      await axios.get(this.$store.state.api_link +'classrooms/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classrooms = res.data;
          });
      await axios.get(this.$store.state.api_link +'teachers/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.teachers = res.data;
          });
      this.mistakesAreLoaded = false;
      this.$store.commit("setLoaded", true);
    },
    toggleModal() {
      this.modalIsActive = !this.modalIsActive;
    },
    toggleMistakes() {
      this.mistakesAreShown = !this.mistakesAreShown;
    },
    async modalApplyClick() {
      if (this.v$.$invalid) {
        alert("Валидация не пройдена!");
        return;
      }
      this.toggleModal();
      this.$store.commit("setLoaded", false);
      if (this.isEditing) {
        if (this.isDeleting) {
          await axios.delete(this.$store.state.api_link +'schedule-classes/' + this.currentSubject.id + '/',
              {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
        } else {
          await axios.put(this.$store.state.api_link +'schedule-classes/' + this.currentSubject.id + '/', {
            weekday: this.currentSubject.weekday,
            lesson_index: this.currentSubject.lesson_index,
            group: this.currentSubject.group,
            teacher: this.currentSubject.teacher,
            subject: this.currentSubject.subject,
            classroom: this.currentSubject.classroom
          }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        }
      } else {
        await axios.post(this.$store.state.api_link +'schedule-classes/', {
          weekday: this.currentSubject.weekday,
          lesson_index: this.currentSubject.lesson_index,
          group: this.currentSubject.group,
          teacher: this.currentSubject.teacher,
          subject: this.currentSubject.subject,
          classroom: this.currentSubject.classroom
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      }
      await this.getSchedule();
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
    async warningButtonClick() {
      this.toggleMistakes()
      if (!this.mistakesAreLoaded) {
        await axios.get(this.$store.state.api_link +'mistakes',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
            .then((res) => {
              this.mistakes = res.data.mistakes;
            });
        this.mistakesAreLoaded = true;
      }
    },
    checkMistakes() {
      // for (let i = 0; i < 7; i++) {
      //   for (const j in this.lessons) {
      //     for (const c in this.classes) {
      //       for (const c1 in this.classes) {
      //         if (this.classes[c].id === this.classes[c1].id)
      //           continue;
      //         let schedule_class = this.schedule.filter((s) => s.weekday === i && s.lesson_index === this.lessons[j].id && s.group === this.classes[c].id)[0];
      //         let schedule_class1 = this.schedule.filter((s) => s.weekday === i && s.lesson_index === this.lessons[j].id && s.group === this.classes[c1].id)[0];
      //         let mistake_message = "";
      //
      //         if (schedule_class === undefined || schedule_class1 === undefined)
      //           continue;
      //
      //         if (schedule_class.teacher === schedule_class1.teacher)
      //           mistake_message += "Учитель " + this.teachers.filter(t => t.id === schedule_class.teacher)[0].name + " ведет " + this.lessons[j].id + " урок у групп " + this.classes[c].name + " и " + this.classes[c1].name + "\n";
      //         if (schedule_class.classroom === schedule_class1.classroom)
      //           mistake_message += "Аудитория " + this.classrooms.filter(c => c.id === schedule_class.classroom)[0].name + " используется для " + this.lessons[j].id + " урока у групп " + this.classes[c].name + " и " + this.classes[c1].name + "\n";
      //
      //         if (mistake_message === "")
      //           continue;
      //
      //         this.mistakes.push({
      //           weekday: i,
      //           lesson_index: this.lessons[j].id,
      //           group: this.classes[c].id,
      //           messageType: "Пересечение",
      //           messageText: mistake_message
      //         });
      //       }
      //     }
      //   }
      // }
    },
    generateButtonClick() {
      axios.post(this.$store.state.api_link +'generate/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
      this.checkGenerated();
    },
    async isGenerating() {
      await axios.get(this.$store.state.api_link +'is_generating',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            if (res.data.is_generating) {
              this.getSchedule();
              return true;
            }
          });
    },
    checkGenerated() {
      this.$store.commit("setLoaded", false);
      if (this.isGenerating())
        return;
      var timerId = setInterval(async () => {
        await axios.get(this.$store.state.api_link +'is_generating',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
            .then((res) => {
              if (!res.data.is_generating) {
                clearInterval(timerId);
                this.getSchedule();
              }
            });
      }, 10000);
    },
  },
  mounted() {
    this.checkGenerated();
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

.mistake-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding-bottom: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}

.mistake-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem;
  padding: 5px;
  width: 95%;
}

.mistake-type {
  border: 1px solid #e5e5e5;
  background-color: orange;
  border-radius: 5px;
  padding: 5px;
}

.mistake-type-sanpin {
  background-color: red;
  color: white;
}

.mistake-text {
  text-align: center;
  max-width: 90%;
  font-weight: 500;
  font-size: 1.2rem;
}
</style>