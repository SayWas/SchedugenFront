<template>
    <div class="page-content">
        <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
        <Table class="table" :select-all-click="selectAllClick" :is-check-box-selected="isCheckBoxSelected">
            <template #table-header-content>
                <div class="table-name table-header-name f-center">
                    Номер кабинета
                </div>
            </template>
            <template #table-item-content>
                <div v-for="cabinet in cabinets" :key="cabinet.id" class="f-border-bottom">
                    <TableItem :item-id="cabinet.id" :edit-button-click="editButtonClick" :selected-ids="selectedCabinetsIds" @update:selected-ids="selectCabinet">
                        <template #table-item-content>
                            <div class="number f-center">
                                {{ cabinet.id }}
                            </div>
                            <div class="table-name f-center">
                                {{ cabinet.number }}
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
                    <label class="text-field-label">Номер кабинета</label>
                    <input class="text-field-input" placeholder="101" v-model="currentCabinet.number">
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
    name: "CabinetsView",
    components: {TableItem, Table, Toolbar, Modal},
    data() {
        return {
            cabinets: {
                1: {
                    id: 1,
                    number: "101",
                },
                2: {
                    id: 2,
                    number: "102",
                },
                3: {
                    id: 3,
                    number: "103",
                },
                4: {
                    id: 4,
                    number: "104",
                },
                5: {
                    id: 5,
                    number: "105",
                },
                6: {
                    id: 6,
                    number: "106",
                },
                7: {
                    id: 7,
                    number: "107",
                },
                8: {
                    id: 8,
                    number: "108",
                },
                9: {
                    id: 9,
                    number: "109",
                },
                10: {
                    id: 10,
                    number: "110",
                },
                11: {
                    id: 11,
                    number: "111",
                },
                12: {
                    id: 12,
                    number: "112",
                },
                13: {
                    id: 13,
                    number: "113",
                },
                14: {
                    id: 14,
                    number: "114",
                },
                15: {
                    id: 15,
                    number: "115",
                },
                16: {
                    id: 16,
                    number: "116",
                },
                17: {
                    id: 17,
                    number: "117",
                },
                18: {
                    id: 18,
                    number: "118",
                },
                19: {
                    id: 19,
                    number: "119",
                },
                20: {
                    id: 20,
                    number: "120",
                },
                21: {
                    id: 21,
                    number: "121",
                },
                22: {
                    id: 22,
                    number: "122",
                },
                23: {
                    id: 23,
                    number: "123",
                },
                24: {
                    id: 24,
                    number: "124",
                },
                25: {
                    id: 25,
                    number: "125",
                },
                26: {
                    id: 26,
                    number: "126",
                },
                27: {
                    id: 27,
                    number: "127",
                },
                28: {
                    id: 28,
                    number: "128",
                },
                29: {
                    id: 29,
                    number: "129",
                },
                30: {
                    id: 30,
                    number: "130",
                },
                31: {
                    id: 31,
                    number: "131",
                },
                32: {
                    id: 32,
                    number: "132",
                },
                33: {
                    id: 33,
                    number: "133",
                },
                34: {
                    id: 34,
                    number: "134",
                },
                35: {
                    id: 35,
                    number: "135",
                },
                36: {
                    id: 36,
                    number: "136",
                },
                37: {
                    id: 37,
                    number: "137",
                },
                38: {
                    id: 38,
                    number: "138",
                },
                39: {
                    id: 39,
                    number: "139",
                },
                40: {
                    id: 40,
                    number: "140",
                }
            },
            currentCabinet: {
                id: null,
                number: null,
            },
            modalIsActive: false,
            modalTitle: null,
            isCheckBoxSelected: false,
            isEditing: null,
            selectedCabinetsIds: [],
        }
    },
    methods: {
        refreshCabinets() {
            console.log("refreshCabinets");
        },
        toggleModal() {
            this.modalIsActive = !this.modalIsActive;
        },
        modalApplyClick() {
            console.log("modalApplyClick");
            if (this.isEditing) {
                console.log("isEditing");
            } else {
                console.log("isAdding" + this.currentCabinet.number);
            }
            this.toggleModal();
        },
        addButtonClick() {
            this.modalTitle = "Добавить кабинет";
            this.isEditing = false;
            this.currentCabinet.number = "";
            this.toggleModal();
            console.log("addButtonClick");
        },
        editButtonClick(id) {
            this.modalTitle = "Изменить кабинет";
            this.isEditing = true;
            this.currentCabinet = {...this.cabinets[id]};
            this.toggleModal();
            console.log("editButtonClick");
        },
        selectCabinet(selectedCabinetsIds) {
            this.selectedCabinetsIds = selectedCabinetsIds;
            this.isCheckBoxSelected = this.selectedCabinetsIds.length === Object.keys(this.cabinets).length;
        },
        selectAllClick() {
            this.isCheckBoxSelected = !this.isCheckBoxSelected;
            if(this.isCheckBoxSelected && this.selectedCabinetsIds.length !== Object.keys(this.cabinets).length) {
                this.selectedCabinetsIds = Object.keys(this.cabinets).map(cabinet => parseInt(cabinet))
            } else {
                this.selectedCabinetsIds = []
            }
            console.log("selectAllClick" + this.selectedCabinetsIds);
        },
        deleteButtonClick() {
            console.log("deleteButtonClick" + this.selectedCabinetsIds);
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