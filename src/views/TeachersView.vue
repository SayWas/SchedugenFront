<template>
  <div class="page-content">
    <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
    <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
      <template #table-header-content>
        <div class="table-name table-header-name f-center">
          ФИО
        </div>
      </template>
      <template #table-item-content>
        <div v-for="(teacher, index) in teachers" :key="teacher.id" class="f-border-bottom">
          <TableItem :item-id="teacher.id" :edit-button-click="editButtonClick" :selected-ids="selectedTeachersIds"
                     @update:selected-ids="selectTeacher">
            <template #table-item-content>
              <div class="number f-center">
                {{ index + 1 }}
              </div>
              <div class="table-name f-center">
                {{ teacher.name }}
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
          <label class="text-field-label">ФИО</label>
          <input class="text-field-input" placeholder="Иванов Иван Иванович" v-model="currentTeacher.name">
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
import useValidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

export default {
  name: "TeachersView",
  components: {Modal, Toolbar, TableItem, Table},
  data() {
    return {
      v$: useValidate(),
      teachers: null,
      currentTeacher: {
        id: null,
        name: null
      },
      modalIsActive: false,
      modalTitle: null,
      isCheckBoxSelected: false,
      isEditing: null,
      selectedTeachersIds: [],
    }
  },
  validations() {
    const useAllowedChars = (value) => {
      return /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/.test(value);
    }
    return {
      currentTeacher: {
        name: {required, useAllowedChars},
      }
    }
  },
  methods: {
    async refreshTeachers() {
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
      if (this.v$.$invalid) {
        alert("Валидация не пройдена!");
        return;
      }
      this.toggleModal();
      this.$store.commit("setLoaded", false);
      if (this.isEditing) {
        await axios.put('https://schedugen.pythonanywhere.com/api/teachers/' + this.currentTeacher.id + '/', {
          name: this.currentTeacher.name
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      } else {
        await axios.post('https://schedugen.pythonanywhere.com/api/teachers/', {
          name: this.currentTeacher.name
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        if (this.isCheckBoxSelected) {
          this.selectAllClick()
        }
      }
      await this.refreshTeachers();
    },
    addButtonClick() {
      this.modalTitle = "Добавить учителя";
      this.isEditing = false;
      this.currentTeacher.name = "";
      this.toggleModal();
    },
    editButtonClick(id) {
      this.modalTitle = "Изменить учителя";
      this.isEditing = true;
      this.currentTeacher = {...this.teachers[this.teachers.findIndex(teacher => teacher.id === id)]};
      this.toggleModal();
    },
    selectTeacher(selectedTeachersIds) {
      this.selectedTeachersIds = selectedTeachersIds;
      this.isCheckBoxSelected = this.selectedTeachersIds.length === Object.keys(this.teachers).length;
    },
    selectAllClick() {
      this.isCheckBoxSelected = !this.isCheckBoxSelected;
      if (this.isCheckBoxSelected && this.selectedTeachersIds.length !== Object.keys(this.teachers).length) {
        this.selectedTeachersIds = this.selectedTeachersIds.concat(this.teachers.map(teacher => teacher.id));
      } else {
        this.selectedTeachersIds = []
      }
    },
    async deleteButtonClick() {
      for (let i = 0; i < this.selectedTeachersIds.length; i++) {
        await axios.delete('https://schedugen.pythonanywhere.com/api/teachers/' + this.selectedTeachersIds[i] + '/',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
      }
      this.selectedTeachersIds = [];
      this.refreshTeachers();
    }
  },
  mounted() {
    this.refreshTeachers();
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