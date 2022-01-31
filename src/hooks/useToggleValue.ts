const useToggleValue = <T>(condition: boolean, value1: T, value2: T) => (condition ? value1 : value2)

export default useToggleValue
