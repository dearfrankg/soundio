export const getHost = () => {
  return (typeof window !== 'undefined')
    ? window.location.host
    : ''
}
