import React from 'react';

 type FormatInputType = string | number | null | undefined;
 

 /**
  * Formats a Date object or a value that can be parsed into a Date into YYYY-MM-DD format.
  * @param {Date | FormatInputType} date - The date to format, which can be a Date object, a string, or a number.
  * @returns {string} The formatted date string in YYYY-MM-DD format, or an empty string if the input is invalid.
  */
 const formatDate = (date: Date | FormatInputType): string => {
  try {
  if (date == null) {
  return '';
  }
 

  let parsedDate: Date;
  if (date instanceof Date) {
  parsedDate = new Date(date);
  } else {
  parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
  console.warn('Invalid date string or number provided.');
  return '';
  }
  }
 

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
 

  return `${year}-${month}-${day}`;
  } catch (error) {
  console.error('Error formatting date:', error);
  return '';
  }
 };
 

 /**
  * Formats a number using Intl.NumberFormat.
  * @param {FormatInputType} value - The number to format, which can be a string or a number.
  * @param {Intl.NumberFormatOptions} options - Optional formatting options for Intl.NumberFormat.
  * @returns {string} The formatted number string, or 'Invalid Number' if the input is invalid.
  */
 const formatNumber = (value: FormatInputType, options: Intl.NumberFormatOptions = {}): string => {
  try {
  if (value == null) {
  return 'Invalid Number';
  }
 

  const num = typeof value === 'string' ? Number(value) : value;
 

  if (isNaN(num) || !Number.isFinite(num)) {
  console.warn('Invalid input: Cannot convert to a valid number.');
  return 'Invalid Number';
  }
 

  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(num);
  } catch (error) {
  console.error('Error formatting number:', error);
  return 'Invalid Number';
  }
 };
 

 /**
  * Truncates a string if it exceeds a specified maximum length, appending "..." to the truncated string.
  * @param {string} str - The string to truncate.
  * @param {number} maxLength - The maximum length of the string before truncation. Must be a positive number.
  * @returns {string} The truncated string with "..." appended, or the original string if it is shorter than maxLength.
  */
 const truncateString = (str: string, maxLength: number): string => {
  try {
  if (typeof str !== 'string') {
  console.warn('Invalid input: Input must be a string.');
  return '';
  }
 

  if (typeof maxLength !== 'number' || maxLength <= 0) {
  console.warn('Invalid maxLength: maxLength must be a positive number.');
  return str; // Return the original string to avoid unexpected behavior
  }
 

  if (str.length <= maxLength) {
  return str;
  }
 

  return `${str.substring(0, maxLength)}...`;
  } catch (error) {
  console.error('Error truncating string:', error);
  return '';
  }
 };
 

 export { formatDate, formatNumber, truncateString };