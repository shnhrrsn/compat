/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "112.0.0": 9.73,
    "111.0.0": 8.79,
    "109.0.0": 2.11,
    "110.0.0": 0.48,
    "103.0.0": 0.27,
    "108.0.0": 0.25,
    "79.0.0": 0.22,
    "93.0.0": 0.14,
    "83.0.0": 0.14,
    "107.0.0": 0.1,
    "87.0.0": 0.09,
    "105.0.0": 0.09,
    "91.0.0": 0.08,
    "106.0.0": 0.08,
    "85.0.0": 0.07,
    "99.0.0": 0.07,
    "56.0.0": 0.07,
    "94.0.0": 0.07,
    "102.0.0": 0.06,
    "86.0.0": 0.06,
    "104.0.0": 0.06,
    "81.0.0": 0.05,
    "100.0.0": 0.05,
    "92.0.0": 0.05,
    "97.0.0": 0.05,
    "75.0.0": 0.04,
    "90.0.0": 0.04,
    "76.0.0": 0.04,
    "101.0.0": 0.04,
    "98.0.0": 0.04,
    "80.0.0": 0.04,
    "69.0.0": 0.04,
    "49.0.0": 0.04,
    "96.0.0": 0.04,
    "89.0.0": 0.04,
    "84.0.0": 0.04,
    "74.0.0": 0.03,
    "88.0.0": 0.03,
    "66.0.0": 0.03,
    "78.0.0": 0.03,
    "72.0.0": 0.03,
    "113.0.0": 0.02,
    "70.0.0": 0.02,
    "95.0.0": 0.02,
    "71.0.0": 0.02,
    "48.0.0": 0.02,
    "38.0.0": 0.02,
    "77.0.0": 0.02,
    "40.0.0": 0.02,
    "114.0.0": 0.02,
    "68.0.0": 0.01,
    "45.0.0": 0.01,
    "60.0.0": 0.01,
    "47.0.0": 0.01
  },
  "safari": {
    "16.3.0": 1.63,
    "15.6.0": 0.83,
    "16.4.0": 0.69,
    "16.2.0": 0.41,
    "14.1.0": 0.33,
    "16.1.0": 0.28,
    "15.5.0": 0.2,
    "13.1.0": 0.19,
    "14.0.0": 0.12,
    "15.4.0": 0.11,
    "16.0.0": 0.09,
    "15.3.0": 0.08,
    "9.1.0": 0.05,
    "15.1.0": 0.05,
    "15.2.0": 0.05,
    "12.1.0": 0.04,
    "15.0.0": 0.03,
    "13.0.0": 0.02,
    "604.1.0": 0.02,
    "16.5.0": 0.01
  },
  "edge": {
    "112.0.0": 3.18,
    "111.0.0": 1.44,
    "109.0.0": 0.1,
    "110.0.0": 0.09,
    "108.0.0": 0.03,
    "107.0.0": 0.02,
    "18.0.0": 0.01,
    "92.0.0": 0.01
  },
  "firefox": {
    "111.0.0": 1.11,
    "112.0.0": 0.97,
    "102.0.0": 0.11,
    "110.0.0": 0.06,
    "52.0.0": 0.04,
    "78.0.0": 0.03,
    "109.0.0": 0.03,
    "43.0.0": 0.02,
    "103.0.0": 0.02,
    "111.2.0": 0.02,
    "94.0.0": 0.02,
    "108.0.0": 0.02,
    "72.0.0": 0.01,
    "112.2.0": 0.01,
    "105.0.0": 0.01,
    "107.0.0": 0.01,
    "113.0.0": 0.01
  },
  "opera": {
    "97.0.0": 0.82,
    "96.0.0": 0.31,
    "74.1.0": 0.23,
    "69.0.0": 0.16,
    "68.0.0": 0.07,
    "95.0.0": 0.07,
    "74.2.0": 0.06,
    "67.1.0": 0.05,
    "67.0.0": 0.03,
    "98.0.0": 0.03,
    "66.2.0": 0.03,
    "74.3.0": 0.03,
    "74.0.0": 0.03,
    "73.2.0": 0.02,
    "73.3.0": 0.02,
    "46.0.0": 0.02,
    "72.5.0": 0.01,
    "66.0.0": 0.01,
    "63.0.0": 0.01,
    "75.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.19,
    "9.0.0": 0.02,
    "8.0.0": 0.02
  },
  "safari_ios": {
    "16.3.0": 5.891,
    "16.4.0": 2.625,
    "16.1.0": 2.098,
    "16.2.0": 1.242,
    "16.0.0": 1.011,
    "15.7.0": 0.99,
    "15.6.0": 0.9,
    "12.5.0": 0.336,
    "15.5.0": 0.333,
    "15.4.0": 0.207,
    "14.8.0": 0.205,
    "14.7.0": 0.136,
    "14.4.0": 0.122,
    "15.3.0": 0.109,
    "14.6.0": 0.102,
    "15.1.0": 0.09,
    "10.3.0": 0.074,
    "15.2.0": 0.072,
    "15.0.0": 0.059,
    "9.3.0": 0.059,
    "16.5.0": 0.057,
    "14.2.0": 0.052,
    "13.6.0": 0.038,
    "14.3.0": 0.038,
    "13.3.0": 0.033,
    "12.4.0": 0.029,
    "13.7.0": 0.024,
    "14.0.0": 0.024,
    "13.5.0": 0.022,
    "13.2.0": 0.022,
    "14.5.0": 0.022,
    "14.1.0": 0.021,
    "12.1.0": 0.016,
    "12.3.0": 0.014,
    "11.3.0": 0.014,
    "13.4.0": 0.014,
    "11.0.0": 0.014,
    "8.4.0": 0.014,
    "7.0.0": 0.012,
    "13.1.0": 0.012,
    "11.4.0": 0.01,
    "12.2.0": 0.009,
    "8.1.0": 0.009,
    "7.1.0": 0.007,
    "11.2.0": 0.007,
    "9.1.0": 0.005,
    "12.0.0": 0.005,
    "6.0.0": 0.005,
    "9.2.0": 0.005,
    "4.3.0": 0.003,
    "9.0.0": 0.003,
    "5.0.0": 0.003,
    "10.2.0": 0.003,
    "8.3.0": 0.003,
    "8.0.0": 0.003,
    "11.1.0": 0.002,
    "6.1.0": 0.002,
    "5.1.0": 0.002,
    "8.2.0": 0.002
  },
  "chrome_android": {
    "111.0.0": 9.333,
    "112.0.0": 20.833,
    "110.0.0": 1.149,
    "109.0.0": 0.804,
    "108.0.0": 0.598,
    "106.0.0": 0.606,
    "103.0.0": 0.504,
    "107.0.0": 0.441,
    "104.0.0": 0.372,
    "105.0.0": 0.359,
    "87.0.0": 0.34,
    "94.0.0": 0.217,
    "99.0.0": 0.191,
    "97.0.0": 0.131,
    "70.0.0": 0.12,
    "96.0.0": 0.111,
    "81.0.0": 0.107,
    "80.0.0": 0.092,
    "90.0.0": 0.088,
    "83.0.0": 0.078,
    "95.0.0": 0.074,
    "92.0.0": 0.067,
    "74.0.0": 0.031,
    "101.0.0": 0.016,
    "91.0.0": 0.002,
    "113.0.0": 0.546
  },
  "samsunginternet_android": {
    "20.0.0": 1.91,
    "19.0.0": 0.13,
    "18.0.0": 0.05,
    "17.0.0": 0.05,
    "2.1.0": 0.04,
    "4.0.0": 0.03,
    "3.0.0": 0.03,
    "7.4.0": 0.03,
    "16.0.0": 0.03,
    "13.2.0": 0.02,
    "2.0.0": 0.02,
    "16.2.0": 0.02,
    "3.5.0": 0.02,
    "11.0.0": 0.02,
    "2.2.0": 0.02,
    "7.2.0": 0.02,
    "14.2.0": 0.01,
    "15.0.0": 0.01,
    "4.2.0": 0.01
  }
}

export default usage