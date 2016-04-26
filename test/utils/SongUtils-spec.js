/* eslint-env mocha */
import expect from 'expect'
import * as SongUtils from '../../app/utils/SongUtils'
import { CLIENT_ID } from '../../app/constants/Config'
import { IMAGE_SIZES } from '../../app/constants/SongConstants'

describe('SongUtils', () => {
  const baseUrlRE = `//api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=50&offset=0`.replace('?', '\\?')
  const timeStampRE = '&created_at\\[from\\]=' + '\\d{4}-\\d{2}-\\d{2}%\\d{4}:\\d{2}:\\d{2}'

  describe('constructUrl', () => {
    it('should add tags, timestamp params when the category is a known genre', () => {
      const categoryString = 'house - echo in the house'
      const tagsRE = '&tags=house'
      expect(SongUtils.constructUrl(categoryString)).toMatch(
        new RegExp(baseUrlRE + tagsRE + timeStampRE)
      )
    })

    it('should append the word house to the tags param when it is a known genre not being house, trance or dubstep', () => {
      const categoryString = 'tropical - echo in the house'
      const tagsRE = '&tags=tropical house'
      expect(SongUtils.constructUrl(categoryString)).toMatch(
        new RegExp(baseUrlRE + tagsRE + timeStampRE)
      )
    })

    it('should add q, timestamp params when the category is not a known genre', () => {
      const categoryString = 'ghetto - echo in the house'
      const tagsRE = '&q=ghetto'
      expect(SongUtils.constructUrl(categoryString)).toMatch(
        new RegExp(baseUrlRE + tagsRE + timeStampRE)
      )
    })
  })

  describe('constructSongCommentsUrl', () => {
    it('should construct proper song comments url', () => {
      const songId = '12345'
      expect(SongUtils.constructSongCommentsUrl(songId)).toEqual(
        `//api.soundcloud.com/tracks/${songId}/comments?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('constructSongUrl', () => {
    it('should construct proper song url', () => {
      const songId = '12345'
      expect(SongUtils.constructSongUrl(songId)).toEqual(
        `//api.soundcloud.com/tracks/${songId}?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('constructUserSongsUrl', () => {
    it('should construct proper user songs url', () => {
      const userId = '12345'
      expect(SongUtils.constructUserSongsUrl(userId)).toEqual(
        `//api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('getImageUrl', () => {
    it('should construct proper image url', () => {
      const s = 'http://www.yahoo.com/large_image44.jpg'
      const size = IMAGE_SIZES.LARGE
      expect(SongUtils.getImageUrl(s, size)).toEqual(
        '//www.yahoo.com/t300x300_image44.jpg'
      )
    })
  })
})
