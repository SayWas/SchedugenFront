<template>
    <div class="page-content">
        <Toolbar :modal-title="modalTitle" :toggle-modal="addButtonClick" :modal-apply-click="modalApplyClick" :delete-button-click="deleteButtonClick"/>
        <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
            <template #table-header-content>
                <div class="table-name table-header-name f-center">
                    Название предмета
                </div>
                <div class="table-name table-header-name f-center">
                    Нагрузка в часах
                </div>
                <div class="table-name-short table-header-name f-center">
                    Классы
                </div>
            </template>
            <template #table-item-content>
                <div v-for="subject in subjects" :key="subject.id" class="f-border-bottom">
                    <TableItem :item-id="subject.id" :edit-button-click="editButtonClick" :selected-ids="selectedSubjectsIds" @update:selected-ids="selectSubject">
                        <template #table-item-content>
                            <div class="number f-center">
                                {{subject.id}}
                            </div>
                            <div class="table-name f-center">
                                {{subject.name}}
                            </div>
                            <div class="table-name f-center">
                                {{subject.loadTime}}
                            </div>
                            <div class="table-name-short f-center">
<!--                                {{subject.classes.slice(0, 5).join(', ')}}-->
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
                    <label class="text-field-label">Название предмета</label>
                    <input class="text-field-input" placeholder="Математика" v-model="currentSubject.name">
                    <label class="text-field-label">Нагрузка в часах</label>
                    <input class="text-field-input" placeholder="20" v-model="currentSubject.loadTime">
                    <label class="text-field-label">Классы</label>
                    <select class="text-field-input select" multiple v-model="currentSubject.classes">
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
import Toolbar from "@/components/Toolbar.vue";
import Modal from "@/components/Modal.vue";

export default {
    name: "SubjectsView",
    components: {Modal, Toolbar, TableItem, Table},
    data() {
        return {
            subjects: {
                1: {
                    id: 1,
                    name: "Математика",
                    loadTime: 40,
                    classes: ['4', '5', '6', '7А', '7В', '9', '10']
                },
                2: {
                    id: 2,
                    name: "Русский язык",
                    loadTime: 40,
                    classes: ['1Б', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12']
                },
                3: {
                    id: 3,
                    name: "Физика",
                    loadTime: 40,
                    classes: ['2Г', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12']
                },
            },
            currentSubject: {
                id: null,
                name: null,
                loadTime: null,
                classes: null,
            },
            classes: ['1Б', '2', '3', '4', '5', '6', '7А', '7В', '9', '10', '11', '12'],
            modalIsActive: false,
            modalTitle: null,
            isCheckBoxSelected: false,
            isEditing: null,
            selectedSubjectsIds: [],
        }
    },
    methods: {
        refreshSubjects() {
            console.log("refreshSubjects");
        },
        toggleModal() {
            this.modalIsActive = !this.modalIsActive;
        },
        modalApplyClick() {
            console.log("modalApplyClick");
            if (this.isEditing) {
                console.log("isEditing" + this.currentSubject.classes);
            } else {
                console.log("isAdding");
            }
            this.toggleModal();
        },
        addButtonClick() {
            this.modalTitle = "Добавить предмет";
            this.isEditing = false;
            this.currentSubject.name = "";
            this.currentSubject.loadTime = "";
            this.currentSubject.classes = [];
            this.toggleModal();
            console.log("addButtonClick");
        },
        editButtonClick(id) {
            this.modalTitle = "Изменить предмет";
            this.isEditing = true;
            this.currentSubject = {...this.subjects[id]};
            this.toggleModal();
            console.log("editButtonClick");
        },
        selectSubject(selectedSubjectsIds) {
            this.selectedSubjectsIds = selectedSubjectsIds;
            this.isCheckBoxSelected = this.selectedSubjectsIds.length === Object.keys(this.subjects).length;
        },
        selectAllClick() {
            this.isCheckBoxSelected = !this.isCheckBoxSelected;
            if(this.isCheckBoxSelected && this.selectedSubjectsIds.length !== Object.keys(this.subjects).length) {
                this.selectedSubjectsIds = Object.keys(this.subjects).map(subject => parseInt(subject))
            } else {
                this.selectedSubjectsIds = []
            }
            console.log("selectAllClick" + this.selectedSubjectsIds);
        },
        deleteButtonClick() {
            console.log("deleteButtonClick" + this.selectedSubjectsIds);
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