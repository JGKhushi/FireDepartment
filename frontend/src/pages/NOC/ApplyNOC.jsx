import React, { useState } from 'react';
import './ApplyNOC.css';

const ApplyNOC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    pincode: '',

    // Property Details
    buildingType: '',
    propertySize: '',
    hasFireSafety: false,
    extinguishers: 0,
    smokeDetectors: false,
    waterSprinklers: false,

    // Documents
    aadhaarCard: null,
    panCard: null,
    fireSafetyCert: null,

    // Declaration
    declaration: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = 'Name is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.address) newErrors.address = 'Address is required';
        break;
      case 2:
        if (!formData.buildingType) newErrors.buildingType = 'Building type is required';
        if (!formData.propertySize) newErrors.propertySize = 'Property size is required';
        break;
      case 3:
        if (!formData.aadhaarCard) newErrors.aadhaarCard = 'Aadhaar card is required';
        if (!formData.panCard) newErrors.panCard = 'PAN card is required';
        break;
      case 4:
        if (!formData.declaration) newErrors.declaration = 'Please accept the declaration';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (validateStep(4)) {
//     setIsSubmitting(true);
//     try {
//       // Submit logic here
//       const formDataToSend = new FormData();

//       // Append all form fields to the FormData object
//       formDataToSend.append('fullName', formData.fullName);
//       formDataToSend.append('mobile', formData.mobile);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('address', formData.address);
//       formDataToSend.append('buildingType', formData.buildingType);
//       formDataToSend.append('propertySize', formData.propertySize);
//       formDataToSend.append('hasFireSafety', formData.hasFireSafety);
//       formDataToSend.append('extinguishers', formData.extinguishers);
//       formDataToSend.append('smokeDetectors', formData.smokeDetectors);
//       formDataToSend.append('waterSprinklers', formData.waterSprinklers);
//       formDataToSend.append('declaration', formData.declaration);

//       // Append files
//       if (formData.aadhaarCard) {
//         formDataToSend.append('aadhaarCard', formData.aadhaarCard);
//       }
//       if (formData.panCard) {
//         formDataToSend.append('panCard', formData.panCard);
//       }
//       if (formData.fireSafetyCert) {
//         formDataToSend.append('fireSafetyCert', formData.fireSafetyCert);
//       }

//       // Send the data to the backend
//       const response = await fetch('http://localhost:5000/api/noc/apply', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert('Application submitted successfully!');
//         console.log('Application ID:', result._id);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message || 'Failed to submit application'}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateStep(4)) {
    setIsSubmitting(true);
    try {
      // Submit logic here
      const formDataToSend = new FormData();

      // Append all form fields to the FormData object
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('buildingType', formData.buildingType);
      formDataToSend.append('propertySize', formData.propertySize);
      formDataToSend.append('hasFireSafety', formData.hasFireSafety);
      formDataToSend.append('extinguishers', formData.extinguishers);
      formDataToSend.append('smokeDetectors', formData.smokeDetectors);
      formDataToSend.append('waterSprinklers', formData.waterSprinklers);
      formDataToSend.append('declaration', formData.declaration);

      // Append files
      if (formData.aadhaarCard) {
        formDataToSend.append('aadhaarCard', formData.aadhaarCard);
      }
      if (formData.panCard) {
        formDataToSend.append('panCard', formData.panCard);
      }
      if (formData.fireSafetyCert) {
        formDataToSend.append('fireSafetyCert', formData.fireSafetyCert);
      }

      // Send the data to the backend
      const response = await fetch('http://localhost:5000/api/noc/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        // Display the application ID in a popup
        alert(`NOC Application Submitted Successfully!\nYour Application ID is: ${result.applicationId}`);
        console.log('Application ID:', result.applicationId);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to submit application'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
};

  return (
    <div className="noc-application">
      {/* Progress Bar */}
      <div className="progress-bar">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`progress-step ${currentStep >= step ? 'active' : ''}`}
          >
            <div className="step-numbers">{step}</div>
            <div className="step-label">
              {step === 1
                ? 'Personal Info'
                : step === 2
                ? 'Property Details'
                : step === 3
                ? 'Documents'
                : 'Review'}
            </div>
          </div>
        ))}
      </div>

      <form className="noc-form" onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2>Personal Information</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={errors.mobile ? 'error' : ''}
              />
              {errors.mobile && <span className="error-message">{errors.mobile}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2>Property Details</h2>

            <div className="form-group">
              <label>Building Type</label>
              <select
                name="buildingType"
                value={formData.buildingType}
                onChange={handleInputChange}
                className={errors.buildingType ? 'error' : ''}
              >
                <option value="">Select Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
              {errors.buildingType && <span className="error-message">{errors.buildingType}</span>}
            </div>

            <div className="form-group">
              <label>Property Size</label>
              <select
                name="propertySize"
                value={formData.propertySize}
                onChange={handleInputChange}
                className={errors.propertySize ? 'error' : ''}
              >
                <option value="">Select Size</option>
                <option value="small">Less than 500 sqft</option>
                <option value="medium">500-1000 sqft</option>
                <option value="large">More than 1000 sqft</option>
              </select>
              {errors.propertySize && <span className="error-message">{errors.propertySize}</span>}
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="hasFireSafety"
                  checked={formData.hasFireSafety}
                  onChange={handleInputChange}
                />
                Fire Safety Equipment Installed
              </label>
            </div>

            {formData.hasFireSafety && (
              <div className="fire-safety-details">
                <div className="form-group">
                  <label>Number of Fire Extinguishers</label>
                  <input
                    type="number"
                    name="extinguishers"
                    value={formData.extinguishers}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="smokeDetectors"
                      checked={formData.smokeDetectors}
                      onChange={handleInputChange}
                    />
                    Smoke Detectors Installed
                  </label>
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="waterSprinklers"
                      checked={formData.waterSprinklers}
                      onChange={handleInputChange}
                    />
                    Water Sprinklers Installed
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2>Document Upload</h2>

            <div className="form-group file-upload">
              <label>Aadhaar Card</label>
              <div className="upload-box">
                <input
                  type="file"
                  name="aadhaarCard"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.png"
                />
                <div className="upload-text">
                  Drag and drop or click to upload
                </div>
              </div>
              {errors.aadhaarCard && <span className="error-message">{errors.aadhaarCard}</span>}
            </div>

            <div className="form-group file-upload">
              <label>PAN Card</label>
              <div className="upload-box">
                <input
                  type="file"
                  name="panCard"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.png"
                />
                <div className="upload-text">
                  Drag and drop or click to upload
                </div>
              </div>
              {errors.panCard && <span className="error-message">{errors.panCard}</span>}
            </div>

            <div className="form-group file-upload">
              <label>Fire Safety Certificate (if available)</label>
              <div className="upload-box">
                <input
                  type="file"
                  name="fireSafetyCert"
                  onChange={handleInputChange}
                  accept=".pdf"
                />
                <div className="upload-text">
                  Drag and drop or click to upload
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2>Review & Submit</h2>

            <div className="review-section">
              <h3>Personal Information</h3>
              <p>
                <strong>Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Mobile:</strong> {formData.mobile}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
            </div>

            <div className="review-section">
              <h3>Property Details</h3>
              <p>
                <strong>Building Type:</strong> {formData.buildingType}
              </p>
              <p>
                <strong>Property Size:</strong> {formData.propertySize}
              </p>
              <p>
                <strong>Fire Safety Equipment:</strong> {formData.hasFireSafety ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="review-section">
              <h3>Uploaded Documents</h3>
              <p>
                <strong>Aadhaar Card:</strong> {formData.aadhaarCard?.name || 'Not uploaded'}
              </p>
              <p>
                <strong>PAN Card:</strong> {formData.panCard?.name || 'Not uploaded'}
              </p>
              <p>
                <strong>Fire Safety Certificate:</strong> {formData.fireSafetyCert?.name || 'Not uploaded'}
              </p>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleInputChange}
                />
                I declare that all the information provided is true and correct
              </label>
              {errors.declaration && <span className="error-message">{errors.declaration}</span>}
            </div>
          </div>
        )}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ApplyNOC;