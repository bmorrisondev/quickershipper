<template>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/multiship" class="nav-link">Multiship Mode</router-link>
            </li>
            <!-- <li class="nav-item">
                <a @click="toggleMultiMode()" class="nav-link">
                    Multimode
                    <img v-if="!isMultiMode" src="@/assets/icons/toggle-off-30.png" />
                    <img v-else src="@/assets/icons/toggle-on-30.png" />
                </a>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    name: "Menu"
}
</script>

<style>

</style>
