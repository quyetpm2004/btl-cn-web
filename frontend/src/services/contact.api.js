import instance from './axios.customize.js'

export const sendContactForm = async (contactData) => {
  try {
    const response = await instance.post('/contact/send', contactData)
    return response
  } catch (error) {
    throw error
  }
}
