<template>
  <div class="page-content">
    <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
    <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
      <template #table-header-content>
        <div class="table-name table-header-name f-center">
          Название класса
        </div>
      </template>
      <template #table-item-content>
        <div v-for="(cl, index) in classes" :key="cl.id" class="f-border-bottom">
          <TableItem :item-id="cl.id" :edit-button-click="editButtonClick" :selected-ids="selectedClassesIds"
                     @update:selected-ids="selectClass">
            <template #table-item-content>
              <div class="number f-center">
                {{ index + 1 }}
              </div>
              <div class="table-name f-center">
                {{ cl.name }}
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
          <label class="text-field-label">Название класса</label>
          <input class="text-field-input" placeholder="5Б" v-model="currentClass.name">
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Toolbar from "@/components/ToolbarTable.vue";
import Table from "@/components/Table.vue";
import TableItem from "@/components/TableItem.vue";
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  name: "ClassesView",
  components: {TableItem, Table, Toolbar, Modal},
  data() {
    return {
      classes: null,
      currentClass: {
        id: null,
        name: null,
      },
      modalIsActive: false,
      modalTitle: null,
      isCheckBoxSelected: false,
      isEditing: null,
      selectedClassesIds: [],
    }
  },
  methods: {
    refreshClasses() {
      axios.get('https://schedugen.pythonanywhere.com/api/groups/',
          {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
          .then((res) => {
            this.classes = res.data;
          });
    },
    toggleModal() {
      this.modalIsActive = !this.modalIsActive;
    },
    async modalApplyClick() {
      if (this.isEditing) {
        await axios.put('https://schedugen.pythonanywhere.com/api/groups/' + this.currentClass.id + '/', {
          name: this.currentClass.name,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
      } else {
        await axios.post('https://schedugen.pythonanywhere.com/api/groups/', {
          name: this.currentClass.name,
        }, {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}})
        if (this.isCheckBoxSelected) {
          this.selectAllClick()
        }
      }
      await this.refreshClasses();
      this.toggleModal();
    },
    addButtonClick() {
      this.modalTitle = "Добавить класс";
      this.isEditing = false;
      this.currentClass.name = "";
      this.toggleModal();
    },
    editButtonClick(id) {
      this.modalTitle = "Изменить класс";
      this.isEditing = true;
      this.currentClass = {...this.classes[this.classes.findIndex(cl => cl.id === id)]};
      this.toggleModal();
    },
    selectClass(selectedClassesIds) {
      this.selectedClassesIds = selectedClassesIds;
      this.isCheckBoxSelected = this.selectedClassesIds.length === Object.keys(this.classes).length;
    },
    selectAllClick() {
      this.isCheckBoxSelected = !this.isCheckBoxSelected;
      if (this.isCheckBoxSelected && this.selectedClassesIds.length !== Object.keys(this.classes).length) {
        this.selectedClassesIds = this.selectedClassesIds.concat(this.classes.map(cl => cl.id));
      } else {
        this.selectedClassesIds = []
      }
    },
    async deleteButtonClick() {
      for (let i = 0; i < this.selectedClassesIds.length; i++) {
        await axios.delete('https://schedugen.pythonanywhere.com/api/groups/' + this.selectedClassesIds[i] + '/',
            {headers: {Authorization: 'Bearer ' + this.$store.state.access_token}});
      }
      this.selectedClassesIds = [];
      this.refreshClasses();
    }
  },
  mounted() {
    this.refreshClasses();
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
</style>