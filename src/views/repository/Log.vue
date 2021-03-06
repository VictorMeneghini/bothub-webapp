<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div
      v-if="authenticated"
      class="repository-log">
      <div v-if="repository">
        <div class="repository-log__header">
          <h1> {{ $t('webapp.menu.inbox') }} </h1>
          <p> {{ $t('webapp.inbox.description') }} </p>
        </div>
        <div class="columns">
          <div class="column is-tree-fifths">
            <div class="control is-expanded has-icons-right">
              <input
                :class="['input', loading ? 'is-loading' : '']"
                v-model="name"
                type="text">
              <span class="icon is-small is-right">
                <b-icon
                  class="repository-log__icon"
                  icon="magnify"/></span>
            </div>
          </div>
          <div class="column is-narrow">
            <div class="control">
              <label>{{ $t('webapp.dashboard.filter_by') }}: </label>
              <div class="select">
                <select v-model="filterOption">
                  <option value="intent"> {{ $t('webapp.inbox.intent') }} </option>
                  <option value="language"> {{ $t('webapp.inbox.language') }} </option>
                  <option value="repository_version_name">
                    {{ $t('webapp.inbox.version') }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column control">
            <b-autocomplete
              v-if="filterOption=='repository_version_name'"
              v-model="filterSearch"
              :loading="versionsList.loading"
              :data="versions"
              :placeholder="$t('webapp.inbox.your_version')"/>
            <b-autocomplete
              v-else-if="filterOption=='intent'"
              :data="repository.intents_list"
              :loading="!repository"
              v-model="filterSearch"
              :placeholder="$t('webapp.inbox.your_intent')"/>
            <b-select
              v-else-if="filterOption=='language'"
              v-model="filterSearch">
              <option
                v-for="language in languages"
                :key="language.id"
                :value="language.value">
                {{ language.title }}
              </option>
            </b-select>
            <b-input
              v-else
              :disabled="true"
              :placeholder="$t('webapp.inbox.your_filter')"/>
          </div>
        </div>

        <repository-log-list
          :per-page="perPage"
          :query="query"
          :editable="repository.authorization.can_contribute" />
      </div>

      <div
        v-else>
        <b-notification
          :closable="false"
          class="is-warning">
          {{ $t('webapp.inbox.cannot_edit_this_repository') }}
        </b-notification>
      </div>
    </div>

    <div
      v-else>
      <b-notification
        :closable="false"
        class="is-danger">
        {{ $t('webapp.inbox.signin_you_account') }}
      </b-notification>
      <login-form hide-forgot-password />
    </div>


  </repository-view-base>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryLogList from '@/components/repository/repository-log/RepositoryLogList';
import LoginForm from '@/components/auth/LoginForm';
import { LANGUAGES } from '@/utils';
import _ from 'lodash';
import RepositoryBase from './Base';

export default {
  name: 'RepositoryLog',
  components: {
    RepositoryViewBase,
    RepositoryLogList,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 10,
      name: '',
      filterOption: null,
      loading: false,
      filterName: {
        repository_version_name: 'version',
        language: 'language',
        intent: 'intent',
      },
      filterSearch: '',
      versionsList: null,
      query: {},
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    languages() {
      return Object.keys(this.repository.evaluate_languages_count)
        .map(lang => ({
          value: lang,
          title: LANGUAGES[lang],
        }));
    },
    repositoryUUID() {
      if (!this.repository || this.repository.uuid === 'null') { return null; }
      return this.repository.uuid;
    },
    versions() {
      return this.versionsList.items.map(version => version.name);
    },
  },
  watch: {
    filterOption() {
      this.filterSearch = '';
    },
    filterSearch: _.debounce(function searchUpdated() {
      this.updateQuery();
    }, 500),
    name: _.debounce(function nameUpdated() {
      this.updateQuery();
    }, 500),
    async repositoryUUID() {
      if (!this.repositoryUUID) { return; }
      this.versionsList = await this.getVersions({
        limit: this.perPage,
        query: { repository: this.repositoryUUID },
      });
      this.versionsList = this.versionsList;
      this.versionsList.getAllItems();
    },
  },
  methods: {
    ...mapActions(['getVersions']),
    updateQuery() {
      const query = {};
      const name = this.name.trim();
      const filterSearch = this.filterSearch.trim();

      if (name !== '') {
        query.search = name;
      }

      if (this.filterOption !== null && filterSearch !== '') {
        query[this.filterOption] = filterSearch;
      }

      this.query = query;
    },
  },
};
</script>

<style lang="scss" scoped>
  label {
    vertical-align: middle;
  }

  .repository-log {
    &__header {
      margin-bottom: 3.5rem;
    }

    &__icon {
      pointer-events: initial !important;
      cursor: pointer;
    }
  }
</style>
