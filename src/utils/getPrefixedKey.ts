import config from '../config'

const getPrefixedKey = (key: string) => `${config.storagePrefix}:${key}`

export default getPrefixedKey
