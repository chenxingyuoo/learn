<template>
	<div class="parent">
	    <router-link :to="{path : 'child'}">child</router-link> 
	    <h2>Essential Links</h2>
	    <h2>Essential Links</h2>
	    <h2>Essential Links</h2>
	    <h2>Essential Links</h2>
		<div class="child">
			<router-view class="child-wrap"></router-view>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>