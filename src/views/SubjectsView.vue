<template>
  <div class="page-content">
    <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
    <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
      <template #table-header-content>
        <div class="table-name table-header-name f-center">
          Название предмета
        </div>
      </template>
      <template #table-item-content>
        <div v-for="(subject, index) in subjects" :key="subject.id" class="f-border-bottom">
          <TableItem :item-id="subject.id" :edit-button-click="editButtonClick" :selected-ids="selectedSubjectsIds"
                     @update:selected-ids="selectSubject">
            <template #table-item-content>
              <div class="number f-center">
                {{ index + 1 }}
              </div>
              <div class="table-name f-center">
                {{ subject.name }}
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
          <input class="text-field-input" placeholder="Математика" v-model="currentSubject.name">
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
  name: "SubjectsView",
  components: {Modal, Toolbar, TableItem, Table},
  data() {
    return {
      v$: useValidate(),
      subjects: null,
      currentSubject: {
        id: null,
        name: null
      },
      modalIsActive: false,
      modalTitle: null,
      isCheckBoxSelected: false,
      isEditing: null,
      selectedSubjectsIds: [],
    }
  },
  validations() {
    const useAllowedChars = (value) => {
      return /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/.test(value);
    }
    return {
      currentSubject: {
        name: {required, useAllowedChars},
      }
    }
  },
  methods: {
    async refreshSubjects() {
      await axios.get('https://schedugen.pythonanywhere.com/api/subjects/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.subjects = res.data;
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
        await axios.put('https://schedugen.pythonanywhere.com/api/subjects/' + this.currentSubject.id + '/', {
          name: this.currentSubject.name,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      } else {
        await axios.post('https://schedugen.pythonanywhere.com/api/subjects/', {
          name: this.currentSubject.name,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        if (this.isCheckBoxSelected) {
          this.selectAllClick()
        }
      }
      await this.refreshSubjects();
    },
    addButtonClick() {
      this.modalTitle = "Добавить предмет";
      this.isEditing = false;
      this.currentSubject.name = "";
      this.toggleModal();
    },
    editButtonClick(id) {
      this.modalTitle = "Изменить предмет";
      this.isEditing = true;
      this.currentSubject = {...this.subjects[this.subjects.findIndex(subject => subject.id === id)]};
      this.toggleModal();
    },
    selectSubject(selectedSubjectsIds) {
      this.selectedSubjectsIds = selectedSubjectsIds;
      this.isCheckBoxSelected = this.selectedSubjectsIds.length === Object.keys(this.subjects).length;
    },
    selectAllClick() {
      this.isCheckBoxSelected = !this.isCheckBoxSelected;
      if (this.isCheckBoxSelected && this.selectedSubjectsIds.length !== Object.keys(this.subjects).length) {
        this.selectedSubjectsIds = this.selectedSubjectsIds.concat(this.subjects.map(subject => subject.id));
      } else {
        this.selectedSubjectsIds = []
      }
    },
    async deleteButtonClick() {
      for (let i = 0; i < this.selectedSubjectsIds.length; i++) {
        await axios.delete('https://schedugen.pythonanywhere.com/api/subjects/' + this.selectedSubjectsIds[i] + '/',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
      }
      this.selectedSubjectsIds = [];
      this.refreshSubjects();
    }
  },
  mounted() {
    this.refreshSubjects();
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