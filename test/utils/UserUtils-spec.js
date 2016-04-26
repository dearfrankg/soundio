/* eslint-env mocha */
import expect from 'expect'
import * as UserUtils from '../../app/utils/UserUtils'
import { CLIENT_ID } from '../../app/constants/Config'

describe('UserUtils', () => {
  describe('constructUserFollowingsUrl', () => {
    it('should construct proper user followings url', () => {
      const userId = '12345'
      expect(UserUtils.constructUserFollowingsUrl(userId)).toEqual(
        `//api.soundcloud.com/users/${userId}/followings?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('constructUserProfilesUrl', () => {
    it('should construct proper user profiles url', () => {
      const userId = '12345'
      expect(UserUtils.constructUserProfilesUrl(userId)).toEqual(
        `//api.soundcloud.com/users/${userId}/web-profiles?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('constructUserTracksUrl', () => {
    it('should construct proper user tracks url', () => {
      const userId = '12345'
      expect(UserUtils.constructUserTracksUrl(userId)).toEqual(
        `//api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('constructUserUrl', () => {
    it('should construct proper user url', () => {
      const userId = '12345'
      expect(UserUtils.constructUserUrl(userId)).toEqual(
        `//api.soundcloud.com/users/${userId}?client_id=${CLIENT_ID}`
      )
    })
  })

  describe('getUserLocation', () => {
    it('should provide user city and country if both are available', () => {
      const user = {
        city: 'San Francisco',
        country: 'USA'
      }
      expect(UserUtils.getUserLocation(user)).toEqual(
        `${user.city}, ${user.country}`
      )
    })

    it('should provide user city when that is only available', () => {
      const user = {
        city: 'San Francisco'
      }
      expect(UserUtils.getUserLocation(user)).toEqual(
        user.city
      )
    })

    it('should provide user country when that is only available', () => {
      const user = {
        country: 'USA'
      }
      expect(UserUtils.getUserLocation(user)).toEqual(
        user.country
      )
    })
  })
})
