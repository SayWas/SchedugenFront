<template>
  <div class="page-content">
    <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
    <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
      <template #table-header-content>
        <div class="table-name table-header-name f-center">
          Название предмета
        </div>
        <div class="table-name table-header-name f-center">
          ФИО учителя
        </div>
        <div class="table-name table-header-name f-center">
          Количество очков
        </div>
        <div class="table-name table-header-name f-center">
          Макс. кол-во уроков
        </div>
        <div class="table-name table-header-name f-center">
          Список классов
        </div>
        <div class="table-name table-header-name f-center">
          Список кабинетов
        </div>
      </template>
      <template #table-item-content>
        <div v-for="(condition, index) in conditions" :key="condition.id" class="f-border-bottom">
          <TableItem :item-id="condition.id" :edit-button-click="editButtonClick" :selected-ids="selectedConditionsIds"
                     @update:selected-ids="selectCondition">
            <template #table-item-content>
              <div class="number f-center">
                {{ index + 1 }}
              </div>
              <div class="table-name f-center">
                {{ condition.subject }}
              </div>
              <div class="table-name f-center">
                {{ condition.teacher }}
              </div>
              <div class="table-name f-center">
                {{ condition.points }}
              </div>
              <div class="table-name f-center">
                {{ condition.max_lessons }}
              </div>
              <div class="table-name f-center">
                В карточке ограничения
              </div>
              <div class="table-name f-center">
                В карточке ограничения
              </div>
            </template>
          </TableItem>
        </div>
      </template>
    </Table>
    <Modal @close="toggleModal" :modalIsActive="modalIsActive" :modal-apply-click="modalApplyClick">
      <template #modal-title>
        {{ modalTitle }}
      </template>
      <template #modal-body>
        <div class="text-field">
          <label class="text-field-label">Название предмета</label>
          <select class="text-field-input select" multiple v-model="currentCondition.subjects">
            <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
          </select>
          <label class="text-field-label">ФИО учителя</label>
          <select class="text-field-input select" multiple v-model="currentCondition.teachers">
            <option v-for="teacher in teachers" :value="teacher.id">{{ teacher.name }}</option>
          </select>
          <label class="text-field-label">Количество очков</label>
          <input class="text-field-input" placeholder="5" v-model="currentCondition.points">
          <label class="text-field-label">Максимальное количество уроков</label>
          <input class="text-field-input" placeholder="5" v-model="currentCondition.max_lessons">
          <label class="text-field-label">Классы</label>
          <select class="text-field-input select" multiple v-model="currentCondition.groups">
            <option v-for="cl in classes" :value="cl.id">{{ cl.name }}</option>
          </select>
          <label class="text-field-label">Кабинеты</label>
          <select class="text-field-input select" multiple v-model="currentCondition.classrooms">
            <option v-for="cab in classrooms" :value="cab.id">{{ cab.name }}</option>
          </select>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import TableItem from "@/components/TableItem.vue";
import Toolbar from "@/components/ToolbarTable.vue";
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  name: "ConditionSView",
  components: {Modal, Toolbar, TableItem, Table},
  data() {
    return {
      conditions: null,
      currentCondition: {
        id: null,
        subject: null,
        teacher: null,
        points: null,
        max_lessons: null,
        groups: null,
        classrooms: null,
      },
      classrooms: null,
      classes: null,
      teachers: null,
      subjects: null,
      modalIsActive: false,
      modalTitle: null,
      isCheckBoxSelected: false,
      isEditing: null,
      selectedConditionsIds: [],
    }
  },
  methods: {
    async refreshConditions() {
      await axios.get('https://schedugen.pythonanywhere.com/api/classes/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.conditions = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/teachers/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.teachers = res.data;
          });
      await axios.get('https://schedugen.pythonanywhere.com/api/classrooms/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classrooms = res.data;
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
      if (this.teachers.length === 0 || this.classrooms.length === 0 || this.classes.length === 0 || this.subjects.length === 0)
        return;
      this.$store.commit("setLoaded", true);
    },
    toggleModal() {
      this.modalIsActive = !this.modalIsActive;
    },
    async modalApplyClick() {
      if (this.isEditing) {
        await axios.put('https://schedugen.pythonanywhere.com/api/classes/' + this.currentTeacher.id + '/', {
          subject: this.currentCondition.subject,
          teacher: this.currentCondition.teacher,
          points: this.currentCondition.points,
          max_lessons: this.currentCondition.max_lessons,
          groups: this.currentCondition.groups,
          classrooms: this.currentCondition.classrooms,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      } else {
        await axios.post('https://schedugen.pythonanywhere.com/api/classes/', {
          subject: this.currentCondition.subject,
          teacher: this.currentCondition.teacher,
          points: this.currentCondition.points,
          max_lessons: this.currentCondition.max_lessons,
          groups: this.currentCondition.groups,
          classrooms: this.currentCondition.classrooms,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        if (this.isCheckBoxSelected) {
          this.selectAllClick()
        }
      }
      await this.refreshConditions();
      this.toggleModal();
    },
    addButtonClick() {
      this.modalTitle = "Добавить ограничение";
      this.isEditing = false;
      this.currentCondition.subject = null;
      this.currentCondition.teacher = null;
      this.currentCondition.points = null;
      this.currentCondition.max_lessons = null;
      this.currentCondition.groups = [];
      this.currentCondition.classrooms = [];
      this.toggleModal();
    },
    editButtonClick(id) {
      this.modalTitle = "Изменить ограничение";
      this.isEditing = true;
      this.currentCondition = {...this.conditions[this.conditions.findIndex(condition => condition.id === id)]};
      this.toggleModal();
    },
    selectCondition(selectedConditionsIds) {
      this.selectedConditionsIds = selectedConditionsIds;
      this.isCheckBoxSelected = this.selectedConditionsIds.length === Object.keys(this.conditions).length;
    },
    selectAllClick() {
      this.isCheckBoxSelected = !this.isCheckBoxSelected;
      if (this.isCheckBoxSelected && this.selectedConditionsIds.length !== Object.keys(this.conditions).length) {
        this.selectedConditionsIds = this.selectedConditionsIds.concat(this.conditions.map(condition => condition.id));
      } else {
        this.selectedConditionsIds = []
      }
    },
    async deleteButtonClick() {
      for (let i = 0; i < this.selectedConditionsIds.length; i++) {
        await axios.delete('https://schedugen.pythonanywhere.com/api/classes/' + this.selectedConditionsIds[i] + '/',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
      }
      this.selectedConditionsIds = [];
      this.refreshConditions();
    }
  },
  mounted() {
    this.refreshConditions();
  }
}
</script>

<style scoped>
.page-content {
  flex: 1;
}

.f-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.table .number {
  width: 30px;
}

.table .table-name {
  width: 150px;
}

.table .table-name-short {
  width: 100px;
}

.table .table-header-name {
  color: #687182;
}

.table .table-name {
  width: 150px;
}

.table .table-header-name {
  color: #687182;
}

.f-border-bottom {
  flex: 1;
  border-bottom: 1px solid #e5e5e5;
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

.select {
  height: 100px;
}
</style>