<template>
    <div class="page-content">
        <Toolbar :date="date" :previous-button-click="previousButtonClick" :forward-button-click="forwardButtonClick" :generate-button-click="generateButtonClick"/>
        <Schedule :date="date" :classes="classes" :lessons="lessons" :subjects="subjects"/>
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
            // 03.04
            date: new Date,
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
                },
                {
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
                }
            ],
            lessons: [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },
                {
                    id: 7
                },
                {
                    id: 8
                }
            ],
            subjects: [
                [
                    {
                        name: "None",
                    },
                    {
                        name: "Математика",
                        cabinet: 101
                    },
                    {
                        name: "Русский язык",
                        cabinet: 202
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "Литература",
                        cabinet: 101
                    },
                    {
                        name: "Информатика",
                        cabinet: 202
                    },
                    {
                        name: "Физика",
                        cabinet: 201
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ],
                [
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    },
                    {
                        name: "None",
                    }
                ]
            ]
        }
    },
    methods: {
        previousButtonClick() {
            this.date.setDate(this.date.getDate() - 1);
            console.log(this.date);
        },
        forwardButtonClick() {
            this.date.setDate(this.date.getDate() + 1);
            console.log(this.date);
        },
        generateButtonClick() {
            // this.generateCalendar();
        },
    }
}
</script>

<style scoped>
.page-content {
    flex: 1;
}
</style>