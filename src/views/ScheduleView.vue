<template>
    <div class="page-content">
        <Toolbar :toggle-modal="addButtonClick" :delete-button-click="deleteButtonClick"/>
        <Schedule :date="date" :classes="classes" :lessons="lessons"/>
    </div>
</template>

<script>
import Toolbar from "@/components/ToolbarSchedule.vue";
import Schedule from "@/components/Schedule.vue";

export default {
    name: "ScheduleView",
    components: {Schedule, Toolbar},
    data() {
        return {
            date: "03.04",
            classes: [
                {
                    id: 1,
                    name: "1 класс"
                },
                {
                    id: 2,
                    name: "2 класс"
                },
                {
                    id: 3,
                    name: "3 класс"
                },
                {
                    id: 4,
                    name: "4 класс"
                },
                {
                    id: 5,
                    name: "5 класс"
                },
                {
                    id: 6,
                    name: "6 класс"
                },
                {
                    id: 7,
                    name: "7 класс"
                }, {
                    id: 8,
                    name: "8 класс"
                },
                {
                    id: 9,
                    name: "9 класс"
                },
                {
                    id: 10,
                    name: "10 класс"
                },
                {
                    id: 11,
                    name: "11 класс"
                },
                {
                    id: 12,
                    name: "12 класс"
                }
            ],
            lessons: [
                {
                    id: 1
                },
                {
                    id: 2
                }
            ]
        }
    }
}
</script>

<style scoped>
.page-content {
    /* flex: 1; */
    width: -webkit-fill-available;
    height: calc(100vh - 60px);
    max-height: calc(100vh - 60px);
    overflow: auto;
}
</style>