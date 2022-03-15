import * as yup from 'yup'

const mergeSchemas = (...schemas: yup.AnyObjectSchema[]): yup.AnyObjectSchema => {
  const [first, ...rest] = schemas
  return rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first)
}

export default mergeSchemas
