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
                <div v-for="cl in classes" :key="cl.id" class="f-border-bottom">
                    <TableItem :item-id="cl.id" :edit-button-click="editButtonClick" :selected-ids="selectedClassesIds" @update:selected-ids="selectClass">
                        <template #table-item-content>
                            <div class="number f-center">
                                {{cl.id}}
                            </div>
                            <div class="table-name f-center">
                                {{cl.name}}
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

export default {
    name: "ClassesView",
    components: {TableItem, Table, Toolbar, Modal},
    data() {
        return {
            classes: {
                1: {
                    id: 1,
                    name: "5Б",
                },
                2: {
                    id: 2,
                    name: "6Б",
                },
                3: {
                    id: 3,
                    name: "7Б",
                }
            },
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
            console.log("refreshClasses");
        },
        toggleModal() {
            this.modalIsActive = !this.modalIsActive;
        },
        modalApplyClick() {
            console.log("modalApplyClick");
            if (this.isEditing) {
                console.log("isEditing");
            } else {
                console.log("isAdding" + this.currentClass.name);
            }
            this.toggleModal();
        },
        addButtonClick() {
            this.modalTitle = "Добавить класс";
            this.isEditing = false;
            this.currentClass.name = "";
            this.toggleModal();
            console.log("addButtonClick");
        },
        editButtonClick(id) {
            this.modalTitle = "Изменить класс";
            this.isEditing = true;
            this.currentClass = {...this.classes[id]};
            this.toggleModal();
            console.log("editButtonClick");
        },
        selectClass(selectedClassesIds) {
            this.selectedClassesIds = selectedClassesIds;
            this.isCheckBoxSelected = this.selectedClassesIds.length === Object.keys(this.classes).length;
        },
        selectAllClick() {
            this.isCheckBoxSelected = !this.isCheckBoxSelected;
            if(this.isCheckBoxSelected && this.selectedClassesIds.length !== Object.keys(this.classes).length) {
                this.selectedClassesIds = Object.keys(this.classes).map(cl => parseInt(cl))
            } else {
                this.selectedClassesIds = []
            }
            console.log("selectAllClick" + this.selectedClassesIds);
        },
        deleteButtonClick() {
            console.log("deleteButtonClick" + this.selectedClassesIds);
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