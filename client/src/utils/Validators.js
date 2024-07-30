import validator from 'validator'


export default function ValidateForm (data) {
    const errors = {}

    if(data.contact_no != null){
        if(data.contact_no.length == 11){
            const isPhone = validator.isMobilePhone(data.contact_no, 'en-PH')
            if(!isPhone){
                errors.contact_no = "Invalid Contact Number"
            }
        }
        errors.contact_no = "A contact number must have 11 characters"
    }



    return errors
}