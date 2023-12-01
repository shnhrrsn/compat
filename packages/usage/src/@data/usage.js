/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "119.0.0": 14.75,
    "118.0.0": 5.58,
    "109.0.0": 1.81,
    "117.0.0": 0.71,
    "116.0.0": 0.51,
    "103.0.0": 0.39,
    "114.0.0": 0.22,
    "79.0.0": 0.16,
    "115.0.0": 0.15,
    "93.0.0": 0.12,
    "112.0.0": 0.12,
    "108.0.0": 0.11,
    "113.0.0": 0.11,
    "111.0.0": 0.1,
    "87.0.0": 0.09,
    "110.0.0": 0.08,
    "85.0.0": 0.08,
    "91.0.0": 0.07,
    "98.0.0": 0.07,
    "86.0.0": 0.06,
    "106.0.0": 0.06,
    "76.0.0": 0.06,
    "107.0.0": 0.06,
    "83.0.0": 0.05,
    "99.0.0": 0.05,
    "80.0.0": 0.05,
    "81.0.0": 0.05,
    "69.0.0": 0.05,
    "101.0.0": 0.05,
    "105.0.0": 0.05,
    "104.0.0": 0.05,
    "70.0.0": 0.05,
    "92.0.0": 0.04,
    "102.0.0": 0.04,
    "60.0.0": 0.04,
    "90.0.0": 0.04,
    "100.0.0": 0.03,
    "94.0.0": 0.03,
    "49.0.0": 0.03,
    "89.0.0": 0.03,
    "88.0.0": 0.03,
    "73.0.0": 0.03,
    "78.0.0": 0.03,
    "74.0.0": 0.03,
    "56.0.0": 0.03,
    "84.0.0": 0.03,
    "48.0.0": 0.02,
    "77.0.0": 0.02,
    "97.0.0": 0.02,
    "120.0.0": 0.02,
    "75.0.0": 0.02,
    "66.0.0": 0.02,
    "72.0.0": 0.02,
    "96.0.0": 0.02,
    "95.0.0": 0.02,
    "68.0.0": 0.02,
    "121.0.0": 0.02,
    "38.0.0": 0.01,
    "57.0.0": 0.01,
    "71.0.0": 0.01,
    "61.0.0": 0.01,
    "50.0.0": 0.01,
    "47.0.0": 0.01,
    "55.0.0": 0.01
  },
  "safari": {
    "16.6.0": 2.15,
    "17.1.0": 0.68,
    "15.6.0": 0.53,
    "17.0.0": 0.46,
    "16.3.0": 0.38,
    "16.5.0": 0.3,
    "14.1.0": 0.21,
    "16.1.0": 0.19,
    "16.2.0": 0.17,
    "16.4.0": 0.14,
    "13.1.0": 0.12,
    "15.5.0": 0.1,
    "14.0.0": 0.09,
    "9.1.0": 0.07,
    "16.0.0": 0.07,
    "15.4.0": 0.07,
    "15.3.0": 0.05,
    "15.1.0": 0.04,
    "15.2.0": 0.03,
    "12.1.0": 0.02,
    "604.1.0": 0.02,
    "15.0.0": 0.02,
    "17.2.0": 0.02,
    "13.0.0": 0.01,
    "605.1.0": 0.01
  },
  "edge": {
    "119.0.0": 3.51,
    "118.0.0": 0.91,
    "87.0.0": 0.22,
    "117.0.0": 0.09,
    "109.0.0": 0.09,
    "116.0.0": 0.04,
    "115.0.0": 0.03,
    "114.0.0": 0.03,
    "113.0.0": 0.02,
    "99.0.0": 0.02,
    "92.0.0": 0.02,
    "111.0.0": 0.01,
    "110.0.0": 0.01,
    "108.0.0": 0.01,
    "112.0.0": 0.01,
    "14.0.0": 0.01,
    "13.0.0": 0.01,
    "120.0.0": 0.01,
    "107.0.0": 0.01,
    "18.0.0": 0.01
  },
  "firefox": {
    "119.0.0": 1.61,
    "115.0.0": 0.39,
    "120.0.0": 0.36,
    "118.0.0": 0.15,
    "52.0.0": 0.06,
    "102.0.0": 0.03,
    "103.0.0": 0.03,
    "48.0.0": 0.03,
    "78.0.0": 0.03,
    "119.2.0": 0.02,
    "117.0.0": 0.02,
    "11.0.0": 0.02,
    "116.0.0": 0.02,
    "113.0.0": 0.02,
    "56.0.0": 0.02,
    "114.0.0": 0.02,
    "54.0.0": 0.02,
    "91.0.0": 0.02,
    "119.1.0": 0.02,
    "12.0.0": 0.01,
    "50.0.0": 0.01,
    "109.0.0": 0.01,
    "72.0.0": 0.01,
    "53.0.0": 0.01
  },
  "opera": {
    "102.0.0": 0.95,
    "104.0.0": 0.68,
    "75.0.0": 0.23,
    "103.0.0": 0.17,
    "78.5.0": 0.12,
    "78.2.0": 0.1,
    "78.4.0": 0.08,
    "78.3.0": 0.07,
    "95.0.0": 0.06,
    "74.0.0": 0.05,
    "73.0.0": 0.05,
    "105.0.0": 0.04,
    "72.0.0": 0.04,
    "78.1.0": 0.02,
    "71.0.0": 0.02,
    "76.2.0": 0.02,
    "69.0.0": 0.02,
    "77.4.0": 0.02,
    "46.0.0": 0.01,
    "70.0.0": 0.01,
    "77.5.0": 0.01,
    "79.0.0": 0.01,
    "76.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.13,
    "9.0.0": 0.02
  },
  "safari_ios": {
    "16.6.0": 5.155,
    "17.1.0": 2.942,
    "17.0.0": 1.886,
    "16.7.0": 1.111,
    "16.1.0": 0.761,
    "16.3.0": 0.684,
    "15.7.0": 0.46,
    "16.0.0": 0.38,
    "16.5.0": 0.366,
    "16.2.0": 0.365,
    "15.6.0": 0.355,
    "15.8.0": 0.309,
    "12.5.0": 0.236,
    "15.5.0": 0.154,
    "16.4.0": 0.141,
    "15.4.0": 0.11,
    "17.2.0": 0.087,
    "14.8.0": 0.079,
    "14.7.0": 0.064,
    "14.4.0": 0.061,
    "10.3.0": 0.059,
    "15.3.0": 0.057,
    "14.6.0": 0.047,
    "15.1.0": 0.044,
    "15.2.0": 0.041,
    "9.3.0": 0.041,
    "15.0.0": 0.036,
    "13.2.0": 0.028,
    "14.2.0": 0.026,
    "11.0.0": 0.021,
    "13.6.0": 0.02,
    "14.3.0": 0.018,
    "12.4.0": 0.018,
    "11.3.0": 0.018,
    "13.3.0": 0.016,
    "14.5.0": 0.015,
    "14.0.0": 0.011,
    "13.7.0": 0.011,
    "13.5.0": 0.01,
    "14.1.0": 0.01,
    "12.1.0": 0.01,
    "12.3.0": 0.008,
    "7.0.0": 0.008,
    "9.1.0": 0.008,
    "6.0.0": 0.008,
    "13.1.0": 0.007,
    "11.4.0": 0.007,
    "12.2.0": 0.007,
    "13.4.0": 0.007,
    "12.0.0": 0.005,
    "11.2.0": 0.005,
    "7.1.0": 0.003,
    "9.2.0": 0.003,
    "4.3.0": 0.003,
    "10.2.0": 0.003,
    "5.0.0": 0.002,
    "11.1.0": 0.002,
    "8.4.0": 0.002,
    "9.0.0": 0.002
  },
  "chrome_android": {
    "119.0.0": 21.502,
    "118.0.0": 4.87,
    "117.0.0": 1.757,
    "116.0.0": 0.936,
    "111.0.0": 0.794,
    "114.0.0": 0.718,
    "115.0.0": 0.533,
    "106.0.0": 0.441,
    "113.0.0": 0.293,
    "103.0.0": 0.268,
    "104.0.0": 0.265,
    "112.0.0": 0.253,
    "105.0.0": 0.241,
    "87.0.0": 0.183,
    "110.0.0": 0.155,
    "94.0.0": 0.114,
    "99.0.0": 0.109,
    "107.0.0": 0.102,
    "109.0.0": 0.094,
    "97.0.0": 0.086,
    "108.0.0": 0.083,
    "70.0.0": 0.081,
    "81.0.0": 0.06,
    "80.0.0": 0.046,
    "96.0.0": 0.025,
    "92.0.0": 0.005,
    "120.0.0": 0.042,
    "90.0.0": 0.011,
    "91.0.0": 0.003
  },
  "samsunginternet_android": {
    "23.0.0": 1.69,
    "22.0.0": 0.23,
    "21.0.0": 0.09,
    "20.0.0": 0.04,
    "19.0.0": 0.04,
    "17.0.0": 0.03,
    "4.0.0": 0.03,
    "7.4.0": 0.02,
    "18.0.0": 0.02,
    "3.0.0": 0.02,
    "2.0.0": 0.02,
    "13.2.0": 0.02,
    "2.2.0": 0.02,
    "7.2.0": 0.01,
    "2.1.0": 0.01,
    "16.0.0": 0.01,
    "3.5.0": 0.01,
    "11.0.0": 0.01,
    "16.2.0": 0.01
  }
}

export default usage