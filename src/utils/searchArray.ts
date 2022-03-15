const searchArray = <T>(data: T[] = [], searchTerm: string = '') => {
  const searchRegex = new RegExp(searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
  return data.filter((row: any) => {
    return Object.keys(row).some((field) => {
      return searchRegex.test(row[field]?.toString())
    })
  })
}

export default searchArray
