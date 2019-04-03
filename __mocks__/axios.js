export default {
  get: jest.fn(() => ({ data: { restaurants: 'restaurants' } })),
  post: jest.fn(),
  delete: jest.fn()
}
