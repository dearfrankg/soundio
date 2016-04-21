/* eslint-env mocha */
import expect from 'expect'
import * as formatUtils from '../../app/utils/FormatUtils'
import { CLIENT_ID } from '../../app/constants/Config'

describe('FormatUtils', () => {
  describe('addCommas', () => {
    it('should add commas to a string based number, changing 10000 to 10,000', () => {
      const numberString = '10000'
      expect(formatUtils.addCommas(numberString)).toEqual(
        '10,000'
      )
    })
  })

  describe('formatSongTitle', () => {
    it('should format a song title by capturing after the last \' - \'', () => {
      const songTitle = 'sade - kiss of life'
      expect(formatUtils.formatSongTitle(songTitle)).toEqual(
        'kiss of life'
      )
    })
  })

  describe('formatSeconds', () => {
    const seconds = 3020
    it('should convert number of seconds to string of minutes:seconds', () => {
      expect(formatUtils.formatSeconds(seconds)).toEqual(
        '50:20'
      )
    })
  })

  describe('formatStreamUrl', () => {
    it('should construct streamUrl adding client_id as the query string', () => {
      const string = '/one/two/three'
      expect(formatUtils.formatStreamUrl(string)).toEqual(
        `/one/two/three?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('getSocialIcon', () => {
    it('should return social icon class', () => {
      const string = 'facebook'
      expect(formatUtils.getSocialIcon(string)).toEqual(
        'ion-social-facebook'
      )
    })
  })
})
