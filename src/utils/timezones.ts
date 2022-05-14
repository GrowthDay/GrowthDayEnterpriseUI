// @ts-ignore
import tzdata from 'tzdata'
import { pickBy, without } from 'lodash'
import dayjs from 'dayjs'

// These timezones causes crashes in android. They are valid IANA timezones, though android does not support them.
const unSupportedTimezones = [
  'America/Nuuk',
  'Pacific/Kanton',
  'MET',
  'WET',
  'EET',
  'CET',
  'EST',
  'MST',
  'Factory',
  'HST',
  'EST5EDT',
  'CST6CDT',
  'MST7MDT',
  'MST7MDT',
  'PST8PDT'
  // 'Asia/Qostanay',
  // 'Africa/Juba',
  // 'America/Bahia_Banderas',
  // 'America/Creston',
  // 'America/Fort_Nelson',
  // 'America/Kralendijk',
  // 'America/Lower_Princes',
  // 'America/Matamoros',
  // 'America/Metlakatla',
  // 'America/North_Dakota/Beulah',
  // 'America/Punta_Arenas',
  // 'America/Santa_Isabel',
  // 'America/Sitka',
  // 'Antarctica/Macquarie',
  // 'Antarctica/Troll',
  // 'Asia/Atyrau',
  // 'Asia/Barnaul',
  // 'Asia/Chita',
  // 'Asia/Famagusta',
  // 'Asia/Hebron',
  // 'Asia/Khandyga',
  // 'Asia/Qostanay',
  // 'Asia/Qostanay',
  // 'Asia/Tomsk',
  // 'Asia/Ust-Nera',
  // 'Asia/Yangon',
  // 'Europe/Astrakhan',
  // 'Europe/Busingen',
  // 'Europe/Kirov',
  // 'Europe/Saratov',
  // 'Europe/Ulyanovsk',
  // 'Pacific/Bougainville',
  // 'Pacific/Chuuk',
  // 'Pacific/Pohnpei',
]

export const timezones = () =>
  without(Object.keys(pickBy(tzdata.zones, Array.isArray)), ...unSupportedTimezones).filter((tz) => {
    try {
      dayjs().tz(tz).isValid()
      return true
    } catch (e) {
      return false
    }
  })

export default timezones
