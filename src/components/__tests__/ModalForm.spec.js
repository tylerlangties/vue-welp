import Vuex from 'vuex'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ModalForm from '@/components/ModalForm.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()

localVue.use(Vuelidate)
localVue.use(BootstrapVue)
localVue.use(Vuex)

describe('ModalForm.vue', () => {
  it('Data - should return an object', () => {
    const mockedObject = {
      rating: 1,
      user: '',
      title: '',
      review: '',
      date: new Date().toLocaleString()
    }

    const wrapper = shallowMount(ModalForm, { localVue })

    const result = wrapper.vm.createFreshFormObject()
    expect(result).toBeTruthy()
    expect(wrapper.vm.review).toEqual(mockedObject)
  })

  it('should call showModal method onClick', () => {
    const wrapper = mount(ModalForm, { localVue })
    wrapper.vm.showModal()

    wrapper.setMethods({ showModal: jest.fn() })
    wrapper.find('.modalToggle').trigger('click')
    expect(wrapper.vm.showModal).toHaveBeenCalledTimes(1)
  })
  it('should return null if form is invalid', () => {
    const wrapper = mount(ModalForm, { localVue })
    expect(wrapper.vm.invalid()).toEqual(null)

    wrapper.setMethods({ invalid: jest.fn() })
    wrapper.find('.submitButton').trigger('click')
    expect(wrapper.vm.invalid).toHaveBeenCalledTimes(1)
  })

  it('Vuelidate - validator should be loaded', () => {
    const wrapper = mount(ModalForm, { localVue })
    expect(wrapper.vm.$v).toBeTruthy
  })
  it('should be valid when fields are filled', () => {
    const actions = {
      createReview: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        restaurant: {
          namespaced: true,
          actions
        }
      }
    })
    const wrapper = mount(ModalForm, { store, localVue })

    const input = wrapper.find('[data-username]')
    const title = wrapper.find('[data-title]')
    const review = wrapper.find('[data-review]')

    input.setValue('some value')
    title.setValue('some value')
    review.setValue('some value')

    wrapper.vm.$forceUpdate()
    wrapper.vm.createReview()
    wrapper.vm.hideModal()
    expect(wrapper.vm.$v.$invalid).toBe(false)
  })
  it('returns null when invalid', () => {
    const wrapper = mount(ModalForm, { localVue })
    expect(wrapper.vm.createReview()).toEqual(null)
  })
})
