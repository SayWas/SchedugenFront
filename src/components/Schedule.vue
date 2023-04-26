<template>
    <div class="table">
        <div class="table-content table-header border-bottom">
            <div class="date f-center">
                {{ date }}
            </div>
            <div v-for="cl in classes" :key="cl.id" class="schedule-field f-center">
                {{ cl.name }}
            </div>
        </div>
        <div v-for="lesson in lessons" :key="lesson.id" class="table-content table-row border-bottom">
            <div class="date lesson-number sticky-left f-center">
                {{ lesson.id }} урок
            </div>
            <div v-for="cl in classes" :key="cl.id" class="schedule-field f-center">

            </div>
        </div>
    </div>
</template>

<script>
import CheckBoxIcon from "@/components/icons/CheckBoxIcon.vue";
import CheckBoxCheckedIcon from "@/components/icons/CheckBoxCheckedIcon.vue";

export default {
    name: "Schedule",
    components: {CheckBoxCheckedIcon, CheckBoxIcon},
    props: {
        date: {
            type: String,
            required: true
        },
        classes: {
            type: Array,
            required: true
        },
        lessons: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.table {
    /*width: 85vw;*/
    flex: 1;
    overflow-x: auto;
}

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

.table .date {
    width: 95px;
    border-right: 1px solid #e5e5e5;
}

.table .lesson-number {
    height: 95px;
}

.table .schedule-field {
    width: 250px;
    border-right: 1px solid #e5e5e5;
}

.table .number {
    width: 30px;
}

.border-bottom {
    border-bottom: 1px solid #e5e5e5;
}
</style>