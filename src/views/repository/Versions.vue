<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div class="versions">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2>Versions</h2>
          <b-button
            class="version__header__button has-text-weight-bold"
            type="is-primary"
            @click="addNewVersion()">
            Add new
          </b-button>
        </div>
        <p> Add, edit and choose versions of your bot intelligence. </p>
      </div>
      <section>
        <b-table
          :data="data"
          paginated
          :per-page="perPage"
          :current-page="2"
          :pagination-simple="isPaginationSimple"
          backend-pagination
          :loading="list.loading"
          @page-change="onPageChange"
          :total="totalPagination"
        >
          <template slot-scope="props">
            <b-table-column
              field="id"
              label="version"
              width="40"
              sortable
              centered
              numeric>
              <span
                class="versions__table__version-number"
                @click="handleVersion(props.row.id, props.row.data.name)">
                {{ props.row.data.name }}
              </span>
            </b-table-column>
            <b-table-column
              centered
              field="last_update"
              label="Last update"
              sortable >
              {{ props.row.data.last_update | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              field="created_at"
              label="Date Created"
              sortable >
              {{ props.row.data.created_at | moment('from') }}
            </b-table-column>
            <b-table-column
              centered
              width="180"
              label="">
              <div class="versions__table__buttons-wrapper">
                <b-button
                  :type="props.row.data.is_default ? 'is-primary': 'is-light'"
                  class="is-small"
                  rounded
                  @click="handleDefaultVersion(props.row.data.id, props.row.data.name)">Main</b-button>
                <b-icon icon="pencil"/>
                <b-icon icon="delete"/>
              </div>
            </b-table-column>
          </template>
        </b-table>
      </section>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions } from 'vuex';
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';


export default {
  name: 'RepositoryVersions',
  components: {
    RepositoryViewBase,
  },
  extends: RepositoryBase,
  data() {
    return {
      data: [],
      isPaginationSimple: false,
      currentPage: 1,
      perPage: 20,
      totalPagination: 0,
      versions: [],
      list: []
    };
  },
  mounted() {
    this.updateVersions();
  },
  methods: {
    ...mapActions([
      'getVersions',
      'setRepositoryVersion',
      'setDefaultVersion',
    ]),
    onPageChange() {
      this.list.next();
    },
    async updateVersions() {
      this.list = await this.getVersions(this.repository.uuid);
      this.data = await this.list.next();
      this.totalPagination = this.list.count;
    },
    async teste() {
      await this.list.next();
    },
    handleVersion(id, name) {
      this.setRepositoryVersion({
        id,
        name,
      });
    },
    handleDefaultVersion(id, name) {
      this.setDefaultVersion(this.repository.uuid, id, name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/src/assets/scss/colors.scss';
@import '~@/assets/scss/utilities.scss';
@import '~bh/src/assets/scss/variables.scss';

.versions {
  margin: auto;
  max-width: $max-repository-card-width;

  &__header {
    margin: 3.875rem 0 2.75rem 0;

    &__title {
      &__wrapper {
        display: flex;
        align-items: flex-start;
      }
    }

    &__button {
      font-weight: bold;
      margin: 0 1rem;
    }
  }

  &__table {
    &__version-number {
      color: $primary;
      font-weight: bold;
      cursor: pointer;
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      color: $color-grey-dark;
    }
  }
}
</style>
