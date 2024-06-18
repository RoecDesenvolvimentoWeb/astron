/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1430px",
        "4xl": "1330px",
        "5xl": "1920px",
        "1sm": "455px",
      },
      fontFamily: {
        geo: "Geologica",
        pep: "Poppins",
      },
      colors: {
        "dark-purple": {
          lv1: "#B468C2",
          lv2: "#61296B",
          lv3: "#491F50",
        },
        "light-purple": {
          lv4: "#C9B6CD",
          lv3: "#E7DFE9",
          lv2: "#EFEAF0",
          lv1: "#F7F4F8",
        },
        lilas: {
          lv1: "#D25AC4",
          lv2: "#D95DCA",
          lv3: "#9E4493",
          lv4: "#812D77",
          lv5: "#572463",
        },
        blue: {
          lv1: "#8879FF",
          lv2: "#665BBF",
          lv3: "#665BBF",
        },
        "light-blue": {
          lv1: "#F6F8F9",
          lv2: "#EBEEF2",
          lv3: "#B8AEFF",
        },
        gray: {
          lv1: "#FBFBFB",
          lv2: "#A09FA5",
          lv3: "#76747E",
          lv4: "#4F4D56",
          lv5: "#2C2938",
        },
      },
    },
  },
  plugins: [],
};
