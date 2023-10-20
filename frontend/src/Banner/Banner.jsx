import React from "react";
import styles from "./Banner.module.css";
import "./animation.css"; // Import the animation CSS file here



// export function Banner() {
//   return (
//     <div className={styles.banner}>
//       <h1 className={styles.header1}>
//         GET <span className={styles.header2}>MOVIE</span> TICKETS
//       </h1>
//       <p>Buy movie tickets in advance, find movie times watch trailers,</p>
//       <p>read movie reviews and much more</p>
//     </div>
//   );
// }

export function Banner() {
  return (
    <div className={styles.banner}>
      <h1 className={styles.header1}>
        GET <span className={`${styles.header2} letter-animation`}>MOVIE</span> TICKETS
      </h1>
      <p>Buy movie tickets in advance, find movie times watch trailers,</p>
      <p>read movie reviews and much more</p>
    </div>
  );
}

