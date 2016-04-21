/* eslint-env mocha */
import expect from 'expect'
import { offsetLeft } from '../../app/utils/MouseUtils'

describe('MouseUtils', () => {
  describe('offsetLeft', () => {
    it('should calculate a new x coordinate based on element hierarchy offsetLeft properties', () => {
      const element = {
        offsetLeft: 10,
        offsetParent: {
          offsetLeft: 50
        }
      }
      expect(offsetLeft(element)).toEqual(60)
    })
  })
})
