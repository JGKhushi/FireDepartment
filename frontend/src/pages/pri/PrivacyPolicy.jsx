"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Download, Globe } from "lucide-react"
import "./PrivacyPolicy.css"

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({
    introduction: true,
    dataCollection: false,
    dataUsage: false,
    dataSharing: false,
    dataStorage: false,
    userRights: false,
    cookies: false,
    policyUpdates: false,
    contactInfo: false,
  })

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const expandAll = () => {
    const allExpanded = {}
    Object.keys(expandedSections).forEach((key) => {
      allExpanded[key] = true
    })
    setExpandedSections(allExpanded)
  }

  const collapseAll = () => {
    const allCollapsed = {}
    Object.keys(expandedSections).forEach((key) => {
      allCollapsed[key] = false
    })
    setExpandedSections(allCollapsed)
  }

  return (
    <div className="privacy-policy-container">
      

      <main className="policy-main">
        <div className="policy-wrapper">
          <div className="table-of-contents">
            <div className="toc-header">
              <h2>Table of Contents</h2>
              <div className="toc-actions">
                <button className="toc-action-btn" onClick={expandAll}>
                  Expand All
                </button>
                <button className="toc-action-btn" onClick={collapseAll}>
                  Collapse All
                </button>
              </div>
            </div>
            <ul className="toc-list">
              <li>
                <a href="#introduction">1. Introduction</a>
              </li>
              <li>
                <a href="#data-collection">2. Data Collection</a>
              </li>
              <li>
                <a href="#data-usage">3. Data Usage</a>
              </li>
              <li>
                <a href="#data-sharing">4. Data Sharing</a>
              </li>
              <li>
                <a href="#data-storage">5. Data Storage & Security</a>
              </li>
              <li>
                <a href="#user-rights">6. User Rights</a>
              </li>
              <li>
                <a href="#cookies">7. Cookies & Tracking</a>
              </li>
              <li>
                <a href="#policy-updates">8. Policy Updates</a>
              </li>
              <li>
                <a href="#contact-info">9. Contact Information</a>
              </li>
            </ul>
          </div>

          <div className="policy-content">
            <section id="introduction" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("introduction")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.introduction}
              >
                <h2>1. Introduction</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.introduction ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.introduction ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.introduction && (
                <div className="section-content">
                  <p>
                    Welcome to the Fire Department NOC System. This Privacy Policy explains how we collect, use,
                    disclose, and safeguard your information when you use our NOC application and approval system.
                  </p>
                  <p>
                    We are committed to protecting your personal information and your right to privacy. If you have any
                    questions about our privacy practices, please contact us using the details provided at the end of
                    this policy.
                  </p>
                  <p>
                    By accessing or using our system, you acknowledge that you have read and understood this Privacy
                    Policy.
                  </p>
                </div>
              )}
            </section>

            <section id="data-collection" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("dataCollection")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.dataCollection}
              >
                <h2>2. Data Collection</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.dataCollection ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.dataCollection ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.dataCollection && (
                <div className="section-content">
                  <h3>Personal Information</h3>
                  <p>
                    We collect personal information that you voluntarily provide to us when you register for the NOC
                    system, express interest in obtaining information about our services, or otherwise contact us. This
                    information may include:
                  </p>
                  <ul>
                    <li>Name, email address, phone number, and physical address</li>
                    <li>Business details including business name, type, and registration information</li>
                    <li>Property details for which NOC is being requested</li>
                    <li>Government-issued identification documents</li>
                    <li>Building plans and specifications</li>
                  </ul>

                  <h3>Automatically Collected Information</h3>
                  <p>
                    When you access our system, we may automatically collect certain information about your device and
                    usage patterns, including:
                  </p>
                  <ul>
                    <li>Device information (browser type, operating system, IP address)</li>
                    <li>Log data (pages visited, time spent, referring URLs)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              )}
            </section>

            <section id="data-usage" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("dataUsage")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.dataUsage}
              >
                <h2>3. Data Usage</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.dataUsage ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.dataUsage ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.dataUsage && (
                <div className="section-content">
                  <p>We use the information we collect for various purposes, including:</p>
                  <ul>
                    <li>Processing and managing your NOC applications</li>
                    <li>Communicating with you about your application status</li>
                    <li>Scheduling inspections and sending notifications</li>
                    <li>Improving our services and user experience</li>
                    <li>Ensuring compliance with fire safety regulations</li>
                    <li>Administrative purposes such as data analysis and audits</li>
                    <li>Preventing fraudulent activity and enhancing security</li>
                  </ul>

                  <h3>Legal Basis for Processing</h3>
                  <p>We process your personal information based on the following legal grounds:</p>
                  <ul>
                    <li>Your consent</li>
                    <li>Performance of a contract (processing your NOC application)</li>
                    <li>Compliance with legal obligations</li>
                    <li>Legitimate interests (improving our services, preventing fraud)</li>
                  </ul>
                </div>
              )}
            </section>

            <section id="data-sharing" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("dataSharing")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.dataSharing}
              >
                <h2>4. Data Sharing</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.dataSharing ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.dataSharing ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.dataSharing && (
                <div className="section-content">
                  <p>We may share your information with the following categories of third parties:</p>
                  <ul>
                    <li>
                      <strong>Fire Department Personnel:</strong> Inspectors and officials who need access to process
                      your application
                    </li>
                    <li>
                      <strong>Government Agencies:</strong> When required by law or to comply with regulatory
                      requirements
                    </li>
                    <li>
                      <strong>Service Providers:</strong> Third-party vendors who provide services on our behalf (e.g.,
                      hosting, data analysis)
                    </li>
                    <li>
                      <strong>Professional Advisors:</strong> Legal, accounting, or other consultants in connection with
                      our business operations
                    </li>
                  </ul>

                  <h3>Circumstances for Sharing</h3>
                  <p>We may disclose your information in the following circumstances:</p>
                  <ul>
                    <li>To comply with legal obligations</li>
                    <li>To protect and defend our rights and property</li>
                    <li>To prevent or investigate possible wrongdoing</li>
                    <li>To protect the personal safety of users or the public</li>
                    <li>In connection with a business transfer (merger, acquisition, etc.)</li>
                  </ul>
                </div>
              )}
            </section>

            <section id="data-storage" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("dataStorage")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.dataStorage}
              >
                <h2>5. Data Storage & Security</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.dataStorage ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.dataStorage ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.dataStorage && (
                <div className="section-content">
                  <h3>Data Retention</h3>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in
                    this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria
                    used to determine our retention periods include:
                  </p>
                  <ul>
                    <li>The length of time we have an ongoing relationship with you</li>
                    <li>Legal obligations to retain data for certain periods</li>
                    <li>Statute of limitations under applicable law</li>
                    <li>Our legitimate business interests</li>
                  </ul>

                  <h3>Security Measures</h3>
                  <p>
                    We have implemented appropriate technical and organizational security measures to protect your
                    personal information, including:
                  </p>
                  <ul>
                    <li>Encryption of sensitive data</li>
                    <li>Secure access controls and authentication mechanisms</li>
                    <li>Regular security assessments and audits</li>
                    <li>Staff training on data protection and security</li>
                    <li>Physical security measures for our facilities</li>
                  </ul>

                  <p>
                    While we strive to use commercially acceptable means to protect your personal information, no method
                    of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute
                    security.
                  </p>
                </div>
              )}
            </section>

            <section id="user-rights" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("userRights")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.userRights}
              >
                <h2>6. User Rights</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.userRights ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.userRights ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.userRights && (
                <div className="section-content">
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information,
                    including:
                  </p>
                  <ul>
                    <li>
                      <strong>Access:</strong> The right to request copies of your personal information
                    </li>
                    <li>
                      <strong>Rectification:</strong> The right to request correction of inaccurate information
                    </li>
                    <li>
                      <strong>Erasure:</strong> The right to request deletion of your personal information
                    </li>
                    <li>
                      <strong>Restriction:</strong> The right to request restriction of processing
                    </li>
                    <li>
                      <strong>Data Portability:</strong> The right to receive your data in a structured,
                      machine-readable format
                    </li>
                    <li>
                      <strong>Objection:</strong> The right to object to processing of your personal information
                    </li>
                    <li>
                      <strong>Withdraw Consent:</strong> The right to withdraw consent at any time
                    </li>
                  </ul>

                  <h3>How to Exercise Your Rights</h3>
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the "Contact
                    Information" section. We will respond to your request within the timeframe required by applicable
                    law.
                  </p>

                  <p>
                    Please note that we may need to verify your identity before processing your request. In some cases,
                    we may be unable to fulfill your request due to legal obligations or legitimate business interests.
                  </p>
                </div>
              )}
            </section>

            <section id="cookies" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("cookies")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.cookies}
              >
                <h2>7. Cookies & Tracking</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.cookies ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.cookies ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.cookies && (
                <div className="section-content">
                  <h3>What Are Cookies</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit a website. They are
                    widely used to make websites work more efficiently and provide information to the website owners.
                  </p>

                  <h3>Types of Cookies We Use</h3>
                  <ul>
                    <li>
                      <strong>Essential Cookies:</strong> Required for the operation of our system
                    </li>
                    <li>
                      <strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count visitors and
                      analyze how users navigate our system
                    </li>
                    <li>
                      <strong>Functionality Cookies:</strong> Enable us to personalize your experience
                    </li>
                    <li>
                      <strong>Targeting Cookies:</strong> Record your visit, pages visited, and links followed
                    </li>
                  </ul>

                  <h3>Managing Cookies</h3>
                  <p>
                    Most web browsers allow you to control cookies through their settings. You can typically find these
                    settings in the "Options" or "Preferences" menu of your browser. You can also delete cookies already
                    stored on your device.
                  </p>

                  <p>Please note that disabling certain cookies may affect the functionality of our system.</p>
                </div>
              )}
            </section>

            <section id="policy-updates" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("policyUpdates")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.policyUpdates}
              >
                <h2>8. Policy Updates</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.policyUpdates ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.policyUpdates ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.policyUpdates && (
                <div className="section-content">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons.
                  </p>

                  <p>We will notify you of any material changes by:</p>
                  <ul>
                    <li>Posting the updated policy on our system</li>
                    <li>Sending an email notification to registered users</li>
                    <li>Displaying a notice on our login page</li>
                  </ul>

                  <p>
                    The "Last Updated" date at the top of this Privacy Policy indicates when it was last revised. We
                    encourage you to review this Privacy Policy periodically to stay informed about our data practices.
                  </p>

                  <p>
                    Your continued use of our system after any changes to this Privacy Policy constitutes your
                    acceptance of the revised policy.
                  </p>
                </div>
              )}
            </section>

            <section id="contact-info" className="policy-section">
              <div
                className="section-header"
                onClick={() => toggleSection("contactInfo")}
                tabIndex="0"
                role="button"
                aria-expanded={expandedSections.contactInfo}
              >
                <h2>9. Contact Information</h2>
                <button
                  className="expand-btn"
                  aria-label={expandedSections.contactInfo ? "Collapse section" : "Expand section"}
                >
                  {expandedSections.contactInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>

              {expandedSections.contactInfo && (
                <div className="section-content">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us at:
                  </p>

                  <div className="contact-details">
                    <p>
                      <strong>Fire Department NOC Division</strong>
                    </p>
                    <p>
                      Email: <a href="mailto:privacy@firedept-noc.gov">privacy@firedept-noc.gov</a>
                    </p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Safety Street, Fire City, FC 12345</p>
                  </div>

                  <p>
                    Our Data Protection Officer can be reached at{" "}
                    <a href="mailto:dpo@firedept-noc.gov">dpo@firedept-noc.gov</a>
                  </p>

                  <p>
                    For urgent matters related to data protection, please call our dedicated privacy hotline at +1 (555)
                    987-6543.
                  </p>
                </div>
              )}
            </section>
          </div>

          <div className="policy-actions">
            <button className="download-btn">
              <Download size={16} />
              <span>Download PDF</span>
            </button>
            <div className="language-selector">
              <Globe size={16} />
              <select aria-label="Select language">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="hi">हिन्दी</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  )
}

export default PrivacyPolicy