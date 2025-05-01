<template>
    <button :id="id">{{ text }}</button>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>