import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setSuccess("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setSuccess(""), 3000);
    };

    return (
        <div className="contact-container">
            <div className="contact-box">
                <h2>Contact Us</h2>
                <p className="contact-description">
                    If you have any queries regarding the Fire Department services, feel free to reach out.
                </p>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="contact-button">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="contact-info">
                <h3>Emergency Contact</h3>
                <p>📞 Fire Helpline: <strong>101</strong></p>
                <p>📧 Email: support@firedept.com</p>
                <p>📍 Address: Fire Department HQ, Main Street, City</p>

                {/* Optional Google Maps Embed */}
                <iframe
                    className="google-map"
                    src="https://www.google.com/maps/embed?..."
                    title="Fire Department Location"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
