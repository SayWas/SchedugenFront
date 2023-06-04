<template>
  <div class="toolbar">
    <div class="toolbar-content">
      <div class="block">
        <div class="arrows-box">
          <div @click="previousButtonClick" class="arrow-box">
            <LeftArrowIcon/>
          </div>
          <div @click="forwardButtonClick" class="arrow-box">
            <RightArrowIcon/>
          </div>
        </div>
        <div class="date-box">
          <DateIcon class="date"/>
          {{ weekNames[date] }}
        </div>
      </div>
      <div class="block">
        <ExcelIcon @click="exportButtonClick" class="excel-button"></ExcelIcon>
        <WarningIcon @click="warningButtonClick" class="warning-button"
                     :class="{'warning-button-not-mistake':!isMistake}"/>
        <div @click="generateButtonClick" class="button generate-button">Составить(beta)</div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import DateIcon from "@/components/icons/DateIcon.vue";
import WarningIcon from "@/components/icons/WarningIcon.vue";
import ExcelIcon from "@/components/icons/ExcelIcon.vue";

export default {
  name: "ToolbarSchedule",
  components: {ExcelIcon, WarningIcon, DateIcon, RightArrowIcon, LeftArrowIcon},
  data() {
    return {
      weekNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    }
  },
  props: {
    date: {
      type: Number,
      required: true
    },
    isMistake: {
      type: Boolean,
      required: true
    },
    previousButtonClick: {
      type: Function,
      required: true
    },
    forwardButtonClick: {
      type: Function,
      required: true
    },
    warningButtonClick: {
      type: Function,
      required: true
    },
    generateButtonClick: {
      type: Function,
      required: true
    },
    exportButtonClick: {
      type: Function,
      required: true
    }
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
  align-items: center;
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

.excel-button {
  height: 20px;
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
  transition: 0.05s ease-out;
}

.excel-button:active {
  transform: scale(1.1);
}

.warning-button {
  height: 30px;
  width: 30px;
  margin-right: 5px;
  cursor: pointer;
}

.warning-button-not-mistake {
  opacity: 0.5;
}

.generate-button {
  color: #14A011;
}
</style>