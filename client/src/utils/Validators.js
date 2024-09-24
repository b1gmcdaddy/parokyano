import validator from "validator";

export default function ValidateForm(data) {
  const errors = {};

  const dateToday = new Date().toJSON().slice(0, 10);

  // for mobile numbers
  if (data.contact_no !== null) {
    if (data.contact_no.length === 11) {
      const isPhone = validator.isMobilePhone(data.contact_no, "en-PH");
      if (!isPhone) errors.contact_no = "Invalid Contact Number";
    } else {
      errors.contact_no = "A contact number must have 11 characters";
    }
  }

  // FOR REQUEST MASS DATES
  // note: might be refactored to lessen lines
  // expected data format = "YYYY-MM-DD" and "HH-mm-ss"
  if (data.preferred_date !== null) {
    const minimum = new Date();
    minimum.setDate(new Date().getDate() + 2);

    if (data.preferred_date < minimum.toJSON().slice(0, 10)) {
      errors.preferred_date =
        "Date must be atleast 2 days from today to allow for processing time";
    }
  }

  // for MASS INTENTIONS
  if (data.mass_date !== null) {
    const minimum = new Date();
    minimum.setDate(new Date().getDate() + 1);

    if (data.mass_date < minimum.toJSON().slice(0, 10)) {
      errors.mass_date =
        "Date must be atleast a day from today to allow for processing time";
    }
  }

  if (data.donation_amount !== null) {
    if (isNaN(Number(data.donation_amount))) {
      errors.amount = "Not a valid amount";
    }
  }

  return errors;
}
