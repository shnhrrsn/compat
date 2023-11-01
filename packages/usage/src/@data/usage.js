/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "117.0.0": 10.39,
    "118.0.0": 9.33,
    "109.0.0": 1.71,
    "116.0.0": 1.51,
    "114.0.0": 0.53,
    "115.0.0": 0.37,
    "111.0.0": 0.27,
    "103.0.0": 0.23,
    "112.0.0": 0.19,
    "108.0.0": 0.18,
    "79.0.0": 0.17,
    "110.0.0": 0.16,
    "93.0.0": 0.15,
    "107.0.0": 0.14,
    "76.0.0": 0.11,
    "87.0.0": 0.1,
    "113.0.0": 0.1,
    "80.0.0": 0.09,
    "86.0.0": 0.09,
    "85.0.0": 0.08,
    "83.0.0": 0.08,
    "91.0.0": 0.07,
    "81.0.0": 0.07,
    "98.0.0": 0.07,
    "70.0.0": 0.07,
    "69.0.0": 0.07,
    "106.0.0": 0.06,
    "90.0.0": 0.06,
    "99.0.0": 0.05,
    "88.0.0": 0.05,
    "104.0.0": 0.05,
    "89.0.0": 0.05,
    "92.0.0": 0.04,
    "101.0.0": 0.04,
    "73.0.0": 0.04,
    "78.0.0": 0.04,
    "49.0.0": 0.04,
    "105.0.0": 0.04,
    "75.0.0": 0.04,
    "102.0.0": 0.04,
    "84.0.0": 0.04,
    "74.0.0": 0.04,
    "100.0.0": 0.04,
    "77.0.0": 0.03,
    "68.0.0": 0.03,
    "72.0.0": 0.03,
    "94.0.0": 0.03,
    "60.0.0": 0.03,
    "119.0.0": 0.02,
    "66.0.0": 0.02,
    "71.0.0": 0.02,
    "97.0.0": 0.02,
    "56.0.0": 0.02,
    "96.0.0": 0.02,
    "95.0.0": 0.02,
    "48.0.0": 0.02,
    "120.0.0": 0.01,
    "38.0.0": 0.01,
    "65.0.0": 0.01,
    "57.0.0": 0.01
  },
  "safari": {
    "16.6.0": 2.22,
    "17.0.0": 0.62,
    "15.6.0": 0.54,
    "16.5.0": 0.41,
    "16.3.0": 0.35,
    "14.1.0": 0.24,
    "9.1.0": 0.17,
    "16.1.0": 0.16,
    "16.2.0": 0.15,
    "16.4.0": 0.15,
    "13.1.0": 0.13,
    "15.5.0": 0.11,
    "14.0.0": 0.1,
    "15.4.0": 0.07,
    "16.0.0": 0.06,
    "15.3.0": 0.06,
    "15.1.0": 0.04,
    "17.1.0": 0.04,
    "15.2.0": 0.03,
    "12.1.0": 0.03,
    "13.0.0": 0.02,
    "604.1.0": 0.02,
    "15.0.0": 0.02,
    "605.1.0": 0.01
  },
  "edge": {
    "117.0.0": 2.24,
    "118.0.0": 2.05,
    "116.0.0": 0.14,
    "112.0.0": 0.11,
    "111.0.0": 0.11,
    "109.0.0": 0.07,
    "115.0.0": 0.04,
    "114.0.0": 0.04,
    "87.0.0": 0.04,
    "113.0.0": 0.02,
    "99.0.0": 0.02,
    "92.0.0": 0.02,
    "110.0.0": 0.01,
    "108.0.0": 0.01,
    "18.0.0": 0.01
  },
  "firefox": {
    "118.0.0": 1.68,
    "115.0.0": 0.35,
    "119.0.0": 0.25,
    "117.0.0": 0.11,
    "102.0.0": 0.06,
    "52.0.0": 0.05,
    "78.0.0": 0.04,
    "103.0.0": 0.04,
    "116.0.0": 0.03,
    "48.0.0": 0.02,
    "113.0.0": 0.02,
    "56.0.0": 0.02,
    "118.1.0": 0.02,
    "118.2.0": 0.02,
    "114.0.0": 0.01,
    "54.0.0": 0.01,
    "50.0.0": 0.01,
    "110.0.0": 0.01,
    "111.0.0": 0.01,
    "109.0.0": 0.01,
    "112.0.0": 0.01,
    "11.0.0": 0.01
  },
  "opera": {
    "102.0.0": 1.66,
    "103.0.0": 0.25,
    "73.0.0": 0.18,
    "77.4.0": 0.15,
    "97.0.0": 0.09,
    "72.0.0": 0.08,
    "77.5.0": 0.08,
    "74.0.0": 0.07,
    "95.0.0": 0.05,
    "78.1.0": 0.05,
    "71.0.0": 0.03,
    "78.2.0": 0.03,
    "76.2.0": 0.03,
    "69.0.0": 0.03,
    "77.3.0": 0.02,
    "77.2.0": 0.02,
    "77.1.0": 0.02,
    "70.0.0": 0.02,
    "101.0.0": 0.02,
    "78.0.0": 0.02,
    "46.0.0": 0.02,
    "100.0.0": 0.01,
    "77.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.14,
    "9.0.0": 0.02
  },
  "safari_ios": {
    "16.6.0": 6.88,
    "17.0.0": 2.801,
    "16.7.0": 0.971,
    "16.1.0": 0.809,
    "15.7.0": 0.762,
    "16.3.0": 0.731,
    "16.0.0": 0.423,
    "16.5.0": 0.419,
    "16.2.0": 0.394,
    "15.6.0": 0.381,
    "12.5.0": 0.227,
    "15.5.0": 0.165,
    "16.4.0": 0.157,
    "17.1.0": 0.15,
    "15.4.0": 0.116,
    "14.8.0": 0.093,
    "14.7.0": 0.07,
    "14.4.0": 0.069,
    "15.3.0": 0.06,
    "10.3.0": 0.057,
    "14.6.0": 0.054,
    "15.1.0": 0.052,
    "11.0.0": 0.046,
    "13.2.0": 0.044,
    "15.2.0": 0.044,
    "15.0.0": 0.041,
    "9.3.0": 0.039,
    "14.2.0": 0.029,
    "14.3.0": 0.021,
    "13.6.0": 0.021,
    "12.4.0": 0.018,
    "13.3.0": 0.016,
    "14.5.0": 0.015,
    "14.0.0": 0.013,
    "13.7.0": 0.013,
    "11.3.0": 0.011,
    "13.5.0": 0.011,
    "14.1.0": 0.011,
    "12.1.0": 0.01,
    "12.3.0": 0.008,
    "9.1.0": 0.008,
    "7.0.0": 0.008,
    "13.1.0": 0.008,
    "13.4.0": 0.007,
    "12.2.0": 0.007,
    "11.4.0": 0.007,
    "6.0.0": 0.005,
    "12.0.0": 0.005,
    "11.2.0": 0.005,
    "7.1.0": 0.003,
    "17.2.0": 0.003,
    "15.8.0": 0.003,
    "8.4.0": 0.002,
    "10.2.0": 0.002,
    "4.3.0": 0.002,
    "5.0.0": 0.002,
    "9.2.0": 0.002,
    "11.1.0": 0.002,
    "9.0.0": 0.002
  },
  "chrome_android": {
    "117.0.0": 18.359,
    "116.0.0": 1.689,
    "114.0.0": 0.938,
    "115.0.0": 0.828,
    "111.0.0": 0.728,
    "106.0.0": 0.495,
    "113.0.0": 0.361,
    "112.0.0": 0.298,
    "103.0.0": 0.286,
    "104.0.0": 0.269,
    "105.0.0": 0.248,
    "110.0.0": 0.186,
    "87.0.0": 0.193,
    "94.0.0": 0.12,
    "107.0.0": 0.116,
    "109.0.0": 0.111,
    "99.0.0": 0.114,
    "108.0.0": 0.094,
    "90.0.0": 0.066,
    "97.0.0": 0.089,
    "70.0.0": 0.085,
    "92.0.0": 0.051,
    "81.0.0": 0.064,
    "118.0.0": 7.658,
    "91.0.0": 0.04,
    "80.0.0": 0.056,
    "96.0.0": 0.055,
    "88.0.0": 0.025,
    "89.0.0": 0.02,
    "83.0.0": 0.004,
    "119.0.0": 0.013,
    "95.0.0": 0.013
  },
  "samsunginternet_android": {
    "22.0.0": 1.53,
    "23.0.0": 0.28,
    "21.0.0": 0.1,
    "20.0.0": 0.05,
    "19.0.0": 0.04,
    "17.0.0": 0.03,
    "4.0.0": 0.02,
    "7.4.0": 0.02,
    "18.0.0": 0.02,
    "3.0.0": 0.02,
    "2.0.0": 0.02,
    "2.2.0": 0.01,
    "13.2.0": 0.01,
    "2.1.0": 0.01,
    "16.0.0": 0.01,
    "7.2.0": 0.01,
    "3.5.0": 0.01,
    "11.0.0": 0.01,
    "16.2.0": 0.01
  }
}

export default usage