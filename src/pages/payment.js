// import React, { useState } from "react";
// import Omise from "omise";

// export default function PaymentForm() {
//   const [name, setName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expirationMonth, setExpirationMonth] = useState("");
//   const [expirationYear, setExpirationYear] = useState("");
//   const [securityCode, setSecurityCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const omise = Omise({
//       publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
//     });

//     try {
//       const token = await omise.tokens.create({
//         card: {
//           name,
//           number: cardNumber,
//           expiration_month: expirationMonth,
//           expiration_year: expirationYear,
//           security_code: securityCode,
//         },
//       });

//       const response = await fetch("/api/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: token.id }),
//       });

//       const result = await response.json();
//       setMessage(result.message);
//     } catch (error) {
//       setMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handlePayment}>
//       <h2>Payment Form</h2>
//       <div>
//         <label>Cardholder Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Card Number</label>
//         <input
//           type="text"
//           value={cardNumber}
//           onChange={(e) => setCardNumber(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Expiration Month</label>
//         <input
//           type="text"
//           value={expirationMonth}
//           onChange={(e) => setExpirationMonth(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Expiration Year</label>
//         <input
//           type="text"
//           value={expirationYear}
//           onChange={(e) => setExpirationYear(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Security Code</label>
//         <input
//           type="text"
//           value={securityCode}
//           onChange={(e) => setSecurityCode(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" disabled={loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }
