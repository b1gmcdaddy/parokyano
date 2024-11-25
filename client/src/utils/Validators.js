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

  // FOR GCASH REF NUMBERS
  if (data.gcashRefNo !== null && data.payment_method === "gcash") {
    if (data.gcashRefNo.length === 13) {
      const isNumeric = validator.isNumeric(data.gcashRefNo);
      if (!isNumeric) {
        errors.gcashRefNo =
          "GCash Reference Number should only contain numbers";
      }
    } else {
      errors.gcashRefNo = "GCash Reference Number must have 13 digits";
    }
  }

  // FOR REQUEST MASS DATES
  // note: might be refactored to lessen lines
  // expected data format = "YYYY-MM-DD" and "HH-mm-ss"
  if (data.preferred_date !== null) {
    const minimum = new Date();
    if (
      data.service_id == "2" ||
      data.service_id == "3" ||
      data.service_id == "4"
    ) {
      minimum.setDate(new Date().getDate() - 2);
    } else {
      minimum.setDate(new Date().getDate() + 2);
      if (data.preferred_date < minimum.toJSON().slice(0, 10)) {
        errors.preferred_date =
          "Date must be atleast 2 days from today to allow for processing time";
      }
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

  // DONATION VALIDATION
  if (data.donation_amount != null) {
    if (isNaN(Number(data.donation_amount))) {
      errors.donation_amount = "Not a valid amount";
    }
  }

  //For Wedding Birth Date
  const validateLegalAge = (birthDate, fieldName) => {
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      const legalAge = 18;

      const age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      const dayDiff = today.getDate() - birth.getDate();

      if (
        age < legalAge ||
        (age === legalAge &&
          (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
      ) {
        return `The ${fieldName} must be at least 18 years old.`;
      }
    }
    return null;
  };

  if (data.groomDetails != null) {
    const groomAgeError = validateLegalAge(
      data.groomDetails.groomBirthDate,
      "groom"
    );
    if (groomAgeError) errors.groomBirthDate = groomAgeError;
  }

  if (data.brideDetails != null) {
    const brideAgeError = validateLegalAge(
      data.brideDetails.brideBirthDate,
      "bride"
    );
    if (brideAgeError) errors.brideBirthDate = brideAgeError;
  }

  //for Wedding Sponsors
  // if (data.sponsors != null) {
  //   data.sponsors.forEach((sponsor, index) => {
  //     if (!validator.isInt(String(sponsor.age))) {
  //       errors[`sponsor_${index}_age`] = `Invalid sponsor age.`;
  //     } else if (parseInt(sponsor.age, 10) < 18) {
  //       errors[
  //         `sponsor_${index}_age`
  //       ] = `Sponsor must be at least 18 years old.`;
  //     }
  //   });
  // } change kay i.uniform sa uban age field nga number ang type

  if (data.sponsors != null) {
    data.sponsors.forEach((sponsor, index) => {
      if (sponsor.age <= 0) {
        errors[`sponsor_${index}_age`] = "Age must be a positive number.";
      } else if (sponsor.age < 18) {
        errors[`sponsor_${index}_age`] = "Sponsor must be at least 18 years old.";
      }
    });
  }

    // Validate father and mother age
    if (data?.details?.father_age != null) {
      if (data.details.father_age <= 0) {
        errors.father_age = "Age must be a positive number.";
      } else if (data.details.father_age < 12) {
        errors.father_age = "Age must be realistic.";
      }
    }
  
    if (data?.details?.mother_age != null) {
      if (data.details.mother_age <= 0) {
        errors.mother_age = "Age must be a positive number.";
      } else if (data.details.mother_age < 12) {
        errors.mother_age = "Age must be realistic.";
      }
    }
    
  return errors;
}
