<template>
  <b-tooltip
    :active="!!helpText"
    :label="helpText"
    multilined
    class="blocked">
    <b-select
      v-model="role"
      v-bind="$attrs"
      expanded>
      <option
        v-for="(label, value) in roles"
        :value="value"
        :key="value">
        {{ label }}
      </option>
    </b-select>
  </b-tooltip>
</template>

<script>
import {
  ROLES, ROLE_USER, ROLE_CONTRIBUTOR, ROLE_ADMIN, ROLE_TRANSLATE,
} from '@/utils';

const helpTextDict = {
  [ROLE_USER]: 'Can read and analyze',
  [ROLE_CONTRIBUTOR]: 'Can read, analyze and contribute with examples and translations',
  [ROLE_ADMIN]: 'Can read, analyze, contribute and write repository config',
  [ROLE_TRANSLATE]: 'Can read, analyze and create translations for intelligence',
};

export default {
  name: 'RoleSelect',
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      roles: ROLES,
      role: this.value,
    };
  },
  computed: {
    helpText() {
      if (this.role === null) {
        return null;
      }

      return helpTextDict[this.role];
    },
  },
  watch: {
    value() {
      this.role = this.value;
    },
    role() {
      this.$emit('input', this.role);
    },
  },
};
</script>

<style lang="scss" scoped>
.blocked {
  display: block;
}
</style>
