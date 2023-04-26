<template>
    <div class="table">
        <div class="f-border-bottom">
            <div class="table-content table-header">
                <div class="check-box-zone f-center">
                    <CheckBoxIcon @click="selectAllClick" v-if="!isCheckBoxSelected" class="check-box"/>
                    <CheckBoxCheckedIcon @click="selectAllClick" v-else class="check-box"/>
                </div>
                <div class="number f-center">
                    #
                </div>
                <slot name="table-header-content">

                </slot>
            </div>
        </div>
        <slot name="table-item-content">

        </slot>
    </div>
</template>

<script>
import TableItem from "@/components/TableItem.vue";
import CheckBoxIcon from "@/components/icons/CheckBoxIcon.vue";
import CheckBoxCheckedIcon from "@/components/icons/CheckBoxCheckedIcon.vue";

export default {
    name: "Table",
    components: {TableItem, CheckBoxIcon, CheckBoxCheckedIcon},
    props: {
        isCheckBoxSelected: {type: Boolean, required: true},
        selectAllClick: {Function, required: true}
    }
}
</script>

<style scoped>
.table-content {
    display: grid;
    grid-auto-flow: column;
    width: fit-content;
}

.table-header {
    height: 27px;
}

.f-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.table .check-box-zone {
    width: 35px;
}

.table .check-box {
    width: 18px;
    height: 19px;
    cursor: pointer;
}

.table .number {
    width: 30px;
}

.f-border-bottom {
    flex: 1;
    border-bottom: 1px solid #e5e5e5;
}
</style>