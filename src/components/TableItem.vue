<template>
    <div class="table-content table-item">
        <div class="f-center check-box-zone">
            <CheckBoxIcon v-if="!selectedItemIds.includes(itemId)" class="check-box position-absolute"/>
            <CheckBoxCheckedIcon v-else class="check-box position-absolute"/>
            <input :value="itemId" v-model="selectedItemIds" type="checkbox" class="check-box opacity-zero">
        </div>
        <slot name="table-item-content">

        </slot>
        <div class="edit-button-zone f-center">
            <EditButtonIcon @click="editButtonClick(itemId)" class="edit-button"/>
        </div>
    </div>
</template>

<script>
import CheckBoxIcon from "@/components/icons/CheckBoxIcon.vue";
import CheckBoxCheckedIcon from "@/components/icons/CheckBoxCheckedIcon.vue";
import EditButtonIcon from "@/components/icons/EditButtonIcon.vue";

export default {
    name: "TableItem",
    components: {CheckBoxCheckedIcon, CheckBoxIcon, EditButtonIcon},
    data() {
        return {
            isSelected: false,
        }
    },
    props: {
        selectedIds: {type: Array, required: true},
        editButtonClick: {Function, required: true},
        itemId: {Number, required: true},
    },
    methods:{
        selectChanged(){
            this.isSelected = !this.isSelected;
        }
    },
    emits: ['update:selectedIds'],
    computed: {
        selectedItemIds: {
            get() {
                return this.selectedIds;
            },
            set(value) {
                this.$emit('update:selectedIds', value);
            }
        }
    }
}
</script>

<style scoped>

.table-content {
    display: grid;
    grid-auto-flow: column;
    width: fit-content;
}

.table-item {
    height: 40px;
}

.f-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.opacity-zero{
    opacity: 0;
}

.position-absolute {
    position: absolute;
}

.table-item .check-box-zone {
    width: 35px;
}

.table-item .check-box {
    width: 18px;
    height: 19px;
    cursor: pointer;
}

.table-item .edit-button-zone {
    width: 18px;
}

.table-item .edit-button {
    width: 18px;
    height: 18px;
    cursor: pointer;
}
</style>