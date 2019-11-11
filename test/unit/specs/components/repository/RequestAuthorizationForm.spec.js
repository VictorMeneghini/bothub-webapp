/* eslint-disable import/first */
jest.mock('@/api/request');

import { shallowMount, createLocalVue } from '@vue/test-utils';
import BH from 'bh';
import store from '@/store';
import TYPES from '@/store/types';
import RequestAuthorizationForm from '@/components/repository/RequestAuthorizationForm';


const localVue = createLocalVue();
localVue.use(BH);

describe('RequestAuthorizationForm.vue', () => {
  let wrapper;
  beforeEach(async () => {
    store.replaceState({
      Auth: {},
    });
    store.commit(TYPES.SET_TOKEN, '1f5e7e21d331536b58448595f69eb50a6b5e49b8');
    wrapper = shallowMount(RequestAuthorizationForm, {
      localVue,
      store,
      propsData: {
        repositoryUuid: '8511fd26-a3bc-4f74-9af1-176abca5401d',
      },
    });
    await wrapper.vm.updateFormSchema();
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('check schema', () => {
    expect(wrapper.vm.formSchema).not.toBeNull();
  });

  // describe('fill data', () => {
  //   beforeEach(() => {
  //     wrapper.vm.data = {
  //       description: 'I can contribute',
  //     };
  //   });

  //   describe('submit', () => {
  //     let r;
  //     beforeEach(async () => {
  //       r = await wrapper.vm.onSubmit();
  //     });

  //     test('return true', () => {
  //       expect(r).toBeTruthy();
  //     });
  //   });
  // });
});
