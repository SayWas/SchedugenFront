<template>
    <div class="toolbar">
        <div class="toolbar-content">
            <div class="block">
                <div class="arrows-box">
                    <div class="arrow-box">
                        <LeftArrowIcon/>
                    </div>
                    <div class="arrow-box">
                        <RightArrowIcon/>
                    </div>
                </div>
                <div class="date-box">
                    <DateIcon class="date"/>
                    3 апреля. 2023 г.
                </div>
            </div>
            <div class="block">
                <div class="button filter-button">Фильтр</div>
                <div class="button generate-button">Составить</div>
            </div>
        </div>
    </div>
</template>

<script>
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import DateIcon from "@/components/icons/DateIcon.vue";

export default {
    name: "ToolbarSchedule",
    components: {DateIcon, RightArrowIcon, LeftArrowIcon},
    props: {

    }
}
</script>

<style scoped>
.toolbar {
    flex: 1;
    border-bottom: 1px solid #e5e5e5;
    height: 60px;
}

.toolbar-content {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}

.toolbar .block {
    display: flex;
    margin: 20px;
    justify-content: space-between;
}

.toolbar .arrows-box {
    display: flex;
    justify-content: space-between;
    width: 75px;
    transition: 0.1s ease-out;
}

.toolbar .arrow-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    cursor: pointer;
    border: solid 2px #E9EDF5;
    border-radius: 10px;
}

.toolbar .arrow-box:hover {
    border: solid 3px #E9EDF5;
}

.toolbar .arrow-box:active {
    background-color: #E9EDF5;
}

.toolbar .date-box {
    display: flex;
    align-items: center;
}

.toolbar .date {
    margin-left: 15px;
    margin-right: 5px;
}

.toolbar .button {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 3px;
}

.filter-button {
    margin-right: 20px;
}

.generate-button {
    color: #14A011;
}
</style>