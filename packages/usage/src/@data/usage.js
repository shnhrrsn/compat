/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "105.0.0": 16.68,
    "104.0.0": 4.84,
    "103.0.0": 0.67,
    "106.0.0": 0.29,
    "102.0.0": 0.21,
    "87.0.0": 0.12,
    "85.0.0": 0.12,
    "86.0.0": 0.12,
    "100.0.0": 0.12,
    "79.0.0": 0.12,
    "101.0.0": 0.11,
    "84.0.0": 0.09,
    "83.0.0": 0.08,
    "96.0.0": 0.08,
    "97.0.0": 0.07,
    "99.0.0": 0.07,
    "91.0.0": 0.07,
    "98.0.0": 0.06,
    "92.0.0": 0.06,
    "81.0.0": 0.05,
    "49.0.0": 0.05,
    "69.0.0": 0.05,
    "93.0.0": 0.05,
    "89.0.0": 0.05,
    "75.0.0": 0.05,
    "80.0.0": 0.04,
    "94.0.0": 0.04,
    "56.0.0": 0.04,
    "76.0.0": 0.04,
    "78.0.0": 0.04,
    "74.0.0": 0.03,
    "95.0.0": 0.03,
    "66.0.0": 0.03,
    "90.0.0": 0.03,
    "88.0.0": 0.02,
    "70.0.0": 0.02,
    "72.0.0": 0.02,
    "48.0.0": 0.02,
    "107.0.0": 0.02,
    "77.0.0": 0.02,
    "38.0.0": 0.02,
    "40.0.0": 0.02,
    "71.0.0": 0.02,
    "65.0.0": 0.01,
    "67.0.0": 0.01,
    "108.0.0": 0.01,
    "63.0.0": 0.01
  },
  "safari": {
    "15.6.0": 1.78,
    "15.5.0": 0.32,
    "14.1.0": 0.31,
    "13.1.0": 0.26,
    "16.0.0": 0.18,
    "15.4.0": 0.14,
    "14.0.0": 0.12,
    "15.3.0": 0.09,
    "15.1.0": 0.05,
    "15.2.0": 0.05,
    "12.1.0": 0.04,
    "15.0.0": 0.03,
    "13.0.0": 0.03,
    "604.1.0": 0.02,
    "11.1.0": 0.02,
    "9.1.0": 0.01,
    "16.1.0": 0.01,
    "5.1.0": 0.01
  },
  "edge": {
    "105.0.0": 3.45,
    "104.0.0": 0.69,
    "103.0.0": 0.06,
    "18.0.0": 0.02,
    "101.0.0": 0.02,
    "102.0.0": 0.02
  },
  "firefox": {
    "104.0.0": 1.73,
    "105.0.0": 0.58,
    "103.0.0": 0.15,
    "91.0.0": 0.08,
    "102.0.0": 0.06,
    "52.0.0": 0.05,
    "78.0.0": 0.04,
    "104.2.0": 0.03,
    "94.0.0": 0.03,
    "4.0.0": 0.02,
    "101.0.0": 0.02,
    "100.0.0": 0.02,
    "99.0.0": 0.01,
    "43.0.0": 0.01,
    "68.0.0": 0.01,
    "87.0.0": 0.01,
    "88.0.0": 0.01,
    "81.0.0": 0.01
  },
  "opera": {
    "90.0.0": 0.89,
    "64.0.0": 0.22,
    "71.3.0": 0.14,
    "70.3.0": 0.11,
    "63.0.0": 0.09,
    "89.0.0": 0.08,
    "71.2.0": 0.06,
    "60.0.0": 0.05,
    "91.0.0": 0.04,
    "62.5.0": 0.03,
    "71.1.0": 0.02,
    "61.0.0": 0.01,
    "46.0.0": 0.01,
    "69.3.0": 0.01,
    "65.0.0": 0.01,
    "71.0.0": 0.01,
    "85.0.0": 0.01,
    "58.0.0": 0.01,
    "12.5.0": 0.01
  },
  "ie": {
    "11.0.0": 0.26,
    "9.0.0": 0.05,
    "8.0.0": 0.02
  },
  "safari_ios": {
    "15.6.0": 9.765,
    "16.0.0": 2.144,
    "15.5.0": 1.167,
    "15.4.0": 0.477,
    "12.5.0": 0.409,
    "14.8.0": 0.399,
    "15.7.0": 0.352,
    "14.6.0": 0.322,
    "14.7.0": 0.269,
    "14.4.0": 0.255,
    "15.3.0": 0.226,
    "15.1.0": 0.149,
    "15.2.0": 0.135,
    "15.0.0": 0.11,
    "14.2.0": 0.087,
    "10.3.0": 0.084,
    "9.3.0": 0.072,
    "14.3.0": 0.062,
    "13.6.0": 0.056,
    "14.0.0": 0.05,
    "13.3.0": 0.05,
    "12.4.0": 0.043,
    "13.5.0": 0.041,
    "14.5.0": 0.038,
    "13.7.0": 0.038,
    "14.1.0": 0.031,
    "16.1.0": 0.027,
    "13.4.0": 0.022,
    "11.0.0": 0.021,
    "12.1.0": 0.021,
    "13.1.0": 0.019,
    "12.3.0": 0.017,
    "11.4.0": 0.014,
    "11.3.0": 0.014,
    "13.2.0": 0.012,
    "7.0.0": 0.012,
    "12.0.0": 0.012,
    "12.2.0": 0.01,
    "11.2.0": 0.01,
    "9.1.0": 0.01,
    "9.2.0": 0.007,
    "7.1.0": 0.005,
    "8.4.0": 0.005,
    "9.0.0": 0.005,
    "10.2.0": 0.003,
    "8.1.0": 0.003,
    "13.0.0": 0.003,
    "4.3.0": 0.003,
    "11.1.0": 0.003,
    "6.0.0": 0.003,
    "5.0.0": 0.003,
    "8.3.0": 0.002,
    "5.1.0": 0.002,
    "10.1.0": 0.002,
    "6.1.0": 0.002
  },
  "chrome_android": {
    "105.0.0": 25.063,
    "104.0.0": 7.237,
    "103.0.0": 2.434,
    "101.0.0": 0.516,
    "102.0.0": 0.424,
    "87.0.0": 0.482,
    "96.0.0": 0.364,
    "94.0.0": 0.3,
    "99.0.0": 0.297,
    "38.0.0": 0.258,
    "100.0.0": 0.206,
    "81.0.0": 0.144,
    "70.0.0": 0.144,
    "90.0.0": 0.134,
    "80.0.0": 0.13,
    "92.0.0": 0.119,
    "83.0.0": 0.119,
    "97.0.0": 0.109,
    "95.0.0": 0.093,
    "74.0.0": 0.086,
    "79.0.0": 0.069,
    "98.0.0": 0.038,
    "91.0.0": 0.003
  },
  "samsunginternet_android": {
    "18.0.0": 1.9,
    "17.0.0": 0.22,
    "16.0.0": 0.06,
    "15.0.0": 0.06,
    "13.2.0": 0.05,
    "16.2.0": 0.04,
    "14.2.0": 0.04,
    "7.4.0": 0.03,
    "7.2.0": 0.03,
    "11.0.0": 0.03,
    "4.0.0": 0.03,
    "3.5.0": 0.02,
    "3.0.0": 0.02,
    "2.0.0": 0.02,
    "2.1.0": 0.02,
    "14.0.0": 0.02,
    "2.2.0": 0.02,
    "12.1.0": 0.02,
    "3.3.0": 0.01,
    "4.2.0": 0.01,
    "13.0.0": 0.01
  }
}

export default usage