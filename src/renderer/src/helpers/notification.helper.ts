export const showNotification = (title: string, body?: string): void => {
  const content = `${title} - ${body}`
  alert(content)
}
