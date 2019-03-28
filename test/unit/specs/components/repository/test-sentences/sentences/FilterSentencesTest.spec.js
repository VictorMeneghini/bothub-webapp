import { shallowMount, createLocalVue } from '@vue/test-utils';
import FilterSentencesTest from '@/components/repository/test-sentences/sentences/FilterSentencesTest';
import store from '@/store';
import _ from 'lodash';
import BH from 'bh';


const localVue = createLocalVue();
localVue.use(BH);

describe('TestView.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FilterSentencesTest, { localVue, store });
  });

  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Test intent queryString formated', () => {
    beforeEach(() => {
      wrapper.setData({
        intent: 'like',
      });
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeTruthy();
      }, 500);
    });
  });

  describe('Test Label query string formated', () => {
    beforeEach(() => {
      wrapper.setData({
        label: 'animal',
      });
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeTruthy();
      }, 500);
    });
  });

  describe('Test entitie query string formated', () => {
    beforeEach(() => {
      wrapper.setData({
        entitie: 'cat',
      });
    });

    test('valid queryStringFormated emit', () => {
      _.debounce(() => {
        expect(wrapper.emitted('queryStringFormated')).toBeTruthy();
      }, 500);
    });
  });

  describe('Test text query string formated', () => {
    beforeEach(() => {
      wrapper.setData({
        text: 'i like eat sushi',
      });
    });

    test('valid queryStringFormated emit', () => {
      expect(wrapper.emitted('queryStringFormated')).toBeTruthy();
    });
  });
});