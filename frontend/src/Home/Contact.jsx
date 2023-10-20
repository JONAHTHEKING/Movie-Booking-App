import "../Home/Contact.css";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/navbar";

function Contact() {
  function message() {
    alert("your message has been sent succesfully");
  }
  return (
    <>
      <Navbar />
      <div className="contactForm">
        <h2 className="contactus">
          <span className="one-word">CONTACT</span> US
        </h2>
        <h2 className="getintouch">GET IN TOUCH</h2>

        <div className="mb-3 form-control-group">
          <label className="form-label">NAME</label>
          <input
            style={{ backgroundColor: "#0a1e5e" }}
            placeholder="Enter your Name"
            type="NAME"
            name="NAME"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">EMAIL</label>
          <input
            style={{ backgroundColor: "#0a1e5e" }}
            placeholder="EMAIL"
            type="EMAIL"
            name="EMAIL"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">SUBJECT</label>
          <input
            style={{ backgroundColor: "#0a1e5e" }}
            placeholder="Subject"
            type="text"
            name="subject"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3 form-control-group">
          <label className="form-label">MESSAGE</label>
          <input
            style={{ backgroundColor: "#0a1e5e" }}
            placeholder="MESSAGE"
            type="MESSAGE"
            name="MEAASGE"
            className="form-control"
          ></input>
        </div>
        <div className="btn-wrapper">
          <button className="send-button" onClick={message}>
            SEND MESSAGE
          </button>
        </div>
      </div>
      <div className="social">
        <img
          className="social"
          src="http://pixner.net/boleto/demo/assets/images/contact/contact01.png"
          alt=""
        />
        <br></br>
        <p style={{ fontWeight: "bold", color: "white" }}>
          CALL US +91987654321
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
