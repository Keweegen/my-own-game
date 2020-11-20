export default (context, extension) =>
  context.keys().reduce((modules, file) => {
    const module = context(file)

    const keyPattern = new RegExp(`(^.\\/)|(\\.${extension}$)`, 'g')
    const key = file.replace(keyPattern, '')

    return { ...modules, [key]: module.default || module }
  }, {})
