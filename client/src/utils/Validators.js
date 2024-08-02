import validator from 'validator'


export default function ValidateForm (data) {
    const errors = {}

    // for mobile numbers
    if(data.contact_no !== null){
        if(data.contact_no.length === 11){
            const isPhone = validator.isMobilePhone(data.contact_no, 'en-PH')
            if(!isPhone)
                errors.contact_no = "Invalid Contact Number"
        }
        else{
            errors.contact_no = "A contact number must have 11 characters"
        }
    }

    // for dates picked by user
    // note: might be refactored to lessen lines
    if(data.mass_data !== null){
        const dateToday = new Date().toJSON().slice(0,10)
        const minimum = new Date()
        minimum.setDate(new Date().getDate()+3)

        if(data.mass_date !== dateToday && data.mass_date < dateToday){
            errors.mass_date = "Invalid date"
        }
        if(data.mass_date == dateToday){
            errors.mass_date = "Cannot schedule appointments/services on the same day"
        }
        if(data.mass_date > dateToday && data.mass_date < minimum.toJSON().slice(0,10)){
            errors.mass_date = "Date must be atleast 3 days from today to allow for processing time"
        }
    }

    if(data.donation_amount !== null){
        if(isNaN(Number(data.donation_amount))){
            errors.donation_amount = "Not a valid amount"
        }
    }

    return errors
}