import { IFile } from '../types/strapi'

const imageUrlFromMedia = (media?: IFile | null): string | undefined =>
  media?.url ||
  media?.formats?.large?.url ||
  media?.formats?.medium?.url ||
  media?.formats?.small?.url ||
  media?.formats?.thumbnail?.url

export default imageUrlFromMedia
