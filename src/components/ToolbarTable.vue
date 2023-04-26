<template>
    <div class="toolbar">
        <div class="toolbar-content">
            <div class="left-block">
                <div @click="toggleModal" class="button add-button">Добавить</div>
                <div @click="deleteButtonClick" class="button delete-button">Удалить</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ToolbarTable",
    props: {
        toggleModal: {
            type: Function,
            required: true
        },
        deleteButtonClick: {
            type: Function,
            required: true
        }
    }
};
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
    align-items: center;
}

.toolbar .left-block {
    display: flex;
    margin: 20px;
    justify-content: space-between;
    width: 140px;
}

.toolbar .button {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 3px;
}

.add-button {
    color: #14A011;
}

.delete-button {
    color: #BE1D1D;
}
</style>