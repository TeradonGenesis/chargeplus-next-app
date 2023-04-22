import axios from "axios";

async function calculateParkingRate(carRegNo: string, enterDateTime: string, exitDateTime: string){

    let duration: string = ''
    let totalAmt: string = ''
    let breakdown: string[] = []
    let payBreakdown = {reg_no: '',in: '',out: '',duration: '',amount_to_pay: '',breakdown: ['']}
    const endpoint = `http://eddielim.pythonanywhere.com/parkings/rate/hourly`
    await axios.post(endpoint,{
      "car_reg_no": carRegNo,
      "in_datetime": enterDateTime,
      "out_datetime": exitDateTime
    })
    .then(res => {
        console.log(res.data)
        if(res.data){
          duration = res.data.duration
          totalAmt = res.data.total_parking_rate.toFixed(2);
          if(res.data.rate_breakdown.length > 0){
             res.data.rate_breakdown.forEach((rate: any) => {
                breakdown.push(`${rate.date}, ${rate.day}, $ ${rate.total_rate}`)
             });
          }
        }
    })
    .catch(error => {
      throw new Error(error.response.data.error);
    });
    

    payBreakdown = {
      reg_no: carRegNo,
      in: enterDateTime,
      out: exitDateTime,
      duration: duration,
      amount_to_pay: `$ ${totalAmt}`,
      breakdown: breakdown
    }
    
    return payBreakdown;
}

export default calculateParkingRate;