<template>
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1 class="title">Что вы можете?</h1>
                
                <ul class="hero-list">
                    <li class="hero-item">Контролировать и записывать свои расходы за определенное время</li>
                    <li class="hero-item">смотреть расходы и заработки других участников</li>
                    <li class="hero-item">Имеется открытый рейтинг участников</li>  
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="scss">
.hero { 
    
    &-list {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    &-item {
        font-size: 18px;
        position: relative;
        padding-left: 30px;

        &::after {
            content:"";
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: orange;
            left: 0;
            top: 50%;
            transform: translate(0%, -50%);
        }
    }
}
</style>