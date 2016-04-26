/* eslint-env mocha */
import expect from 'expect'
import LocalStorageUtils from '../../app/utils/LocalStorageUtils'

//
// NOTE: mock-local-storage loaded via package.json test script.
// "test": "mocha --compilers js:babel-core/register --recursive -r mock-local-storage"
//

describe('LocalStorageUtils', () => {
  describe('set', () => {
    it('should save data into localStorage', () => {
      LocalStorageUtils.set('volume', 0.5)
      expect(localStorage.getItem('volume')).toEqual('0.5')
    })
  })

  describe('get', () => {
    it('should get data from localStorage', () => {
      localStorage.setItem('volume', 0.5)
      expect(LocalStorageUtils.get('volume')).toEqual('0.5')
    })
  })
})
