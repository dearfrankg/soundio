import { getHost } from '../utils/BrowserUtils'

const DEV_HOST = '74.51.152.192'

export const CLIENT_ID = getHost() !== DEV_HOST
  ? '7e4a9d141f0ce3e060041276d3cb885b'
  : '24d462cf8ff32f2315b7835960fb34b5'
