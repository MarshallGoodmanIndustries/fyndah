// function Payment() {
//     return (
//         <div>

//             {/* <!-- component --> */}
// <style>@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);</style>
// <style>

// .form-radio {
//   -webkit-appearance: none;
//      -moz-appearance: none;
//           appearance: none;
//   -webkit-print-color-adjust: exact;
//           color-adjust: exact;
//   display: inline-block;
//   vertical-align: middle;
//   background-origin: border-box;
//   -webkit-user-select: none;
//      -moz-user-select: none;
//       -ms-user-select: none;
//           user-select: none;
//   flex-shrink: 0;
//   border-radius: 100%;
//   border-width: 2px;
// }

// .form-radio:checked {
//   background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
//   border-color: transparent;
//   background-color: currentColor;
//   background-size: 100% 100%;
//   background-position: center;
//   background-repeat: no-repeat;
// }

// @media not print {
//   .form-radio::-ms-check {
//     border-width: 1px;
//     color: transparent;
//     background: inherit;
//     border-color: inherit;
//     border-radius: inherit;
//   }
// }

// .form-radio:focus {
//   outline: none;
// }

// .form-select {
//   background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
//   -webkit-appearance: none;
//      -moz-appearance: none;
//           appearance: none;
//   -webkit-print-color-adjust: exact;
//           color-adjust: exact;
//   background-repeat: no-repeat;
//   padding-top: 0.5rem;
//   padding-right: 2.5rem;
//   padding-bottom: 0.5rem;
//   padding-left: 0.75rem;
//   font-size: 1rem;
//   line-height: 1.5;
//   background-position: right 0.5rem center;
//   background-size: 1.5em 1.5em;
// }

// .form-select::-ms-expand {
//   color: #a0aec0;
//   border: none;
// }

// @media not print {
//   .form-select::-ms-expand {
//     display: none;
//   }
// }

// @media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {
//   .form-select {
//     padding-right: 0.75rem;
//   }
// }
// </style>

// <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
//     <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700" style="max-width: 600px">
//         <div className="w-full pt-1 pb-5">
//             <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
//                 <i className="mdi mdi-credit-card-outline text-3xl"></i>
//             </div>
//         </div>
//         <div className="mb-10">
//             <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
//         </div>
//         <div className="mb-3 flex -mx-2">
//             <div className="px-2">
//                 <label for="type1" className="flex items-center cursor-pointer">
//                     <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked/>
//                     <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-8 ml-3"/>
//                 </label>
//             </div>
//             <div className="px-2">
//                 <label for="type2" className="flex items-center cursor-pointer">
//                     <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2"/>
//                     <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3"/>
//                 </label>
//             </div>
//         </div>
//         <div className="mb-3">
//             <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
//             <div>
//                 <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text"/>
//             </div>
//         </div>
//         <div className="mb-3">
//             <label className="font-bold text-sm mb-2 ml-1">Card number</label>
//             <div>
//                 <input className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text"/>
//             </div>
//         </div>
//         <div className="mb-3 -mx-2 flex items-end">
//             <div className="px-2 w-1/2">
//                 <label className="font-bold text-sm mb-2 ml-1">Expiration date</label>
//                 <div>
//                     <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
//                         <option value="01">01 - January</option>
//                         <option value="02">02 - February</option>
//                         <option value="03">03 - March</option>
//                         <option value="04">04 - April</option>
//                         <option value="05">05 - May</option>
//                         <option value="06">06 - June</option>
//                         <option value="07">07 - July</option>
//                         <option value="08">08 - August</option>
//                         <option value="09">09 - September</option>
//                         <option value="10">10 - October</option>
//                         <option value="11">11 - November</option>
//                         <option value="12">12 - December</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="px-2 w-1/2">
//                 <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
//                     <option value="2020">2020</option>
//                     <option value="2021">2021</option>
//                     <option value="2022">2022</option>
//                     <option value="2023">2023</option>
//                     <option value="2024">2024</option>
//                     <option value="2025">2025</option>
//                     <option value="2026">2026</option>
//                     <option value="2027">2027</option>
//                     <option value="2028">2028</option>
//                     <option value="2029">2029</option>
//                 </select>
//             </div>
//         </div>
//         <div className="mb-10">
//             <label className="font-bold text-sm mb-2 ml-1">Security code</label>
//             <div>
//                 <input className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text"/>
//             </div>
//         </div>
//         <div>
//             <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
//         </div>
//     </div>
// </div>

// <!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
// <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
//     <div>
//         <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
//             <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
//         </a>
//     </div>
// </div>
//         </div>
//     )
// }

// export default Payment

import { useState } from "react";

function PaymentForm() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");
  const [cardCVC, setCVC] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment logic here
    console.log("Payment submitted:", cardNumber, cardExpires);
  };

  return (
    <>
      {/* <h1 className='font-bold '>Bid Payment Required to view Leads</h1> */}

      <form className=" flex flex-col mt-[7rem] max-w-md mx-auto p-4 border rounded shadow">
        <h1 className="text-center font-bold text-4xl mb-10">
          Bid Payment Required to View Leads
        </h1>
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block font-medium text-gray-700"
          >
            Card Name
          </label>
          <input
            type="tetx"
            id="carName"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter card name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block font-medium text-gray-700"
          >
            Card Number
          </label>
          <input
            type="number"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter card number"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cardExpires"
            className="block font-medium text-gray-700"
          >
            Expiration Date
          </label>
          <input
            type="number"
            id="cardExpires"
            maxLength="4"
            value={cardExpires}
            onChange={(e) => setCardExpires(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="MM/YY"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cardExpires"
            className="block font-medium text-gray-700"
          >
            CVC
          </label>
          <input
            type="number"
            id="cardExpires"
            maxLength="3"
            value={cardCVC}
            onChange={(e) => setCVC(e.target.value)}
            className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="The Three Unique Digits at the back of your Card"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Pay Now
        </button>
      </form>
    </>
  );
}

export default PaymentForm;
