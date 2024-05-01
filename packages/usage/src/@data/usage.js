/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "123.0.0": 12.35,
    "124.0.0": 4.27,
    "109.0.0": 1.51,
    "122.0.0": 1.28,
    "121.0.0": 0.46,
    "103.0.0": 0.28,
    "101.0.0": 0.27,
    "120.0.0": 0.26,
    "116.0.0": 0.2,
    "86.0.0": 0.18,
    "104.0.0": 0.18,
    "102.0.0": 0.15,
    "100.0.0": 0.14,
    "79.0.0": 0.14,
    "119.0.0": 0.14,
    "117.0.0": 0.12,
    "118.0.0": 0.1,
    "114.0.0": 0.09,
    "87.0.0": 0.09,
    "98.0.0": 0.07,
    "108.0.0": 0.06,
    "83.0.0": 0.06,
    "115.0.0": 0.05,
    "106.0.0": 0.05,
    "91.0.0": 0.05,
    "113.0.0": 0.05,
    "99.0.0": 0.05,
    "111.0.0": 0.05,
    "81.0.0": 0.05,
    "69.0.0": 0.04,
    "112.0.0": 0.04,
    "105.0.0": 0.04,
    "85.0.0": 0.04,
    "90.0.0": 0.04,
    "88.0.0": 0.04,
    "107.0.0": 0.04,
    "80.0.0": 0.04,
    "78.0.0": 0.04,
    "110.0.0": 0.03,
    "94.0.0": 0.03,
    "89.0.0": 0.03,
    "70.0.0": 0.03,
    "93.0.0": 0.03,
    "125.0.0": 0.03,
    "74.0.0": 0.03,
    "77.0.0": 0.03,
    "49.0.0": 0.03,
    "66.0.0": 0.02,
    "48.0.0": 0.02,
    "72.0.0": 0.02,
    "68.0.0": 0.02,
    "76.0.0": 0.02,
    "84.0.0": 0.02,
    "92.0.0": 0.02,
    "75.0.0": 0.02,
    "38.0.0": 0.02,
    "71.0.0": 0.02,
    "97.0.0": 0.02,
    "73.0.0": 0.02,
    "95.0.0": 0.01,
    "96.0.0": 0.01,
    "56.0.0": 0.01
  },
  "safari": {
    "17.4.0": 1.13,
    "17.3.0": 0.42,
    "16.6.0": 0.36,
    "15.6.0": 0.24,
    "17.2.0": 0.14,
    "9.1.0": 0.12,
    "16.3.0": 0.11,
    "14.1.0": 0.09,
    "17.1.0": 0.09,
    "16.5.0": 0.06,
    "13.1.0": 0.06,
    "16.1.0": 0.05,
    "16.2.0": 0.04,
    "17.0.0": 0.04,
    "14.0.0": 0.04,
    "15.5.0": 0.04,
    "16.4.0": 0.03,
    "15.1.0": 0.03,
    "16.0.0": 0.03,
    "15.4.0": 0.03,
    "15.3.0": 0.02,
    "604.1.0": 0.02,
    "12.1.0": 0.01,
    "605.1.0": 0.01,
    "15.2.0": 0.01
  },
  "edge": {
    "123.0.0": 3.18,
    "124.0.0": 1.25,
    "122.0.0": 0.29,
    "109.0.0": 0.07,
    "120.0.0": 0.05,
    "121.0.0": 0.05,
    "119.0.0": 0.03,
    "84.0.0": 0.02,
    "113.0.0": 0.02,
    "80.0.0": 0.02,
    "114.0.0": 0.02,
    "81.0.0": 0.02,
    "86.0.0": 0.01,
    "83.0.0": 0.01,
    "90.0.0": 0.01,
    "89.0.0": 0.01,
    "92.0.0": 0.01,
    "117.0.0": 0.01,
    "118.0.0": 0.01,
    "88.0.0": 0.01,
    "87.0.0": 0.01,
    "85.0.0": 0.01,
    "111.0.0": 0.01
  },
  "firefox": {
    "124.0.0": 1.19,
    "125.0.0": 0.52,
    "115.0.0": 0.38,
    "103.0.0": 0.11,
    "118.0.0": 0.1,
    "123.0.0": 0.06,
    "52.0.0": 0.05,
    "102.0.0": 0.03,
    "122.0.0": 0.02,
    "78.0.0": 0.02,
    "121.0.0": 0.02,
    "56.0.0": 0.02,
    "124.3.0": 0.02,
    "120.0.0": 0.01,
    "124.2.0": 0.01,
    "113.0.0": 0.01,
    "11.0.0": 0.01,
    "68.0.0": 0.01
  },
  "opera": {
    "107.0.0": 0.56,
    "108.0.0": 0.31,
    "79.0.0": 0.27,
    "81.3.0": 0.17,
    "80.0.0": 0.13,
    "81.6.0": 0.11,
    "109.0.0": 0.11,
    "81.5.0": 0.07,
    "78.0.0": 0.05,
    "95.0.0": 0.05,
    "77.0.0": 0.04,
    "102.0.0": 0.04,
    "81.1.0": 0.02,
    "81.4.0": 0.02,
    "46.0.0": 0.02,
    "76.0.0": 0.02,
    "75.0.0": 0.02,
    "73.2.0": 0.01,
    "80.6.0": 0.01,
    "81.2.0": 0.01,
    "82.0.0": 0.01,
    "80.4.0": 0.01,
    "55.0.0": 0.01,
    "69.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.18,
    "9.0.0": 0.02
  },
  "safari_ios": {
    "17.4.0": 7.19,
    "17.3.0": 3.305,
    "16.7.0": 0.756,
    "16.6.0": 0.742,
    "15.8.0": 0.616,
    "16.1.0": 0.521,
    "17.2.0": 0.446,
    "16.3.0": 0.439,
    "17.1.0": 0.332,
    "12.5.0": 0.276,
    "15.6.0": 0.267,
    "16.0.0": 0.249,
    "16.2.0": 0.249,
    "16.5.0": 0.19,
    "17.0.0": 0.179,
    "15.7.0": 0.176,
    "15.5.0": 0.121,
    "15.4.0": 0.097,
    "16.4.0": 0.091,
    "10.3.0": 0.084,
    "13.2.0": 0.074,
    "14.8.0": 0.068,
    "17.5.0": 0.065,
    "11.0.0": 0.065,
    "12.4.0": 0.063,
    "14.4.0": 0.063,
    "9.3.0": 0.06,
    "14.7.0": 0.06,
    "15.1.0": 0.049,
    "15.0.0": 0.047,
    "15.3.0": 0.047,
    "14.6.0": 0.042,
    "15.2.0": 0.04,
    "12.1.0": 0.033,
    "13.6.0": 0.032,
    "14.2.0": 0.032,
    "13.1.0": 0.025,
    "13.3.0": 0.023,
    "13.7.0": 0.023,
    "12.3.0": 0.021,
    "14.5.0": 0.021,
    "11.2.0": 0.021,
    "14.3.0": 0.021,
    "14.0.0": 0.019,
    "13.5.0": 0.019,
    "11.3.0": 0.018,
    "13.4.0": 0.014,
    "12.0.0": 0.014,
    "11.1.0": 0.012,
    "11.4.0": 0.012,
    "14.1.0": 0.012,
    "7.0.0": 0.011,
    "10.1.0": 0.011,
    "9.0.0": 0.011,
    "12.2.0": 0.011,
    "6.0.0": 0.009,
    "10.0.0": 0.009,
    "9.2.0": 0.009,
    "10.2.0": 0.007,
    "13.0.0": 0.005,
    "9.1.0": 0.005,
    "4.3.0": 0.004,
    "7.1.0": 0.004,
    "5.0.0": 0.002,
    "8.4.0": 0.002,
    "8.1.0": 0.002,
    "5.1.0": 0.002
  },
  "chrome_android": {
    "123.0.0": 30.394,
    "122.0.0": 2.132,
    "121.0.0": 0.713,
    "120.0.0": 0.668,
    "119.0.0": 0.618,
    "117.0.0": 0.477,
    "111.0.0": 0.423,
    "114.0.0": 0.28,
    "118.0.0": 0.257,
    "106.0.0": 0.249,
    "116.0.0": 0.22,
    "115.0.0": 0.138,
    "112.0.0": 0.101,
    "103.0.0": 0.1,
    "113.0.0": 0.096,
    "124.0.0": 1.529,
    "104.0.0": 0.082,
    "105.0.0": 0.076,
    "110.0.0": 0.07,
    "70.0.0": 0.066,
    "99.0.0": 0.056,
    "87.0.0": 0.022,
    "107.0.0": 0.009,
    "92.0.0": 0.035,
    "91.0.0": 0.03,
    "90.0.0": 0.025,
    "89.0.0": 0.024,
    "88.0.0": 0.02
  },
  "samsunginternet_android": {
    "24.0.0": 1.74,
    "23.0.0": 0.21,
    "25.0.0": 0.09,
    "22.0.0": 0.06,
    "21.0.0": 0.05,
    "4.0.0": 0.03,
    "19.0.0": 0.03,
    "7.4.0": 0.02,
    "17.0.0": 0.02,
    "3.0.0": 0.02,
    "20.0.0": 0.02,
    "2.0.0": 0.02,
    "2.2.0": 0.02,
    "2.1.0": 0.02,
    "7.2.0": 0.01,
    "3.5.0": 0.01,
    "18.0.0": 0.01,
    "13.2.0": 0.01,
    "5.0.0": 0.01,
    "11.0.0": 0.01,
    "4.2.0": 0.01
  }
}

export default usage