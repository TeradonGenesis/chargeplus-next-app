import { useState } from "react"
import DateTimePicker from "react-datetime-picker"
import calculateParkingRate from "../api/CalculateParkingRate"

const htmlForm = () => {

    const breakdown = {reg_no: '',in: '',out: '',duration: '',amount_to_pay: '',breakdown: ['']}
    const [enterDateTime, setEnterDateTime] = useState('')
    const [exitDateTime, setExitDateTime] = useState('')
    const [carRegNo, setCarRegNo] = useState('')
    const [error, setError] = useState('');
    const [message, setMessage] = useState(breakdown)

    const submit = async () => {

        try {
            let errMsg = ''
            if (carRegNo && enterDateTime && exitDateTime) {

                await calculateParkingRate(carRegNo, enterDateTime, exitDateTime)
                    .then((resp) => { setMessage(resp) })
                    .catch((err) => { 
                        throw new Error(err)
                    });
            }

        } catch (e) {
            if (typeof e === "string") {
                setError(e.toUpperCase());
            } else if (e instanceof Error) {
                setError(e.message)
                setMessage(breakdown)
            }
        }

    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (error) {
            setError('')
        }
        setMessage(breakdown)
        submit()
    }

    return (
        
        <section className="px-2">
            <div className="">
                <div className="w-full">
                    <h2 className="text-center text-back-200 font-bold text-xl mb-10 mt-5">Calculate the parking rate cost</h2>
                    <div className="bg-white p-10 rounded-lg shadow mx-auto">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="regNo" className="block mb-2 font-bold text-gray-600">Car Registration No.</label>
                                <input value={carRegNo} onChange={(event) => setCarRegNo(event.target.value)} type="text" id="regNo" name="regNo" placeholder="Enter the car registration number" className="border border-gray-300 shadow p-3 w-full rounded" required/>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="enterTime" className="block mb-2 font-bold text-gray-600">Car entry date time (YYYY-MM-DD HH:MIN:SS)</label>
                                <input value={enterDateTime} onChange={(event) => setEnterDateTime(event.target.value)} type="text" id="enterTime" name="enterTime" placeholder="Enter the datetime the car entered" className="border border-gray-300 shadow p-3 w-full rounded" required/>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="exitTime" className="block mb-2 font-bold text-gray-600">Car exit date time (YYYY-MM-DD HH:MIN:SS)</label>
                                <input value={exitDateTime} onChange={(event) => setExitDateTime(event.target.value)} type="text" id="exitTime" name="exitTime" placeholder="Enter the datetime the car exited" className="border border-gray-300 shadow p-3 w-full rounded" required/>
                            </div>

                            <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Submit</button>
                        </form>
                    </div>
                </div>

                {error && (
                    <div className="border border-gray-300 p-6 rounded-lg bg-gray-100 max-w-xl mt-5">
                        <p className="leading-relaxed text-base text-red-500">Error message</p>
                        <br />
                        <p className="leading-relaxed text-base text-red-500">{error}</p>
                    </div>
                    
                )}

                {message.reg_no && (
                <div className="border border-gray-300 p-6 rounded-lg bg-gray-100 max-w-xl mt-5">
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Parking Rates Breakdown</h2>
                    <p className="leading-relaxed text-base">Car Reg No: {message.reg_no}</p>
                    <p className="leading-relaxed text-base">In: {message.in}</p>
                    <p className="leading-relaxed text-base">Out: {message.out}</p>
                    <p className="leading-relaxed text-base">Duration: {message.duration}</p>
                    <p className="leading-relaxed text-base">Amount to pay: {message.amount_to_pay}</p>
                    <p className="leading-relaxed text-base mt-5">Breakdown: </p>
                    {message.breakdown.map((item) => (
                        <p className="leading-relaxed text-base">{item}</p>
                    ))}
                </div>
            )}
            </div>


        </section>
    )
}

export default htmlForm