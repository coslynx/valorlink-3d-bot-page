import React, { useState, useCallback, memo, useEffect } from 'react';
 import MinimalLayout from 'src/components/layout/MinimalLayout';
 import Button from 'src/components/ui/Button';
 import 'src/styles/pages/contact.css';
 

 interface ContactFormState {
  name: string;
  email: string;
  message: string;
 }
 

 const ContactPage: React.FC = memo(() => {
  const [formState, setFormState] = useState<ContactFormState>({
  name: '',
  email: '',
  message: '',
  });
  const [errors, setErrors] = useState({
  name: '',
  email: '',
  message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [safeNameLabel, setSafeNameLabel] = useState('Name');
  const [safeEmailLabel, setSafeEmailLabel] = useState('Email');
  const [safeMessageLabel, setSafeMessageLabel] = useState('Message');
 

  useEffect(() => {
  // Basic XSS prevention for ariaLabel
  const sanitizeLabel = (label: string) => label ? label.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
  setSafeNameLabel(sanitizeLabel('Name'));
  setSafeEmailLabel(sanitizeLabel('Email'));
  setSafeMessageLabel(sanitizeLabel('Message'));
  }, []);
 

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = event.target;
  // Sanitize input value
  const sanitizedValue = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  setFormState(prevState => ({
  ...prevState,
  [name]: sanitizedValue,
  }));
  }, []);
 

  const validateEmail = useCallback((email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  }, []);
 

  const handleSubmit = useCallback((event: React.FormEvent) => {
  event.preventDefault();
  let isValid = true;
  const newErrors = { name: '', email: '', message: '' };
 

  if (!formState.name.trim()) {
  newErrors.name = 'Name is required';
  isValid = false;
  }
 

  if (!formState.email.trim()) {
  newErrors.email = 'Email is required';
  isValid = false;
  } else if (!validateEmail(formState.email)) {
  newErrors.email = 'Invalid email address';
  isValid = false;
  }
 

  if (!formState.message.trim()) {
  newErrors.message = 'Message is required';
  isValid = false;
  } else if (formState.message.length < 10) {
  newErrors.message = 'Message must be at least 10 characters long';
  isValid = false;
  }
 

  setErrors(newErrors);
 

  if (isValid) {
  // Simulate successful submission
  console.log('Form submitted:', formState);
  setSuccessMessage('Message sent successfully!');
  setTimeout(() => {
  setFormState({ name: '', email: '', message: '' });
  setSuccessMessage('');
  }, 3000);
  }
  }, [formState, validateEmail]);
 

  try {
  return (
  <div aria-label="Contact Us Page">
  <MinimalLayout>
  <h1 className="text-3xl font-bold text-center mb-8 font-exo-2 text-red-500">
  Contact Us
  </h1>
  <form onSubmit={handleSubmit} aria-label="Contact Form" className="max-w-md mx-auto">
  <div className="mb-4">
  <label htmlFor="name" className="block text-white font-roboto text-sm font-bold mb-2">
  {safeNameLabel}
  </label>
  <input
  type="text"
  id="name"
  name="name"
  value={formState.name}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-roboto"
  placeholder="Your Name"
  aria-label={safeNameLabel}
  />
  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
  </div>
 

  <div className="mb-4">
  <label htmlFor="email" className="block text-white font-roboto text-sm font-bold mb-2">
  {safeEmailLabel}
  </label>
  <input
  type="email"
  id="email"
  name="email"
  value={formState.email}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-roboto"
  placeholder="Your Email"
  aria-label={safeEmailLabel}
  />
  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
  </div>
 

  <div className="mb-6">
  <label htmlFor="message" className="block text-white font-roboto text-sm font-bold mb-2">
  {safeMessageLabel}
  </label>
  <textarea
  id="message"
  name="message"
  value={formState.message}
  onChange={handleChange}
  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-roboto h-32 resize-none"
  placeholder="Your Message"
  aria-label={safeMessageLabel}
  ></textarea>
  {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
  </div>
 

  <div className="flex items-center justify-between">
  <Button onClick={handleSubmit} ariaLabel="Submit Contact Form">
  Submit
  </Button>
  </div>
  {successMessage && <p className="text-green-500 text-sm italic mt-4 text-center">{successMessage}</p>}
  </form>
  </MinimalLayout>
  </div>
  );
  } catch (error) {
  console.error('Error rendering ContactPage:', error);
  return (
  <div className="text-red-500 font-roboto" aria-live="assertive">
  An error occurred while rendering the contact page. Please try again
  later.
  </div>
  );
  }
 });
 

 ContactPage.displayName = 'ContactPage';
 

 export default ContactPage;