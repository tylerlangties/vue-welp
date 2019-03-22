const mockAxios = {
  get: jest.fn(() => ({ data: { restaurants: 'restaurants' } }))
}

export default mockAxios
