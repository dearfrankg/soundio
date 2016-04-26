/* eslint-env mocha */
import expect from 'expect'
import { getPlayingSongId, getPlayingPlaylist } from '../../app/utils/PlayerUtils'

describe('PlayerUtils', () => {
  const player = {
    currentSongIndex: 2,
    selectedPlaylists: [0, 1, 2]
  }
  const playlist = [
    {name: 'playlist1', items: ['songIdx']},
    {name: 'playlist2', items: ['songIdy']},
    {name: 'playlist3', items: ['songId1', 'songId2', 'songId3']}
  ]

  describe('getPlayingSongId', () => {
    it('should get playing song id', () => {
      expect(getPlayingSongId(player, playlist)).toEqual(
        'songId3'
      )
    })
  })

  describe('getPlayingPlaylist', () => {
    it('should get the index of the playing playlist', () => {
      expect(getPlayingPlaylist(player)).toEqual(
        2
      )
    })
  })
})
