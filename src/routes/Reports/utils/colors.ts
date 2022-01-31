import { sample } from 'lodash-es'
import { useRef } from 'react'

const colors = ['#ea5545', '#f46a9b', '#ef9b20', '#edbf33', '#ede15b', '#bdcf32', '#87bc45', '#27aeef', '#b33dc6']

export const useDefaultChartColor = () => useRef(sample(colors)).current

export default colors
