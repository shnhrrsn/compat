/** @type {Record<string, Record<string, number>>} */
const usage = {
  "chrome": {
    "122.0.0": 12.74,
    "123.0.0": 3.55,
    "121.0.0": 1.69,
    "109.0.0": 1.58,
    "120.0.0": 0.45,
    "116.0.0": 0.22,
    "103.0.0": 0.22,
    "119.0.0": 0.19,
    "104.0.0": 0.16,
    "101.0.0": 0.16,
    "79.0.0": 0.13,
    "117.0.0": 0.13,
    "86.0.0": 0.11,
    "118.0.0": 0.1,
    "114.0.0": 0.09,
    "102.0.0": 0.09,
    "100.0.0": 0.09,
    "87.0.0": 0.08,
    "98.0.0": 0.08,
    "108.0.0": 0.05,
    "113.0.0": 0.05,
    "110.0.0": 0.05,
    "106.0.0": 0.05,
    "99.0.0": 0.05,
    "111.0.0": 0.05,
    "91.0.0": 0.04,
    "83.0.0": 0.04,
    "112.0.0": 0.04,
    "105.0.0": 0.04,
    "115.0.0": 0.04,
    "69.0.0": 0.04,
    "107.0.0": 0.04,
    "81.0.0": 0.04,
    "93.0.0": 0.03,
    "94.0.0": 0.03,
    "49.0.0": 0.03,
    "48.0.0": 0.02,
    "77.0.0": 0.02,
    "88.0.0": 0.02,
    "85.0.0": 0.02,
    "92.0.0": 0.02,
    "66.0.0": 0.02,
    "78.0.0": 0.02,
    "80.0.0": 0.02,
    "70.0.0": 0.02,
    "90.0.0": 0.02,
    "124.0.0": 0.02,
    "97.0.0": 0.02,
    "89.0.0": 0.02,
    "38.0.0": 0.02,
    "74.0.0": 0.01,
    "50.0.0": 0.01,
    "96.0.0": 0.01,
    "56.0.0": 0.01,
    "76.0.0": 0.01,
    "84.0.0": 0.01,
    "95.0.0": 0.01,
    "73.0.0": 0.01,
    "75.0.0": 0.01
  },
  "safari": {
    "17.3.0": 1.12,
    "16.6.0": 0.39,
    "17.2.0": 0.28,
    "15.6.0": 0.26,
    "17.4.0": 0.22,
    "17.1.0": 0.13,
    "16.3.0": 0.12,
    "14.1.0": 0.1,
    "16.5.0": 0.07,
    "13.1.0": 0.07,
    "16.1.0": 0.05,
    "16.2.0": 0.05,
    "17.0.0": 0.05,
    "14.0.0": 0.04,
    "16.4.0": 0.04,
    "15.5.0": 0.04,
    "9.1.0": 0.04,
    "16.0.0": 0.03,
    "15.1.0": 0.03,
    "15.4.0": 0.03,
    "15.3.0": 0.02,
    "604.1.0": 0.02,
    "12.1.0": 0.01,
    "15.2.0": 0.01,
    "605.1.0": 0.01
  },
  "edge": {
    "122.0.0": 4.08,
    "123.0.0": 0.32,
    "121.0.0": 0.22,
    "120.0.0": 0.08,
    "109.0.0": 0.07,
    "119.0.0": 0.03,
    "113.0.0": 0.02,
    "114.0.0": 0.02,
    "118.0.0": 0.02,
    "117.0.0": 0.01,
    "92.0.0": 0.01,
    "115.0.0": 0.01
  },
  "firefox": {
    "123.0.0": 1.22,
    "124.0.0": 0.5,
    "115.0.0": 0.4,
    "118.0.0": 0.08,
    "122.0.0": 0.07,
    "52.0.0": 0.05,
    "103.0.0": 0.04,
    "102.0.0": 0.03,
    "121.0.0": 0.02,
    "56.0.0": 0.02,
    "120.0.0": 0.02,
    "78.0.0": 0.02,
    "11.0.0": 0.01,
    "113.0.0": 0.01,
    "123.4.0": 0.01,
    "117.0.0": 0.01,
    "43.0.0": 0.01
  },
  "opera": {
    "107.0.0": 0.79,
    "79.0.0": 0.2,
    "78.0.0": 0.2,
    "108.0.0": 0.16,
    "80.4.0": 0.13,
    "80.6.0": 0.12,
    "81.1.0": 0.09,
    "77.0.0": 0.06,
    "95.0.0": 0.05,
    "102.0.0": 0.04,
    "81.2.0": 0.04,
    "80.5.0": 0.03,
    "81.0.0": 0.03,
    "80.3.0": 0.03,
    "76.0.0": 0.02,
    "81.3.0": 0.02,
    "106.0.0": 0.02,
    "75.0.0": 0.02,
    "80.1.0": 0.02,
    "80.2.0": 0.02,
    "46.0.0": 0.02,
    "73.2.0": 0.01,
    "79.2.0": 0.01,
    "69.0.0": 0.01
  },
  "ie": {
    "11.0.0": 0.13,
    "9.0.0": 0.02
  },
  "safari_ios": {
    "17.3.0": 8.873,
    "17.4.0": 1.302,
    "16.6.0": 0.905,
    "16.7.0": 0.816,
    "17.2.0": 0.721,
    "15.8.0": 0.649,
    "16.1.0": 0.589,
    "16.3.0": 0.506,
    "17.1.0": 0.447,
    "15.6.0": 0.304,
    "16.2.0": 0.284,
    "16.0.0": 0.284,
    "12.5.0": 0.276,
    "16.5.0": 0.227,
    "17.0.0": 0.224,
    "15.7.0": 0.215,
    "15.5.0": 0.14,
    "15.4.0": 0.109,
    "16.4.0": 0.107,
    "10.3.0": 0.075,
    "14.8.0": 0.07,
    "14.7.0": 0.057,
    "14.4.0": 0.055,
    "15.3.0": 0.054,
    "13.2.0": 0.054,
    "11.0.0": 0.047,
    "9.3.0": 0.045,
    "14.6.0": 0.043,
    "15.1.0": 0.043,
    "15.2.0": 0.039,
    "15.0.0": 0.036,
    "14.2.0": 0.023,
    "13.6.0": 0.023,
    "13.7.0": 0.021,
    "12.4.0": 0.02,
    "14.3.0": 0.018,
    "13.3.0": 0.016,
    "14.5.0": 0.013,
    "11.3.0": 0.011,
    "14.0.0": 0.011,
    "6.0.0": 0.011,
    "12.1.0": 0.011,
    "13.5.0": 0.011,
    "7.0.0": 0.009,
    "14.1.0": 0.009,
    "12.3.0": 0.009,
    "11.4.0": 0.007,
    "13.4.0": 0.005,
    "13.1.0": 0.005,
    "12.2.0": 0.005,
    "11.2.0": 0.005,
    "12.0.0": 0.005,
    "10.1.0": 0.004,
    "9.2.0": 0.004,
    "7.1.0": 0.004,
    "4.3.0": 0.004,
    "10.2.0": 0.004,
    "11.1.0": 0.002,
    "9.0.0": 0.002,
    "8.4.0": 0.002,
    "5.0.0": 0.002,
    "9.1.0": 0.002,
    "8.1.0": 0.002
  },
  "chrome_android": {
    "122.0.0": 21.909,
    "121.0.0": 1.746,
    "120.0.0": 1.024,
    "119.0.0": 0.673,
    "117.0.0": 0.516,
    "111.0.0": 0.492,
    "114.0.0": 0.309,
    "116.0.0": 0.256,
    "106.0.0": 0.266,
    "118.0.0": 0.254,
    "115.0.0": 0.166,
    "104.0.0": 0.117,
    "103.0.0": 0.115,
    "112.0.0": 0.114,
    "113.0.0": 0.112,
    "105.0.0": 0.087,
    "110.0.0": 0.078,
    "70.0.0": 0.069,
    "87.0.0": 0.064,
    "94.0.0": 0.052,
    "99.0.0": 0.097,
    "107.0.0": 0.029,
    "109.0.0": 0.013,
    "123.0.0": 10.712,
    "124.0.0": 0.032,
    "92.0.0": 0.008,
    "91.0.0": 0.008,
    "90.0.0": 0.006,
    "88.0.0": 0.003,
    "89.0.0": 0.003
  },
  "samsunginternet_android": {
    "24.0.0": 1.07,
    "23.0.0": 1,
    "22.0.0": 0.07,
    "21.0.0": 0.06,
    "19.0.0": 0.03,
    "4.0.0": 0.03,
    "20.0.0": 0.03,
    "7.4.0": 0.03,
    "17.0.0": 0.03,
    "3.0.0": 0.02,
    "2.0.0": 0.02,
    "2.2.0": 0.02,
    "2.1.0": 0.02,
    "18.0.0": 0.02,
    "7.2.0": 0.02,
    "3.5.0": 0.01,
    "13.2.0": 0.01,
    "16.0.0": 0.01,
    "11.0.0": 0.01,
    "5.0.0": 0.01,
    "4.2.0": 0.01
  }
}

export default usage