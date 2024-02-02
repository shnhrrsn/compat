/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "120.0.0": 15.99,
    "119.0.0": 2.46,
    "109.0.0": 1.65,
    "121.0.0": 1.13,
    "118.0.0": 0.47,
    "116.0.0": 0.27,
    "117.0.0": 0.2,
    "103.0.0": 0.14,
    "79.0.0": 0.12,
    "114.0.0": 0.11,
    "87.0.0": 0.08,
    "115.0.0": 0.08,
    "108.0.0": 0.08,
    "112.0.0": 0.07,
    "111.0.0": 0.07,
    "98.0.0": 0.07,
    "104.0.0": 0.06,
    "106.0.0": 0.06,
    "110.0.0": 0.05,
    "99.0.0": 0.05,
    "93.0.0": 0.05,
    "91.0.0": 0.05,
    "113.0.0": 0.04,
    "107.0.0": 0.04,
    "101.0.0": 0.04,
    "83.0.0": 0.04,
    "86.0.0": 0.04,
    "105.0.0": 0.04,
    "81.0.0": 0.04,
    "69.0.0": 0.03,
    "94.0.0": 0.03,
    "48.0.0": 0.03,
    "100.0.0": 0.03,
    "102.0.0": 0.03,
    "66.0.0": 0.03,
    "92.0.0": 0.03,
    "49.0.0": 0.03,
    "85.0.0": 0.02,
    "90.0.0": 0.02,
    "88.0.0": 0.02,
    "89.0.0": 0.02,
    "80.0.0": 0.02,
    "122.0.0": 0.02,
    "78.0.0": 0.02,
    "38.0.0": 0.02,
    "96.0.0": 0.02,
    "97.0.0": 0.01,
    "60.0.0": 0.01,
    "56.0.0": 0.01,
    "95.0.0": 0.01,
    "77.0.0": 0.01
  },
  "safari": {
    "17.2.0": 0.85,
    "17.1.0": 0.7,
    "16.6.0": 0.53,
    "15.6.0": 0.3,
    "16.3.0": 0.14,
    "17.0.0": 0.12,
    "14.1.0": 0.11,
    "16.5.0": 0.1,
    "13.1.0": 0.07,
    "16.1.0": 0.07,
    "16.4.0": 0.06,
    "16.2.0": 0.06,
    "17.3.0": 0.06,
    "15.5.0": 0.04,
    "14.0.0": 0.04,
    "16.0.0": 0.03,
    "15.1.0": 0.03,
    "15.4.0": 0.03,
    "15.3.0": 0.02,
    "604.1.0": 0.02,
    "11.1.0": 0.01,
    "12.1.0": 0.01,
    "15.2.0": 0.01,
    "605.1.0": 0.01,
    "9.1.0": 0.01
  },
  "edge": {
    "120.0.0": 3.87,
    "121.0.0": 0.52,
    "87.0.0": 0.36,
    "119.0.0": 0.27,
    "109.0.0": 0.07,
    "118.0.0": 0.04,
    "114.0.0": 0.02,
    "116.0.0": 0.02,
    "113.0.0": 0.02,
    "117.0.0": 0.02,
    "99.0.0": 0.02,
    "115.0.0": 0.01,
    "92.0.0": 0.01,
    "108.0.0": 0.01,
    "18.0.0": 0.01,
    "110.0.0": 0.01
  },
  "firefox": {
    "121.0.0": 1.39,
    "115.0.0": 0.48,
    "122.0.0": 0.31,
    "119.0.0": 0.25,
    "120.0.0": 0.24,
    "118.0.0": 0.09,
    "52.0.0": 0.06,
    "12.0.0": 0.04,
    "103.0.0": 0.03,
    "11.0.0": 0.03,
    "102.0.0": 0.03,
    "56.0.0": 0.02,
    "78.0.0": 0.02,
    "114.0.0": 0.02,
    "121.2.0": 0.01,
    "91.0.0": 0.01,
    "121.1.0": 0.01,
    "101.0.0": 0.01,
    "113.0.0": 0.01,
    "116.0.0": 0.01,
    "119.2.0": 0.01
  },
  "opera": {
    "105.0.0": 0.58,
    "106.0.0": 0.49,
    "77.0.0": 0.29,
    "79.3.0": 0.17,
    "79.5.0": 0.09,
    "76.0.0": 0.08,
    "79.6.0": 0.08,
    "95.0.0": 0.05,
    "79.4.0": 0.05,
    "80.1.0": 0.05,
    "102.0.0": 0.04,
    "79.2.0": 0.03,
    "75.0.0": 0.03,
    "80.0.0": 0.03,
    "76.2.0": 0.03,
    "46.0.0": 0.02,
    "72.0.0": 0.01,
    "74.0.0": 0.01,
    "69.0.0": 0.01,
    "71.0.0": 0.01,
    "73.0.0": 0.01,
    "79.1.0": 0.01
  },
  "ie": {
    "11.0.0": 0.13,
    "9.0.0": 0.01
  },
  "safari_ios": {
    "17.2.0": 5.567,
    "17.1.0": 4.113,
    "16.6.0": 1.555,
    "16.7.0": 0.846,
    "16.1.0": 0.732,
    "16.3.0": 0.619,
    "15.8.0": 0.574,
    "17.0.0": 0.399,
    "17.3.0": 0.354,
    "16.0.0": 0.343,
    "16.2.0": 0.333,
    "15.6.0": 0.331,
    "16.5.0": 0.293,
    "12.5.0": 0.284,
    "15.7.0": 0.238,
    "15.5.0": 0.147,
    "16.4.0": 0.138,
    "15.4.0": 0.111,
    "14.8.0": 0.072,
    "10.3.0": 0.064,
    "14.7.0": 0.061,
    "14.4.0": 0.059,
    "13.2.0": 0.059,
    "15.3.0": 0.055,
    "14.6.0": 0.045,
    "15.1.0": 0.045,
    "9.3.0": 0.041,
    "15.2.0": 0.039,
    "15.0.0": 0.038,
    "14.2.0": 0.025,
    "13.7.0": 0.023,
    "13.6.0": 0.023,
    "11.3.0": 0.021,
    "13.5.0": 0.02,
    "14.3.0": 0.02,
    "11.0.0": 0.018,
    "12.4.0": 0.018,
    "13.3.0": 0.016,
    "14.5.0": 0.014,
    "14.0.0": 0.013,
    "12.1.0": 0.011,
    "14.1.0": 0.009,
    "6.0.0": 0.009,
    "7.0.0": 0.009,
    "12.3.0": 0.009,
    "12.2.0": 0.007,
    "11.4.0": 0.005,
    "13.4.0": 0.005,
    "13.1.0": 0.005,
    "9.1.0": 0.005,
    "12.0.0": 0.005,
    "11.2.0": 0.005,
    "17.4.0": 0.004,
    "7.1.0": 0.004,
    "9.2.0": 0.004,
    "10.2.0": 0.004,
    "4.3.0": 0.004,
    "5.0.0": 0.004,
    "11.1.0": 0.002,
    "8.4.0": 0.002,
    "9.0.0": 0.002,
    "5.1.0": 0.002
  },
  "chrome_android": {
    "120.0.0": 29.579,
    "119.0.0": 1.54,
    "117.0.0": 0.763,
    "111.0.0": 0.732,
    "118.0.0": 0.483,
    "114.0.0": 0.489,
    "116.0.0": 0.455,
    "106.0.0": 0.391,
    "115.0.0": 0.299,
    "104.0.0": 0.254,
    "103.0.0": 0.239,
    "105.0.0": 0.211,
    "113.0.0": 0.192,
    "112.0.0": 0.177,
    "87.0.0": 0.175,
    "110.0.0": 0.117,
    "94.0.0": 0.103,
    "99.0.0": 0.101,
    "107.0.0": 0.082,
    "97.0.0": 0.08,
    "108.0.0": 0.076,
    "70.0.0": 0.076,
    "109.0.0": 0.067,
    "121.0.0": 0.886,
    "81.0.0": 0.006,
    "90.0.0": 0.003,
    "91.0.0": 0.003
  },
  "samsunginternet_android": {
    "23.0.0": 1.97,
    "22.0.0": 0.09,
    "21.0.0": 0.07,
    "19.0.0": 0.03,
    "20.0.0": 0.03,
    "4.0.0": 0.03,
    "17.0.0": 0.03,
    "7.4.0": 0.03,
    "3.0.0": 0.02,
    "7.2.0": 0.02,
    "2.0.0": 0.02,
    "18.0.0": 0.02,
    "2.1.0": 0.02,
    "2.2.0": 0.02,
    "13.2.0": 0.01,
    "3.5.0": 0.01,
    "11.0.0": 0.01,
    "16.0.0": 0.01,
    "5.0.0": 0.01,
    "4.2.0": 0.01
  }
}

export default usage