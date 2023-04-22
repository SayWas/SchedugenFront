<template>
    <transition name="modal-animation">
        <div v-show="modalIsActive" class="modal">
            <transition name="modal-animation-inner">
                <div v-show="modalIsActive" class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">
                            <slot name="modal-title"/>
                        </div>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body"/>
                    </div>
                    <div class="modal-footer">
                        <div class="modal-footer-buttons">
                            <div @click="modalApplyClick" class="button apply-button">Подтвердить</div>
                            <div @click="close" class="button cancel-button">Отменить</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal",
    props: {
        modalIsActive: {
            type: Boolean,
            required: true
        },
        modalApplyClick: {
            type: Function,
            required: true
        }
    },
    setup(props, {emit}) {
        const close = () => {
            emit("close");
        };
        return {close};
    },
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}

.modal .modal-content {
    display: flex;
    flex-direction: column;
    width: 600px;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: white;
}

.modal .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    background-color: var(--color-header);
}

.modal .modal-title {
    font-size: 20px;
    font-weight: normal;
    color: white;
}

.modal .modal-body {
    flex: 1;
    padding: 20px;
}

.modal .modal-footer {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #e5e5e5;
}

.apply-button {
    color: #14A011;
}

.modal .cancel-button {
    color: #BE1D1D;
}

.modal .button {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 3px;
}

.modal .modal-footer-buttons{
    display: flex;
    justify-content: space-between;
    width: 170px;
}
</style>