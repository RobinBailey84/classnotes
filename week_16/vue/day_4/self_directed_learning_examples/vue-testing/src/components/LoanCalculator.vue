<template lang="html">
	<p id="result">You can afford a mortgage of £{{ salary * 3.5 }}.</p>
</template>

<script>
export default {
	props: ["salary"]
}
</script>

<style lang="css" scoped>
</style>
