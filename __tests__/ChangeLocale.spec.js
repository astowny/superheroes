import ChangeLocale from "../src/components/ChangeLocale";
import { mount, createLocalVue } from "@vue/test-utils";
import { setupI18n } from './i18n.ts'

const localVue = createLocalVue()

const i18n = setupI18n(localVue)


test('display change locale', () => {
  const wrapper = mount(ChangeLocale, {
    localVue,
    i18n
  })
  expect(wrapper).toMatchSnapshot();
})