<template>
    <input :type="type" :value="value" :id="id" :step="step" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    step: {
      type: String,
      required: false,
    },
  },
};
</script>