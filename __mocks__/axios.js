export default {
  get: jest.fn(() => ({ data: { restaurants: 'restaurants' } })),
  post: jest.fn(),
  // () => {
  //   return new Promise(resolve => {
  //     resolve(true)
  //   })
  // },
  delete: jest.fn()
}
