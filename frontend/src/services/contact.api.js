import instance from './axios.customize.js'

export const sendContactForm = async (contactData) => {
  const res = await instance.post('/contact/send', contactData)
  return res
}
