<template>
  <div class="evaluate-example-list">
    <pagination
      v-if="examplesList"
      :item-component="exampleItemElem"
      :list="examplesList"
      :repository="repository"
      @itemDeleted="onItemDeleted($event)" />
    <p
      v-if="examplesList && examplesList.empty"
      class="no-examples">{{ $t('webapp.evaluate.no_sentences') }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Pagination from '@/components/shared/Pagination';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'EvaluateExampleList',
  components: {
    Pagination,
  },
  props: {
    query: {
      type: Object,
      default: () => ({}),
    },
    language: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      examplesList: null,
      exampleItemElem: ExampleAccordion,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
      repositoryVersion: state => state.Repository.repositoryVersion,
    }),
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
    repository() {
      this.updateExamples(true);
    },
  },
  mounted() {
    this.updateExamples();
  },
  methods: {
    updateExamples(force = false) {
      if (!this.examplesList || force) {
        this.examplesList = this.$api.evaluateExample.search(
          this.repository.uuid,
          this.repositoryVersion,
          this.query,
        );
      }
    },
    onItemDeleted() {
      this.$emit('deleted');
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluate-example-list {
  width: 100%;
  margin: 0 auto;
}

.no-examples {
  margin-left: 14px;
}
</style>
