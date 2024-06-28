// import React, { useState } from "react";
// import "./Reviews.css";

// const addReview = async (review) => {
//   const response = await fetch(
//     s`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         fields: {
//           user: { stringValue: review.username },
//           description: { stringValue: review.description },
//           score: { stringValue: review.score },
//           product: { stringValue: review.product },
//         },
//       }),
//     }
//   );

//   if (response.ok) {
//     alert("¡La reseña se agregó correctamente!");
//   } else {
//     // Error al agregar la reseña
//     alert("Error al agregar la reseña");
//   }
// };

// const CreateReview = ({ product, user, score }) => {
//   const initialReviewsValue = {
//     emailUser: `${auth.currentUser.email}`,
//     productName: product,
//     description: "",
//     score: "",
//   };

//   const [reviews, setReviews] = useState(initialReviewsValue);

//   const onAddReview = () => {
//     if (auth.currentUser.email === user) {
//       alert("Solo se puede una reseña por usuario");
// EN ESTE CASO SERIA POR CADA TURNO SE HACE UNA RESEÑA

// EN ESTE CASO VER TEMA DE ESTRELLAS DE VALORACION Y NO DECIMALES
//     } else if (reviews.score > 5 || reviews.score < 1) {
//       alert("Error, no se puede ingresar una valoracion mayor a 5 o menor a 1");
//     } else {
//       addReview(reviews);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAddReview();
//     setReviews({ ...initialReviewsValue });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReviews({ ...reviews, [name]: value });
//   };

//   return (
//     <div className="mainForm">
//       <form onSubmit={handleSubmit} className="formRev">
//         <div className="contentR">
//           <div>
//             <input
//               type="text"
//               className="form-control"
//               placeholder={`${currentUser.username}`}
//               disabled
//               name="Username"
//             />
//           </div>
//           <hr className="hrRev"></hr>
//           <div>
//             <input
//               type="text"
//               className="form-control"
//               name="productName"
//               disabled
//               placeholder={product}
//             />
//           </div>
//           <hr className="hrRev"></hr>

// VER COMO HACER ESTO, DE SELECCIONAR ESTRELLAS COMPLETAS O MEDIAS ESTRELLAS
//           <div className="stars">
//             <input
//               type="number"
//               className="form-control"
//               name="score"
//               placeholder="Valoración 1-5"
//               onChange={handleInputChange}
//               value={reviews.score}
//               max="5"
//               min="1"
//             />
//           </div>

//           <hr></hr>

// ESTO ES LUGAR DONDE IRA LA DESCRIPCION O RESEÑA EN SÍ, COMENTARIOS DEL USUARIO
//           <div className="tx">
//             <textarea
//               type="text"
//               rows="3"
// ROWS VER HASTA CUANTO PODEMOS ESCRIBIR
//               className="form-control"
//               name="description"
//               placeholder="Comentarios"
//               onChange={handleInputChange}
//               value={reviews.description}
//             ></textarea>
//           </div>
//           <div className="btn ">
//             <button className="btnLight">Publicar mi reseña</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateReview;
