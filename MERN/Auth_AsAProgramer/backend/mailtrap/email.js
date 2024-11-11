import { mailtrapClient, sender } from './mailtrap.config.js'
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js'

export const sendVerificationEmail = async (email, verificatonToken) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificatonToken),
            category: 'Email Verification'
        })
        console.log('Email send successfully : ', response)

    } catch (error) {
        throw new Error(`Error sending verificaiton email : ${error.message}`)
    }
}
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "9717e070-96ef-4484-982b-94f9c8bf594b",
            template_variables: {
                "name": name,
                "company_info_name": "Van Khai Auth Company"
            }
        })
        console.log('Welcome email sent successfully :', response)
    } catch (error) {
        console.log('Error when sent welcome email :', error.message)
        throw new Error('Error sending welcome email :', error.message)
    }
}
export const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your email',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
            category: 'Reset Password'
        })
        console.log('send reset password success : ', response)
    } catch (error) {
        console.log('Error when send reset pass email : ', error.message)
        throw new Error('Error when send reset password email :', error.message)
    }
}
export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset password successfully',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password reset'
        })
        console.log('password reset email sent successfully : ', response)
    } catch (error) {
        console.log('Error in sendResetSuccessEmail :', error.message)
        throw new Error('Error when send success reset password email :', error.message)
    }
}
