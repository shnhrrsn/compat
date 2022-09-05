/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "104.0.0": 15.18,
    "103.0.0": 6.16,
    "102.0.0": 0.32,
    "101.0.0": 0.16,
    "79.0.0": 0.13,
    "100.0.0": 0.13,
    "87.0.0": 0.1,
    "86.0.0": 0.09,
    "96.0.0": 0.09,
    "85.0.0": 0.09,
    "98.0.0": 0.08,
    "97.0.0": 0.08,
    "99.0.0": 0.08,
    "83.0.0": 0.07,
    "92.0.0": 0.07,
    "69.0.0": 0.06,
    "84.0.0": 0.06,
    "91.0.0": 0.06,
    "80.0.0": 0.06,
    "105.0.0": 0.05,
    "49.0.0": 0.05,
    "81.0.0": 0.05,
    "93.0.0": 0.05,
    "76.0.0": 0.05,
    "94.0.0": 0.05,
    "89.0.0": 0.05,
    "56.0.0": 0.04,
    "75.0.0": 0.04,
    "74.0.0": 0.04,
    "78.0.0": 0.04,
    "70.0.0": 0.03,
    "72.0.0": 0.03,
    "95.0.0": 0.03,
    "66.0.0": 0.03,
    "90.0.0": 0.03,
    "88.0.0": 0.03,
    "48.0.0": 0.02,
    "106.0.0": 0.02,
    "40.0.0": 0.02,
    "38.0.0": 0.02,
    "77.0.0": 0.02,
    "71.0.0": 0.02,
    "65.0.0": 0.01,
    "60.0.0": 0.01,
    "61.0.0": 0.01,
    "67.0.0": 0.01,
    "63.0.0": 0.01,
    "73.0.0": 0.01
  },
  "safari": {
    "15.6.0": 1.39,
    "15.5.0": 0.69,
    "14.1.0": 0.33,
    "13.1.0": 0.26,
    "15.4.0": 0.18,
    "14.0.0": 0.12,
    "15.3.0": 0.1,
    "15.1.0": 0.06,
    "15.2.0": 0.06,
    "12.1.0": 0.04,
    "15.0.0": 0.03,
    "13.0.0": 0.03,
    "604.1.0": 0.03,
    "11.1.0": 0.02,
    "9.1.0": 0.02,
    "16.0.0": 0.01,
    "5.1.0": 0.01
  },
  "edge": {
    "104.0.0": 3.01,
    "103.0.0": 1.11,
    "101.0.0": 0.05,
    "102.0.0": 0.04,
    "18.0.0": 0.02,
    "100.0.0": 0.01
  },
  "firefox": {
    "103.0.0": 2,
    "104.0.0": 0.39,
    "102.0.0": 0.11,
    "91.0.0": 0.09,
    "52.0.0": 0.06,
    "78.0.0": 0.04,
    "101.0.0": 0.03,
    "94.0.0": 0.03,
    "103.1.0": 0.02,
    "43.0.0": 0.02,
    "100.0.0": 0.02,
    "4.0.0": 0.02,
    "81.0.0": 0.02,
    "99.0.0": 0.02,
    "95.0.0": 0.01,
    "68.0.0": 0.01,
    "102.2.0": 0.01,
    "88.0.0": 0.01
  },
  "opera": {
    "89.0.0": 0.84,
    "70.3.0": 0.33,
    "63.0.0": 0.18,
    "64.0.0": 0.12,
    "90.0.0": 0.09,
    "60.0.0": 0.05,
    "62.5.0": 0.04,
    "69.3.0": 0.02,
    "88.0.0": 0.02,
    "61.0.0": 0.02,
    "85.0.0": 0.01,
    "46.0.0": 0.01,
    "58.0.0": 0.01,
    "67.1.0": 0.01,
    "66.2.0": 0.01,
    "68.3.0": 0.01
  },
  "ie": {
    "11.0.0": 0.24,
    "9.0.0": 0.04,
    "8.0.0": 0.02
  },
  "safari_ios": {
    "15.6.0": 9.079,
    "15.5.0": 3.637,
    "15.4.0": 0.733,
    "14.8.0": 0.49,
    "12.5.0": 0.469,
    "14.6.0": 0.366,
    "14.7.0": 0.323,
    "15.3.0": 0.319,
    "14.4.0": 0.292,
    "15.1.0": 0.193,
    "15.2.0": 0.177,
    "15.0.0": 0.137,
    "16.0.0": 0.122,
    "14.2.0": 0.101,
    "10.3.0": 0.094,
    "9.3.0": 0.08,
    "14.3.0": 0.071,
    "13.6.0": 0.064,
    "13.3.0": 0.057,
    "14.0.0": 0.056,
    "13.5.0": 0.049,
    "12.4.0": 0.049,
    "14.5.0": 0.045,
    "13.7.0": 0.043,
    "14.1.0": 0.035,
    "11.0.0": 0.028,
    "13.4.0": 0.026,
    "12.1.0": 0.023,
    "13.1.0": 0.021,
    "12.3.0": 0.021,
    "11.4.0": 0.017,
    "11.3.0": 0.016,
    "13.2.0": 0.014,
    "12.0.0": 0.012,
    "11.2.0": 0.012,
    "7.0.0": 0.012,
    "12.2.0": 0.012,
    "9.1.0": 0.009,
    "7.1.0": 0.005,
    "9.2.0": 0.005,
    "10.2.0": 0.005,
    "13.0.0": 0.005,
    "11.1.0": 0.005,
    "9.0.0": 0.003,
    "8.4.0": 0.003,
    "6.0.0": 0.003,
    "4.3.0": 0.003,
    "5.0.0": 0.003,
    "8.1.0": 0.003,
    "5.1.0": 0.002,
    "10.1.0": 0.002,
    "10.0.0": 0.002,
    "6.1.0": 0.002,
    "8.3.0": 0.002
  },
  "chrome_android": {
    "104.0.0": 26.004,
    "103.0.0": 7.716,
    "102.0.0": 0.809,
    "101.0.0": 0.724,
    "87.0.0": 0.545,
    "96.0.0": 0.431,
    "99.0.0": 0.344,
    "100.0.0": 0.308,
    "94.0.0": 0.328,
    "38.0.0": 0.277,
    "83.0.0": 0.15,
    "81.0.0": 0.164,
    "98.0.0": 0.118,
    "70.0.0": 0.161,
    "90.0.0": 0.153,
    "80.0.0": 0.142,
    "92.0.0": 0.138,
    "97.0.0": 0.111,
    "95.0.0": 0.104,
    "74.0.0": 0.096,
    "79.0.0": 0.075,
    "93.0.0": 0.038,
    "91.0.0": 0.003,
    "105.0.0": 0.551
  },
  "samsunginternet_android": {
    "18.0.0": 1.22,
    "17.0.0": 0.94,
    "15.0.0": 0.07,
    "16.0.0": 0.07,
    "16.2.0": 0.06,
    "13.2.0": 0.05,
    "14.2.0": 0.04,
    "11.0.0": 0.04,
    "7.4.0": 0.03,
    "7.2.0": 0.03,
    "4.0.0": 0.03,
    "3.0.0": 0.03,
    "3.5.0": 0.03,
    "2.0.0": 0.02,
    "14.0.0": 0.02,
    "2.1.0": 0.02,
    "2.2.0": 0.02,
    "12.1.0": 0.02,
    "3.3.0": 0.01,
    "13.0.0": 0.01,
    "4.2.0": 0.01,
    "9.2.0": 0.01
  }
}

export default usage