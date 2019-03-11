<template>
  <form>
    <button>Button 1</button>
    <button class="bigButton">Button 2</button>
    <button>Button 3</button>
    <button>Button 4</button>

    <a href="#">A link that is styled like a button! 🙀</a>
  </form>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  $purple: #251F47;
  $green: #86CB92;

  @mixin button {
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #333;
    cursor: pointer;
    margin: 0;
    font-size: 16px;
    background: $purple;
    color: #fff;
  }

  button {
    @include button;
  }

  .bigButton {
    font-size: 24px;
    padding: 30px;
  }

  a {
    @include button;
    text-decoration: none;
    // we can overwrite properties
    background: $green;
    color: #333;
  }

</style>
