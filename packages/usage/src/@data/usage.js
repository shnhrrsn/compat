/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "111.0.0": 10.78,
    "110.0.0": 7.59,
    "109.0.0": 2.73,
    "108.0.0": 0.41,
    "103.0.0": 0.36,
    "79.0.0": 0.14,
    "107.0.0": 0.13,
    "104.0.0": 0.12,
    "105.0.0": 0.11,
    "87.0.0": 0.1,
    "85.0.0": 0.09,
    "93.0.0": 0.09,
    "106.0.0": 0.09,
    "91.0.0": 0.08,
    "56.0.0": 0.07,
    "102.0.0": 0.07,
    "99.0.0": 0.07,
    "83.0.0": 0.07,
    "86.0.0": 0.07,
    "100.0.0": 0.05,
    "97.0.0": 0.05,
    "101.0.0": 0.05,
    "92.0.0": 0.05,
    "75.0.0": 0.05,
    "81.0.0": 0.05,
    "94.0.0": 0.04,
    "76.0.0": 0.04,
    "98.0.0": 0.04,
    "90.0.0": 0.04,
    "84.0.0": 0.04,
    "96.0.0": 0.04,
    "74.0.0": 0.04,
    "49.0.0": 0.04,
    "89.0.0": 0.04,
    "95.0.0": 0.04,
    "80.0.0": 0.04,
    "69.0.0": 0.04,
    "66.0.0": 0.03,
    "78.0.0": 0.03,
    "88.0.0": 0.02,
    "72.0.0": 0.02,
    "113.0.0": 0.02,
    "48.0.0": 0.02,
    "112.0.0": 0.02,
    "70.0.0": 0.02,
    "60.0.0": 0.02,
    "38.0.0": 0.02,
    "77.0.0": 0.01,
    "40.0.0": 0.01,
    "71.0.0": 0.01,
    "63.0.0": 0.01,
    "61.0.0": 0.01
  },
  "safari": {
    "16.3.0": 1.69,
    "15.6.0": 0.76,
    "16.2.0": 0.47,
    "14.1.0": 0.29,
    "16.1.0": 0.26,
    "13.1.0": 0.18,
    "15.5.0": 0.17,
    "14.0.0": 0.1,
    "15.4.0": 0.09,
    "16.0.0": 0.08,
    "15.3.0": 0.07,
    "15.1.0": 0.04,
    "15.2.0": 0.04,
    "12.1.0": 0.03,
    "9.1.0": 0.03,
    "16.4.0": 0.03,
    "604.1.0": 0.02,
    "15.0.0": 0.02,
    "13.0.0": 0.02
  },
  "edge": {
    "111.0.0": 2.21,
    "110.0.0": 2.14,
    "109.0.0": 0.12,
    "108.0.0": 0.05,
    "107.0.0": 0.02,
    "18.0.0": 0.01
  },
  "firefox": {
    "110.0.0": 1.2,
    "111.0.0": 1,
    "102.0.0": 0.12,
    "109.0.0": 0.07,
    "52.0.0": 0.05,
    "78.0.0": 0.04,
    "103.0.0": 0.04,
    "108.0.0": 0.03,
    "94.0.0": 0.02,
    "110.2.0": 0.02,
    "107.0.0": 0.01,
    "87.0.0": 0.01,
    "43.0.0": 0.01,
    "105.0.0": 0.01,
    "106.0.0": 0.01,
    "91.0.0": 0.01,
    "110.1.0": 0.01,
    "104.0.0": 0.01,
    "112.0.0": 0.01
  },
  "opera": {
    "96.0.0": 0.61,
    "95.0.0": 0.51,
    "73.3.0": 0.18,
    "67.1.0": 0.18,
    "74.0.0": 0.11,
    "67.0.0": 0.05,
    "73.2.0": 0.05,
    "66.2.0": 0.04,
    "68.0.0": 0.04,
    "74.1.0": 0.04,
    "72.5.0": 0.02,
    "66.0.0": 0.02,
    "94.0.0": 0.02,
    "63.0.0": 0.02,
    "73.1.0": 0.02,
    "46.0.0": 0.01,
    "97.0.0": 0.01,
    "72.3.0": 0.01,
    "60.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.2,
    "9.0.0": 0.03,
    "8.0.0": 0.02
  },
  "safari_ios": {
    "16.3.0": 6.519,
    "16.1.0": 2.673,
    "16.2.0": 1.808,
    "16.0.0": 1.2,
    "15.6.0": 1.094,
    "15.7.0": 1.014,
    "15.5.0": 0.386,
    "12.5.0": 0.352,
    "14.8.0": 0.232,
    "15.4.0": 0.224,
    "14.7.0": 0.149,
    "14.4.0": 0.131,
    "16.4.0": 0.128,
    "15.3.0": 0.116,
    "14.6.0": 0.116,
    "15.1.0": 0.092,
    "15.2.0": 0.075,
    "10.3.0": 0.075,
    "9.3.0": 0.061,
    "15.0.0": 0.061,
    "14.2.0": 0.058,
    "13.6.0": 0.041,
    "14.3.0": 0.041,
    "13.2.0": 0.038,
    "13.3.0": 0.034,
    "12.4.0": 0.032,
    "14.0.0": 0.027,
    "13.5.0": 0.027,
    "13.7.0": 0.026,
    "14.5.0": 0.022,
    "14.1.0": 0.022,
    "12.1.0": 0.015,
    "13.4.0": 0.014,
    "11.3.0": 0.014,
    "12.3.0": 0.014,
    "9.1.0": 0.014,
    "13.1.0": 0.014,
    "11.0.0": 0.012,
    "11.4.0": 0.012,
    "7.0.0": 0.01,
    "12.2.0": 0.009,
    "11.2.0": 0.007,
    "12.0.0": 0.007,
    "7.1.0": 0.005,
    "8.4.0": 0.005,
    "9.2.0": 0.003,
    "6.0.0": 0.003,
    "10.2.0": 0.003,
    "5.0.0": 0.003,
    "4.3.0": 0.003,
    "8.1.0": 0.003,
    "9.0.0": 0.003,
    "11.1.0": 0.003,
    "5.1.0": 0.002
  },
  "chrome_android": {
    "110.0.0": 11.355,
    "111.0.0": 19.416,
    "109.0.0": 1.746,
    "108.0.0": 0.956,
    "107.0.0": 0.704,
    "106.0.0": 0.703,
    "103.0.0": 0.651,
    "104.0.0": 0.585,
    "105.0.0": 0.48,
    "87.0.0": 0.345,
    "94.0.0": 0.225,
    "99.0.0": 0.188,
    "92.0.0": 0.127,
    "97.0.0": 0.129,
    "96.0.0": 0.121,
    "70.0.0": 0.122,
    "81.0.0": 0.109,
    "80.0.0": 0.095,
    "90.0.0": 0.092,
    "83.0.0": 0.081,
    "95.0.0": 0.074,
    "101.0.0": 0.04,
    "74.0.0": 0.06,
    "91.0.0": 0.007
  },
  "samsunginternet_android": {
    "20.0.0": 1.77,
    "19.0.0": 0.23,
    "18.0.0": 0.07,
    "17.0.0": 0.06,
    "7.4.0": 0.03,
    "16.0.0": 0.03,
    "4.0.0": 0.03,
    "13.2.0": 0.03,
    "16.2.0": 0.02,
    "3.0.0": 0.02,
    "11.0.0": 0.02,
    "14.2.0": 0.02,
    "7.2.0": 0.02,
    "2.0.0": 0.02,
    "2.1.0": 0.02,
    "3.5.0": 0.02,
    "15.0.0": 0.02,
    "2.2.0": 0.02,
    "4.2.0": 0.01
  }
}

export default usage