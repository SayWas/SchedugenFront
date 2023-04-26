<template>
<div class="lesson">
    <div class="lesson-subject">{{subject}}</div>
    <div class="lesson-cabinet">{{cabinet}}</div>
</div>
</template>

<script>
export default {
    name: "ScheduleLesson",
    props: {
        lessonId: {
            type: Number,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        cabinet: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.lesson{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 240px;
    height: 85px;
    background-color: #DBEFFD;
    border-radius: 5px;
}
.lesson-subject{
    align-self: start;
    margin-left: 10px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #687182;
}
.lesson-cabinet{
    align-self: end;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #687182;}
</style>