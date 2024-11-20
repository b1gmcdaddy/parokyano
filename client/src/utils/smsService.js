import axios from "axios";
import config from "../config";
import util from "./DateTimeFormatter";

const sendSMS = async (serviceId, data, action) => {
  let message = "";
  let priestName = "";
  let recipient = data.contact_no;

  // FOR IDENTIFYIN SERVICE TYPE
  let serviceType =
    serviceId === 1
      ? "Mass Intention"
      : serviceId === 2
      ? "Confirmation Certificate"
      : serviceId === 3
      ? "Baptismal Certificate"
      : serviceId === 4
      ? "Marriage Certificate"
      : serviceId === 5 || serviceId === 6
      ? "Baptism"
      : serviceId === 7
      ? "Wedding"
      : serviceId === 9
      ? "Wake Mass"
      : serviceId === 10
      ? "Outside Mass"
      : serviceId === 11
      ? "Funeral Mass"
      : serviceId === 12
      ? "Anointing"
      : serviceId === 13
      ? "Blessing"
      : "";

  // FOR MAPPING WHICH PRIEST
  const response = await axios.get(`${config.API}/priest/retrieve`, {
    params: {
      col: "priestID",
      val: data.priest_id,
    },
  });
  const result = response.data[0];
  priestName = result.first_name + " " + result.last_name;

  // FOR THE GREETING IN GHE MSG
  let recipientName =
    serviceId === 2 || serviceId === 3 || serviceId === 4 || serviceId === 7
      ? data.first_name
      : serviceId === 5 || serviceId === 6
      ? data.father_name
      : data.requested_by;

  switch (action) {
    case "approve": // APPROVE FOR BAPTISM, WEDDINGM, ANOINTING, BLESSING, MASS REQUESTS, INTENTIONS
      message = `Greetings ${recipientName},\n
We are pleased to inform you that your request for ${serviceType} has been APPROVED. Below are the details:\n
Transaction Number: ${data.transaction_no}
Assigned Priest: ${priestName}
Date: ${util.formatDate(data.preferred_date)}
Time: ${util.formatTime(data.preferred_time)}\n
[This is an auto-generated message] If you have any questions, feel free to contact our office at 346-9560 or +639690217771.\n
God Bless, 
Gethsemane Parish`;
      break;
    case "approve-wed-interview": // WEDDING INTERVIEW SCHEDULE SET MSGH
      message = `Greetings ${recipientName},\n
This message is to inform you that your Wedding interview schedule has been set. Below are the details:\n
Transaction Number: ${data.transaction_no}
Assigned Priest: ${priestName}
Date: ${util.formatDate(data.interview_date)}
Time: ${util.formatTime(data.interview_time)}\n
[This is an auto-generated message] If you have any questions, feel free to contact our office at 346-9560 or +639690217771.\n
God Bless, 
Gethsemane Parish`;
      break;
    case "approve-cert": // APPROVE MESSAGE FOR CERTIFICATES
      message = `Greetings ${recipientName},\n
We are pleased to inform you that your request for ${serviceType} is now ready for pickup. Below are the details:\n
Transaction Number: ${data.transaction_no}\n
Date of Recorded Event: ${util.formatDate(data.preferred_date)}\n
[This is an auto-generated message] If you have any questions, feel free to contact our office at 346-9560 or +639690217771.\n
God Bless,
Gethsemane Parish`;
      break;
    case "cancel": // CANCEL REGULAR
      message = `Greetings ${recipientName},\n
This message is to inform you that your request for ${serviceType} has been CANCELLED. Below are the details:\n
Transaction Number: ${data.transaction_no}\n
[This is an auto-generated message] If this was not you, feel free to contact our office at 346-9560 or +639690217771.\n
God Bless,
Gethsemane Parish`;
      break;
    case "cancel-cert": // CERTS NO MATCH FOUND MSG
      message = `Greetings ${recipientName},\n
Unfortunately, we were unable to find a match for the ${serviceType} that you requested. Below are the information you submitted:\n
Transaction Number: ${data.transaction_no}
Requested By: ${recipientName}
Certificate Type: ${serviceType}\n
[This is an auto-generated message] If you have any questions, feel free to contact our office at 346-9560 or +639690217771.\n    
God Bless,
Gethsemane Parish `;
      break;
    case "reschedule": // RESCHED MSG
      message = `Greetings ${recipientName},\n
Your request for ${serviceType} has been rescheduled. Below are the details:\n
Transaction Number: ${data.transaction_no}
Assigned Priest: ${priestName}
Date: ${util.formatDate(data.preferred_date)}
Time: ${util.formatTime(data.preferred_time)}\n
[This is an auto-generated message] Feel free to contact our office at 346-9560 or +639690217771 if you have any questions.\n
God Bless,
Gethsemane Parish `;
      break;
    default:
      throw new Error("Invalid type provided");
  }

  try {
    const response = await axios.post(`${config.API}/sms/send-sms`, {
      message,
      recipient,
    });
    console.log("SMS sent successfully:", response.data);
  } catch (error) {
    console.error(error);
  }
};

export default sendSMS;
