import validator from 'validator'

export const emailValidate = async({ recipients = '' }) => {
 let invalidEmails = [], validEmails = []
 recipients.split(',').map(recipient => {
  if (!validator.isEmail(recipient.trim())) {
   invalidEmails.push(recipient.trim())
  }else validEmails.push(recipient.trim())
 })
 return {invalidEmails, validEmails}
}