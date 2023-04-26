<template>
    <div class="page-content">
        <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
        <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
            <template #table-header-content>
                <div class="table-name table-header-name f-center">
                    ФИО
                </div>
                <div class="table-name table-header-name f-center">
                    Предметы
                </div>
                <div class="table-name-short table-header-name f-center">
                    Классы
                </div>
            </template>
            <template #table-item-content>
                <div v-for="teacher in teachers" :key="teacher.id" class="f-border-bottom">
                    <TableItem :item-id="teacher.id" :edit-button-click="editButtonClick" :selected-ids="selectedTeachersIds" @update:selected-ids="selectTeacher">
                        <template #table-item-content>
                            <div class="number f-center">
                                {{teacher.id}}
                            </div>
                            <div class="table-name f-center">
                                {{teacher.name}}
                            </div>
                            <div class="table-name f-center">
<!--                                {{teacher.subjects.slice(0, 5).join(', ')}}-->
                                В карточке
                            </div>
                            <div class="table-name-short f-center">
<!--                                {{teacher.classes.slice(0, 5).join(', ')}}-->
                                В карточке
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
                    <label class="text-field-label">Предметы</label>
                    <select class="text-field-input select" multiple v-model="currentTeacher.subjects">
                        <option v-for="subject in subjects">{{subject}}</option>
                    </select>
                    <label class="text-field-label">Классы</label>
                    <select class="text-field-input select" multiple v-model="currentTeacher.classes">
                        <option v-for="cl in classes">{{cl}}</option>
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

export default {
    name: "TeachersView",
    components: {Modal, Toolbar, TableItem, Table},
    data() {
        return {
            teachers: {
                1: {
                    id: 1,
                    name: 'Иванов Иван Иванович',
                    subjects: ['Математика', 'Русский язык', 'Физика'],
                    classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
                },
                2: {
                    id: 2,
                    name: 'Петров Петр Петрович',
                    subjects: ['Математика', 'Русский язык', 'Физика'],
                    classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
                },
                3: {
                    id: 3,
                    name: 'Сидоров Сидор Сидорович',
                    subjects: ['Математика', 'Русский язык', 'Физика'],
                    classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
                },
                4: {
                    id: 4,
                    name: 'Алексеев Алексей Алексеевич',
                    subjects: ['Математика', 'Русский язык', 'Физика'],
                    classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
                },
            },
            currentTeacher: {
                id: null,
                name: null,
                subjects: null,
                classes: null,
            },
            subjects: ['Математика', 'Русский язык', 'Физика'],
            classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
            modalIsActive: false,
            modalTitle: null,
            isCheckBoxSelected: false,
            isEditing: null,
            selectedTeachersIds: [],
        }
    },
    methods: {
        refreshTeachers() {
            console.log("refreshTeachers");
        },
        toggleModal() {
            this.modalIsActive = !this.modalIsActive;
        },
        modalApplyClick() {
            console.log("modalApplyClick");
            if (this.isEditing) {
                console.log("isEditing" + this.currentTeacher.classes);
            } else {
                console.log("isAdding");
            }
            this.toggleModal();
        },
        addButtonClick() {
            this.modalTitle = "Добавить учителя";
            this.isEditing = false;
            this.currentTeacher.name = "";
            this.currentTeacher.subjects = [];
            this.currentTeacher.classes = [];
            this.toggleModal();
            console.log("addButtonClick");
        },
        editButtonClick(id) {
            this.modalTitle = "Изменить учителя";
            this.isEditing = true;
            this.currentTeacher = {...this.teachers[id]};
            this.toggleModal();
            console.log("editButtonClick");
        },
        selectTeacher(selectedTeachersIds) {
            this.selectedTeachersIds = selectedTeachersIds;
            this.isCheckBoxSelected = this.selectedTeachersIds.length === Object.keys(this.teachers).length;
        },
        selectAllClick() {
            this.isCheckBoxSelected = !this.isCheckBoxSelected;
            if(this.isCheckBoxSelected && this.selectedTeachersIds.length !== Object.keys(this.teachers).length) {
                this.selectedTeachersIds = Object.keys(this.teachers).map(teacher => parseInt(teacher));
            } else {
                this.selectedTeachersIds = []
            }
            console.log("selectAllClick" + this.selectedTeachersIds);
        },
        deleteButtonClick() {
            console.log("deleteButtonClick" + this.selectedTeachersIds);
        }
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

.select{
    height: 100px;
}
</style>